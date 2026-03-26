import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { generation_id, user_email, user_nom } = body;

    if (!generation_id || !user_email) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const adminSupabase = createAdminClient();
    const { data: generation } = await adminSupabase
      .from("generations")
      .select("*")
      .eq("id", generation_id)
      .single();

    if (!generation) {
      return NextResponse.json(
        { error: "Generation not found" },
        { status: 404 }
      );
    }

    const { resultat } = generation;
    const prenom = user_nom || "Créateur";

    // Build PDF as HTML email with pack summary
    // (Full PDF generation requires browser APIs — email contains pack summary + link)
    const appUrl = process.env.NEXT_PUBLIC_URL!;
    const resultUrl = `${appUrl}/result/${generation_id}`;

    const clipCount = resultat.script?.length || 0;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@mizuchi-reelgen.fr",
      to: user_email,
      subject: `Ton pack Reel est prêt — ${generation.nom_business} 🎬`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ton pack Reel est prêt</title>
</head>
<body style="margin:0;padding:0;background-color:#080F1A;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="font-size:22px;font-weight:900;letter-spacing:4px;color:#00B4D8;margin:0;">MIZUCHI</h1>
      <p style="font-size:11px;color:#5A7089;letter-spacing:3px;margin:4px 0 0;font-family:monospace;">REELGEN</p>
    </div>

    <!-- Main card -->
    <div style="background:#0D1826;border:1px solid rgba(0,180,216,0.2);border-radius:8px;padding:32px;margin-bottom:24px;">
      <p style="font-size:14px;color:#5A7089;margin:0 0 8px;">Bonjour ${prenom},</p>
      <h2 style="font-size:20px;font-weight:700;color:#E8EFF6;margin:0 0 16px;">Ton pack pour <span style="color:#00B4D8;">${generation.nom_business}</span> est prêt !</h2>

      <div style="background:#111F30;border-radius:6px;padding:20px;margin-bottom:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;font-size:12px;color:#5A7089;font-family:monospace;text-transform:uppercase;letter-spacing:1px;width:40%;">Secteur</td>
            <td style="padding:6px 0;font-size:13px;color:#E8EFF6;">${generation.secteur}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:12px;color:#5A7089;font-family:monospace;text-transform:uppercase;letter-spacing:1px;">Ambiance</td>
            <td style="padding:6px 0;font-size:13px;color:#E8EFF6;">${generation.ambiance}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:12px;color:#5A7089;font-family:monospace;text-transform:uppercase;letter-spacing:1px;">Outil IA</td>
            <td style="padding:6px 0;font-size:13px;color:#E8EFF6;">${generation.outil_ia}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:12px;color:#5A7089;font-family:monospace;text-transform:uppercase;letter-spacing:1px;">Clips</td>
            <td style="padding:6px 0;font-size:13px;color:#E8EFF6;">${clipCount} clips · ${generation.duree_reel}</td>
          </tr>
        </table>
      </div>

      <div style="background:#0A1929;border-left:3px solid #00B4D8;padding:12px 16px;border-radius:0 6px 6px 0;margin-bottom:24px;">
        <p style="font-size:13px;font-style:italic;color:#E8EFF6;margin:0;">"${resultat.titre_reel}"</p>
        <p style="font-size:12px;color:#5A7089;margin:4px 0 0;">${resultat.concept}</p>
      </div>

      <!-- CTA -->
      <div style="text-align:center;">
        <a href="${resultUrl}" style="display:inline-block;background:#00B4D8;color:#080F1A;font-weight:700;font-size:13px;letter-spacing:1px;text-decoration:none;padding:14px 28px;border-radius:6px;text-transform:uppercase;">
          VOIR MON PACK EN LIGNE →
        </a>
        <p style="font-size:11px;color:#5A7089;margin:12px 0 0;">Télécharge le PDF directement depuis la page</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding-top:24px;border-top:1px solid rgba(0,180,216,0.1);">
      <p style="font-size:13px;color:#5A7089;margin:0 0 8px;">Pack créé avec <strong style="color:#00B4D8;">ReelGen by Mizuchi</strong></p>
      <p style="font-size:12px;color:#5A7089;margin:0;">Besoin qu&apos;on réalise ça pour vous ? <strong>@mizuchi_z</strong> · motionmatis@gmail.com</p>
      <p style="font-size:11px;color:#5A7089;margin:8px 0 0;">Nice, France</p>
    </div>
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send PDF email error:", error);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }
}
