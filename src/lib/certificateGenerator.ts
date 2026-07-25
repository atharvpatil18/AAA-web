/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from "jspdf";

export interface CertificateData {
  studentName?: string;
  studentEmail?: string;
  setTitle: string;
  category: string;
  level: string;
  scorePercentage: number;
  correctCount: number;
  totalQuestions: number;
  timeTakenSeconds: number;
  completedAt: string;
}

export async function generateAchievementCertificatePDF(data: CertificateData) {
  try {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const width = 297;
    const height = 210;

    // Helper to load image
    const getBase64FromUrl = (url: string): Promise<string> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
          } else {
            resolve("");
          }
        };
        img.onerror = () => resolve("");
        img.src = url;
      });
    };

    const logoBase64 = await getBase64FromUrl("/logo.png");
    const sigNehaBase64 = await getBase64FromUrl("/signature_neha.png");
    const sigBoardBase64 = await getBase64FromUrl("/signature_board.png");

    // 1. Background Fill (Parchment White)
    doc.setFillColor(255, 253, 248);
    doc.rect(0, 0, width, height, "F");

    // 2. Royal Navy Outer Frame
    doc.setLineWidth(3);
    doc.setDrawColor(15, 23, 42); // Navy
    doc.rect(6, 6, width - 12, height - 12);

    // 3. Gold Inner Pinstripe Border
    doc.setLineWidth(1.2);
    doc.setDrawColor(217, 119, 6); // Gold
    doc.rect(9.5, 9.5, width - 19, height - 19);

    doc.setLineWidth(0.4);
    doc.setDrawColor(245, 158, 11);
    doc.rect(11.5, 11.5, width - 23, height - 23);

    // 4. International Corner Filigree Ornaments
    const drawCorner = (x: number, y: number, r1: number, r2: number) => {
      doc.setFillColor(217, 119, 6);
      doc.rect(x, y, r1, r1, "F");
      doc.setFillColor(15, 23, 42);
      doc.rect(x + (r1 - r2) / 2, y + (r1 - r2) / 2, r2, r2, "F");
    };

    drawCorner(6, 6, 8, 4);
    drawCorner(width - 14, 6, 8, 4);
    drawCorner(6, height - 14, 8, 4);
    drawCorner(width - 14, height - 14, 8, 4);

    // 5. Header Bar & Academy Identity
    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", width / 2 - 11, 15, 22, 22);
    }

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42);
    doc.text("ARNAV ABACUS ACADEMY", width / 2, 42, { align: "center" });

    doc.setFontSize(8.5);
    doc.setTextColor(217, 119, 6);
    doc.text("INTERNATIONAL ABACUS & SPEED MATH OLYMPIAD ACCREDITATION • WAKAD, PUNE, INDIA", width / 2, 47, { align: "center" });

    // Decorative Gold Divider
    doc.setLineWidth(0.6);
    doc.setDrawColor(217, 119, 6);
    doc.line(width / 2 - 75, 50, width / 2 + 75, 50);

    // 6. Title Section
    doc.setFont("Times", "bold");
    doc.setFontSize(24);
    doc.setTextColor(180, 83, 9); // Rich Gold Serif
    doc.text("INTERNATIONAL CERTIFICATE OF SPEED MATH EXCELLENCE", width / 2, 60, { align: "center" });

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("THIS INTERNATIONAL DIPLOMA IS PROUDLY PRESENTED TO", width / 2, 68, { align: "center" });

    // 7. Recipient Name
    const recipientName = (data.studentName && data.studentName.trim()) 
      ? data.studentName.trim().toUpperCase() 
      : (data.studentEmail ? data.studentEmail.split("@")[0].toUpperCase() : "GUEST SPEED MATH CHAMPION");

    doc.setFont("Times", "bold");
    doc.setFontSize(23);
    doc.setTextColor(15, 23, 42);
    doc.text(recipientName, width / 2, 80, { align: "center" });

    // Gold underline frame around recipient name
    doc.setLineWidth(0.8);
    doc.setDrawColor(217, 119, 6);
    doc.line(width / 2 - 65, 83, width / 2 + 65, 83);
    doc.setFillColor(217, 119, 6);
    doc.circle(width / 2, 83, 1.2, "F");

    // 8. Official Citation Text (Clean ASCII, no emoji artifacts)
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(51, 65, 85);
    const citation = `For demonstrating outstanding whole-brain calculation speed and mental accuracy in completing the "${data.setTitle}" drill with a score of ${data.scorePercentage}% (${data.correctCount}/${data.totalQuestions} Questions) in ${data.timeTakenSeconds} seconds.`;
    
    doc.text(doc.splitTextToSize(citation, 215), width / 2, 92, { align: "center" });

    // 9. Performance Details Card Box
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);
    doc.roundedRect(38, 107, width - 76, 32, 2.5, 2.5, "FD");

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(217, 119, 6);
    doc.text(`DRILL CATEGORY: ${data.category.toUpperCase()}   |   LEVEL: ${data.level.toUpperCase()}`, width / 2, 114, { align: "center" });

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const dateFormatted = new Date(data.completedAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    doc.text(`DATE OF ATTEMPT: ${dateFormatted}   |   VERIFICATION CODE: AAA-INT-${Math.floor(100000 + Math.random() * 900000)}`, width / 2, 121, { align: "center" });

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9.5);
    if (data.scorePercentage >= 75) {
      doc.setTextColor(16, 185, 129); // Emerald Green
      doc.text("PERFORMANCE GRADE: EXCELLENCE GOLD MEDALIST [ HIGH HONORS ]", width / 2, 129, { align: "center" });
    } else {
      doc.setTextColor(217, 119, 6); // Gold
      doc.text("PERFORMANCE GRADE: CERTIFIED SPEED MATH DIPLOMA [ COMPLETED ]", width / 2, 129, { align: "center" });
    }

    // 10. Official Gold Medal Seal & Ribbon Tails (Programmatic Vector Graphics)
    const sealX = width / 2;
    const sealY = 168;

    // Red Ribbon Tails
    doc.setFillColor(220, 38, 38); // Crimson Red
    doc.triangle(sealX - 8, sealY + 6, sealX - 16, sealY + 24, sealX - 4, sealY + 20, "F");
    doc.triangle(sealX + 8, sealY + 6, sealX + 16, sealY + 24, sealX + 4, sealY + 20, "F");

    // Gold Outer Starburst Ring
    doc.setFillColor(217, 119, 6);
    doc.circle(sealX, sealY, 13.5, "F");
    doc.setFillColor(245, 158, 11);
    doc.circle(sealX, sealY, 12, "F");
    doc.setFillColor(180, 83, 9);
    doc.circle(sealX, sealY, 10.5, "F");

    // Gold Inner Medal Body
    doc.setFillColor(254, 243, 199); // Light Gold
    doc.circle(sealX, sealY, 9, "F");

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(5.5);
    doc.setTextColor(180, 83, 9);
    doc.text("OFFICIAL", sealX, sealY - 3.5, { align: "center" });
    doc.text("EXCELLENCE", sealX, sealY, { align: "center" });
    doc.text("SEAL", sealX, sealY + 3.5, { align: "center" });

    // 11. Digital Signatures (Left & Right)
    const sigY = 166;

    // LEFT: Mrs. Neha Patil (Founder & Master Trainer)
    if (sigNehaBase64) {
      doc.addImage(sigNehaBase64, "PNG", 50, sigY - 14, 30, 12);
    } else {
      // Calligraphy representation when image not loaded
      doc.setFont("Times", "italic");
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text("Neha Patil", 65, sigY - 4, { align: "center" });
    }

    doc.setLineWidth(0.5);
    doc.setDrawColor(148, 163, 184);
    doc.line(42, sigY - 1, 88, sigY - 1);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text("Mrs. Neha Patil", 65, sigY + 4, { align: "center" });
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text("Founder & Master Abacus Trainer", 65, sigY + 8, { align: "center" });

    // RIGHT: Arnav Abacus Academic Board
    if (sigBoardBase64) {
      doc.addImage(sigBoardBase64, "PNG", width - 80, sigY - 14, 30, 12);
    } else {
      // Calligraphy representation when image not loaded
      doc.setFont("Times", "italic");
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text("Arnav Board", width - 65, sigY - 4, { align: "center" });
    }

    doc.setLineWidth(0.5);
    doc.setDrawColor(148, 163, 184);
    doc.line(width - 88, sigY - 1, width - 42, sigY - 1);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text("Arnav Academic Board", width - 65, sigY + 4, { align: "center" });
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text("Evaluation Committee Chair", width - 65, sigY + 8, { align: "center" });

    // 12. International Footer Accreditation
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text("Arnav Abacus Academy • Wakad, Pune, Maharashtra, India • www.arnavabacus.com • Phone: +91 90219 24968", width / 2, height - 10, { align: "center" });

    doc.save(`International_Certificate_${recipientName.replace(/\s+/g, "_")}.pdf`);
  } catch (err) {
    console.error("International Certificate generation error:", err);
    alert("Could not generate certificate PDF. Please try again.");
  }
}
