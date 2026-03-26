"use client";

import { Generation } from "./types";

export async function generatePDF(generation: Generation): Promise<Blob> {
  // Dynamic import to avoid SSR issues
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const { resultat } = generation;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Colors
  const darkBg = [8, 15, 26] as [number, number, number];
  const surface = [13, 24, 38] as [number, number, number];
  const cyan = [0, 180, 216] as [number, number, number];
  const textColor = [232, 239, 246] as [number, number, number];
  const mutedColor = [90, 112, 137] as [number, number, number];

  // ── PAGE 1: COUVERTURE ──
  doc.setFillColor(...darkBg);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Top accent line
  doc.setFillColor(...cyan);
  doc.rect(0, 0, pageWidth, 2, "F");

  // Brand
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...mutedColor);
  doc.text("REELGEN BY MIZUCHI", pageWidth / 2, 30, { align: "center" });

  // Dragon separator
  doc.setTextColor(...cyan);
  doc.setFontSize(20);
  doc.text("🐉", pageWidth / 2, 50, { align: "center" });

  // Business name
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...textColor);
  const businessName = generation.nom_business.toUpperCase();
  doc.text(businessName, pageWidth / 2, 75, { align: "center" });

  // Title reel
  doc.setFontSize(14);
  doc.setTextColor(...cyan);
  const titleLines = doc.splitTextToSize(resultat.titre_reel, pageWidth - margin * 2);
  doc.text(titleLines, pageWidth / 2, 95, { align: "center" });

  // Separator
  doc.setDrawColor(...cyan);
  doc.setLineWidth(0.5);
  doc.line(margin, 110, pageWidth - margin, 110);

  // Info grid
  const infoY = 125;
  const infoData = [
    ["Secteur", generation.secteur],
    ["Ambiance", generation.ambiance],
    ["Outil IA", generation.outil_ia],
    ["Durée", generation.duree_reel],
    ["Généré le", new Date(generation.created_at).toLocaleDateString("fr-FR")],
  ];

  doc.setFontSize(10);
  infoData.forEach(([label, value], i) => {
    const y = infoY + i * 12;
    doc.setTextColor(...mutedColor);
    doc.setFont("helvetica", "normal");
    doc.text(label.toUpperCase() + " :", margin, y);
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "bold");
    doc.text(value, margin + 40, y);
  });

  // Concept
  doc.setDrawColor(...cyan);
  doc.line(margin, 190, pageWidth - margin, 190);

  doc.setFontSize(9);
  doc.setTextColor(...mutedColor);
  doc.setFont("helvetica", "normal");
  doc.text("CONCEPT", margin, 202);

  doc.setFontSize(11);
  doc.setTextColor(...textColor);
  const conceptLines = doc.splitTextToSize(resultat.concept, pageWidth - margin * 2);
  doc.text(conceptLines, margin, 212);

  // Footer page 1
  doc.setFontSize(8);
  doc.setTextColor(...mutedColor);
  doc.text("Pack créé avec ReelGen by Mizuchi · @mizuchi_z · motionmatis@gmail.com", pageWidth / 2, pageHeight - 10, { align: "center" });

  // ── PAGE 2: SCRIPT ──
  doc.addPage();
  doc.setFillColor(...darkBg);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  doc.setFillColor(...cyan);
  doc.rect(0, 0, pageWidth, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...cyan);
  doc.text("SCRIPT CLIP PAR CLIP", margin, 25);

  doc.setFontSize(9);
  doc.setTextColor(...mutedColor);
  doc.text(`${resultat.script.length} clips · ${generation.duree_reel}`, margin, 33);

  autoTable(doc, {
    startY: 40,
    head: [["Clip", "Durée", "Action", "Émotion", "Transition"]],
    body: resultat.script.map((clip) => [
      `#${clip.clip}`,
      clip.duree,
      clip.action,
      clip.emotion,
      clip.transition,
    ]),
    styles: {
      fillColor: surface,
      textColor: textColor,
      fontSize: 9,
      cellPadding: 5,
      lineColor: [0, 180, 216, 0.2] as unknown as [number, number, number],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [17, 31, 48] as [number, number, number],
      textColor: cyan,
      fontSize: 9,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [17, 31, 48] as [number, number, number],
    },
    columnStyles: {
      0: { cellWidth: 12, halign: "center" },
      1: { cellWidth: 20, halign: "center" },
      2: { cellWidth: 50 },
      3: { cellWidth: 40 },
      4: { cellWidth: 40 },
    },
    margin: { left: margin, right: margin },
  });

  doc.setFontSize(8);
  doc.setTextColor(...mutedColor);
  doc.text("Pack créé avec ReelGen by Mizuchi · @mizuchi_z · motionmatis@gmail.com", pageWidth / 2, pageHeight - 10, { align: "center" });

  // ── PAGE 3: PROMPTS IA ──
  doc.addPage();
  doc.setFillColor(...darkBg);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  doc.setFillColor(...cyan);
  doc.rect(0, 0, pageWidth, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...cyan);
  doc.text(`PROMPTS ${generation.outil_ia.toUpperCase()}`, margin, 25);

  doc.setFontSize(9);
  doc.setTextColor(...mutedColor);
  doc.text("Copiez chaque prompt directement dans l'outil IA · Aspect ratio 9:16", margin, 33);

  let promptY = 43;

  for (const p of resultat.prompts) {
    if (promptY > pageHeight - 60) {
      doc.addPage();
      doc.setFillColor(...darkBg);
      doc.rect(0, 0, pageWidth, pageHeight, "F");
      promptY = 20;
    }

    // Clip header
    doc.setFillColor(...surface);
    doc.setDrawColor(...cyan);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, promptY, pageWidth - margin * 2, 8, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...cyan);
    doc.text(`CLIP ${p.clip} · ${p.outil.toUpperCase()}`, margin + 4, promptY + 5.5);

    promptY += 11;

    // Prompt text
    const promptLines = doc.splitTextToSize(p.prompt_en, pageWidth - margin * 2 - 8);
    const promptHeight = promptLines.length * 4.5 + 8;

    doc.setFillColor(17, 31, 48);
    doc.setDrawColor(30, 50, 70);
    doc.roundedRect(margin, promptY, pageWidth - margin * 2, promptHeight, 2, 2, "FD");

    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...textColor);
    doc.text(promptLines, margin + 4, promptY + 5);

    promptY += promptHeight + 8;
  }

  doc.setFontSize(8);
  doc.setTextColor(...mutedColor);
  doc.text("Pack créé avec ReelGen by Mizuchi · @mizuchi_z · motionmatis@gmail.com", pageWidth / 2, pageHeight - 10, { align: "center" });

  // ── PAGE 4: LÉGENDE & HASHTAGS ──
  doc.addPage();
  doc.setFillColor(...darkBg);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  doc.setFillColor(...cyan);
  doc.rect(0, 0, pageWidth, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...cyan);
  doc.text("LÉGENDE INSTAGRAM", margin, 25);

  // Legend box
  doc.setFillColor(...surface);
  doc.setDrawColor(...cyan);
  doc.setLineWidth(0.3);
  const legendLines = doc.splitTextToSize(resultat.legende, pageWidth - margin * 2 - 8);
  const legendHeight = Math.min(legendLines.length * 5 + 12, 100);
  doc.roundedRect(margin, 32, pageWidth - margin * 2, legendHeight, 3, 3, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...textColor);
  doc.text(legendLines, margin + 4, 39);

  // Hashtags
  const hashY = 32 + legendHeight + 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...cyan);
  doc.text("HASHTAGS (30)", margin, hashY);

  doc.setFont("courier", "normal");
  doc.setFontSize(8);
  doc.setTextColor(0, 180, 216);
  const hashText = resultat.hashtags.map((h) => `#${h}`).join("  ");
  const hashLines = doc.splitTextToSize(hashText, pageWidth - margin * 2);
  doc.text(hashLines, margin, hashY + 10);

  doc.setFontSize(8);
  doc.setTextColor(...mutedColor);
  doc.text("Pack créé avec ReelGen by Mizuchi · @mizuchi_z · motionmatis@gmail.com", pageWidth / 2, pageHeight - 10, { align: "center" });

  // ── PAGE FINALE: FOOTER MIZUCHI ──
  doc.addPage();
  doc.setFillColor(...darkBg);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Center content vertically
  const centerY = pageHeight / 2;

  doc.setFillColor(...surface);
  doc.setDrawColor(...cyan);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, centerY - 50, pageWidth - margin * 2, 100, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...cyan);
  doc.text("MIZUCHI", pageWidth / 2, centerY - 35, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(...mutedColor);
  doc.text("Contenu vidéo · Nice, France", pageWidth / 2, centerY - 25, { align: "center" });

  doc.setDrawColor(...cyan);
  doc.setLineWidth(0.3);
  doc.line(margin + 20, centerY - 18, pageWidth - margin - 20, centerY - 18);

  doc.setFontSize(11);
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "normal");
  doc.text("Pack créé avec ReelGen by Mizuchi", pageWidth / 2, centerY - 8, { align: "center" });
  doc.text("Besoin qu'on réalise ça pour vous ?", pageWidth / 2, centerY + 4, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(...cyan);
  doc.setFont("helvetica", "bold");
  doc.text("→ @mizuchi_z", pageWidth / 2, centerY + 18, { align: "center" });
  doc.text("→ motionmatis@gmail.com", pageWidth / 2, centerY + 28, { align: "center" });
  doc.text("→ Nice, France", pageWidth / 2, centerY + 38, { align: "center" });

  return doc.output("blob");
}
