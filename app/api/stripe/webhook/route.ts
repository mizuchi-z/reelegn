import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateReelPack } from "@/lib/generate";
import { BriefFormData } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const adminSupabase = createAdminClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;

        if (!userId) break;

        if (session.mode === "payment") {
          // One-time pack payment — save payment record
          await adminSupabase.from("paiements").insert({
            user_id: userId,
            stripe_payment_intent_id: session.payment_intent as string,
            montant: session.amount_total,
            statut: "success",
          });

          // Launch generation with saved brief data
          const briefDataStr = session.metadata?.brief_data;
          if (briefDataStr) {
            try {
              const brief = JSON.parse(briefDataStr) as BriefFormData;

              // Get user profile
              const { data: profile } = await adminSupabase
                .from("profiles")
                .select("nom, email")
                .eq("id", userId)
                .single();

              const result = await generateReelPack(brief, userId);

              // Send PDF email
              if (profile) {
                fetch(`${process.env.NEXT_PUBLIC_URL}/api/send-pdf`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    generation_id: result.id,
                    user_email: profile.email,
                    user_nom: profile.nom,
                  }),
                }).catch(console.error);
              }
            } catch (e) {
              console.error("Generation after payment failed:", e);
            }
          }
        } else if (session.mode === "subscription") {
          // Subscription activated
          await adminSupabase
            .from("profiles")
            .update({
              plan: "abonne",
              abonnement_actif: true,
              stripe_subscription_id: session.subscription as string,
              stripe_customer_id: session.customer as string,
            })
            .eq("id", userId);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await adminSupabase
          .from("profiles")
          .update({ abonnement_actif: false, plan: "free" })
          .eq("stripe_customer_id", customerId);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const isActive = subscription.status === "active";

        await adminSupabase
          .from("profiles")
          .update({
            abonnement_actif: isActive,
            plan: isActive ? "abonne" : "free",
          })
          .eq("stripe_customer_id", customerId);
        break;
      }
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
  }

  return NextResponse.json({ received: true });
}
