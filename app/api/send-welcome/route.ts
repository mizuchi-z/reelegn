import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { email, nom } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_URL!;
    const prenom = nom || "Créateur";

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@mizuchi-reelgen.fr",
      to: email,
      subject: "Bienvenue sur ReelGen by Mizuchi 🐉",
      html: `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue sur ReelGen</title>
</head>
<body style="margin:0;padding:0;background-color:#080F1A;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="font-size:24px;font-weight:900;letter-spacing:4px;color:#00B4D8;margin:0;">MIZUCHI</h1>
      <p style="font-size:11px;color:#5A7089;letter-spacing:3px;margin:4px 0 0;font-family:monospace;">REELGEN</p>
    </div>

    <!-- Dragon emoji -->
    <div style="text-align:center;font-size:48px;margin-bottom:24px;">🐉</div>

    <!-- Main card -->
    <div style="background:#0D1826;border:1px solid rgba(0,180,216,0.2);border-radius:8px;padding:32px;margin-bottom:24px;">
      <h2 style="font-size:20px;font-weight:700;color:#E8EFF6;margin:0 0 16px;">Bonjour ${prenom} !</h2>

      <p style="font-size:14px;color:#5A7089;line-height:1.6;margin:0 0 20px;">
        Ton compte est créé. Bienvenue dans ReelGen by Mizuchi.
      </p>

      <div style="background:#111F30;border-radius:6px;padding:16px;margin-bottom:24px;border-left:3px solid #00B4D8;">
        <p style="font-size:13px;font-weight:700;color:#00B4D8;margin:0 0 6px;">✦ 1 génération gratuite disponible</p>
        <p style="font-size:12px;color:#5A7089;margin:0;">
          Entre ton brief en 2 minutes. On génère le script, les prompts Higgsfield/Kling, la légende et les hashtags.
        </p>
      </div>

      <div style="text-align:center;">
        <a href="${appUrl}/generate" style="display:inline-block;background:#00B4D8;color:#080F1A;font-weight:700;font-size:13px;letter-spacing:1px;text-decoration:none;padding:14px 28px;border-radius:6px;text-transform:uppercase;">
          ⚡ GÉNÉRER MON PREMIER PACK →
        </a>
      </div>
    </div>

    <!-- Steps -->
    <div style="background:#0D1826;border:1px solid rgba(0,180,216,0.1);border-radius:8px;padding:24px;margin-bottom:24px;">
      <p style="font-size:11px;font-family:monospace;color:#5A7089;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;">COMMENT ÇA MARCHE</p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <span style="font-size:16px;min-width:24px;">1️⃣</span>
          <div>
            <p style="font-size:13px;font-weight:600;color:#E8EFF6;margin:0;">Décris ton business</p>
            <p style="font-size:12px;color:#5A7089;margin:2px 0 0;">Secteur, ambiance, message clé</p>
          </div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <span style="font-size:16px;min-width:24px;">2️⃣</span>
          <div>
            <p style="font-size:13px;font-weight:600;color:#E8EFF6;margin:0;">L'IA génère ton pack</p>
            <p style="font-size:12px;color:#5A7089;margin:2px 0 0;">Script + Prompts Higgsfield/Kling + Légende + Hashtags</p>
          </div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <span style="font-size:16px;min-width:24px;">3️⃣</span>
          <div>
            <p style="font-size:13px;font-weight:600;color:#E8EFF6;margin:0;">Tu tournes. Tu postes.</p>
            <p style="font-size:12px;color:#5A7089;margin:2px 0 0;">Télécharge le PDF et lance ton Reel</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding-top:24px;border-top:1px solid rgba(0,180,216,0.1);">
      <p style="font-size:13px;color:#5A7089;margin:0 0 8px;">ReelGen by <strong style="color:#00B4D8;">Mizuchi</strong></p>
      <p style="font-size:12px;color:#5A7089;margin:0;"><strong>@mizuchi_z</strong> · motionmatis@gmail.com · Nice, France</p>
    </div>
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Welcome email error:", error);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }
}
