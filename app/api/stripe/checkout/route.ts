import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { type, brief_data } = body;

    const baseUrl = process.env.NEXT_PUBLIC_URL!;

    if (type === "pack") {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price: process.env.STRIPE_PACK_PRICE_ID!,
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/generate?payment=success`,
        cancel_url: `${baseUrl}/generate?payment=cancelled`,
        customer_email: user.email,
        metadata: {
          user_id: user.id,
          brief_data: JSON.stringify(brief_data),
        },
      });

      return NextResponse.json({ url: session.url });
    }

    if (type === "subscription") {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price: process.env.STRIPE_SUB_PRICE_ID!,
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/dashboard?sub=success`,
        cancel_url: `${baseUrl}/pricing`,
        customer_email: user.email,
        metadata: { user_id: user.id },
      });

      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json({ error: "Type invalide" }, { status: 400 });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement" },
      { status: 500 }
    );
  }
}
