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

    // Helper to load logo
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

    // 1. Background Fill
    doc.setFillColor(254, 252, 246); // Warm Cream
    doc.rect(0, 0, width, height, "F");

    // 2. Double Gold Border
    doc.setLineWidth(2.5);
    doc.setDrawColor(217, 119, 6); // Amber Gold
    doc.rect(8, 8, width - 16, height - 16);

    doc.setLineWidth(0.8);
    doc.setDrawColor(245, 158, 11);
    doc.rect(11, 11, width - 22, height - 22);

    // 3. Corner Accent Boxes
    const cornerSize = 10;
    doc.setFillColor(245, 158, 11);
    doc.rect(8, 8, cornerSize, cornerSize, "F");
    doc.rect(width - 8 - cornerSize, 8, cornerSize, cornerSize, "F");
    doc.rect(8, height - 8 - cornerSize, cornerSize, cornerSize, "F");
    doc.rect(width - 8 - cornerSize, height - 8 - cornerSize, cornerSize, cornerSize, "F");

    // 4. Academy Logo & Top Header
    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", width / 2 - 12, 16, 24, 24);
    }

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(26, 46, 53); // Deep Navy
    doc.text("ARNAV ABACUS ACADEMY", width / 2, 45, { align: "center" });

    doc.setFontSize(9);
    doc.setTextColor(242, 100, 25); // Vibrant Orange
    doc.text("WAKAD, PUNE • NEP 2020 WHOLE-BRAIN SPEED MATH DEVELOPMENT", width / 2, 50, { align: "center" });

    // 5. Main Title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(217, 119, 6);
    doc.text("CERTIFICATE OF ACHIEVEMENT", width / 2, 64, { align: "center" });

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("THIS IS PROUDLY PRESENTED TO", width / 2, 73, { align: "center" });

    // 6. Student Name
    const recipientName = (data.studentName && data.studentName.trim()) 
      ? data.studentName.trim().toUpperCase() 
      : (data.studentEmail ? data.studentEmail.split("@")[0].toUpperCase() : "GUEST SPEED MATH CHAMPION");

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(15, 23, 42);
    doc.text(recipientName, width / 2, 86, { align: "center" });

    // Decorative underline for name
    doc.setLineWidth(1);
    doc.setDrawColor(245, 158, 11);
    doc.line(width / 2 - 60, 89, width / 2 + 60, 89);

    // 7. Citation Text
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    const citation = `For outstanding speed calculation agility in completing the "${data.setTitle}" drill with an accuracy score of ${data.scorePercentage}% (${data.correctCount}/${data.totalQuestions} Questions) in ${data.timeTakenSeconds} seconds.`;
    
    doc.text(doc.splitTextToSize(citation, 220), width / 2, 98, { align: "center" });

    // 8. Performance Details Box
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(40, 114, width - 80, 32, 3, 3, "FD");

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(242, 100, 25);
    doc.text(`DRILL CATEGORY: ${data.category.toUpperCase()} • LEVEL: ${data.level.toUpperCase()}`, width / 2, 122, { align: "center" });

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const dateFormatted = new Date(data.completedAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    doc.text(`DATE OF ATTEMPT: ${dateFormatted}   |   CERTIFICATE ID: AAA-${Math.floor(100000 + Math.random() * 900000)}`, width / 2, 129, { align: "center" });

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    if (data.scorePercentage >= 75) {
      doc.setTextColor(16, 185, 129);
    } else {
      doc.setTextColor(245, 158, 11);
    }
    doc.text(`GRADE: ${data.scorePercentage >= 75 ? "EXCELLENCE GOLD RIBBON ⭐" : "SPEED MATH COMPLETED 🎉"}`, width / 2, 137, { align: "center" });

    // 9. Signatures & Official Stamp
    const sigY = 175;

    // Left Signature
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text("Mrs. Neha Patil", 60, sigY);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Founder & Master Abacus Trainer", 60, sigY + 4);
    doc.line(40, sigY - 4, 100, sigY - 4);

    // Center Gold Seal
    doc.setFillColor(245, 158, 11);
    doc.circle(width / 2, sigY - 2, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(7);
    doc.text("OFFICIAL", width / 2, sigY - 4, { align: "center" });
    doc.text("SEAL", width / 2, sigY, { align: "center" });
    doc.text("★ AAA ★", width / 2, sigY + 4, { align: "center" });

    // Right Signature
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text("Arnav Abacus Board", width - 60, sigY, { align: "center" });
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Academic Evaluation Committee", width - 60, sigY + 4);
    doc.line(width - 90, sigY - 4, width - 30, sigY - 4);

    // 10. Footer Note
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text("Arnav Abacus Academy • Wakad, Pune, Maharashtra • www.arnavabacus.com • Phone: +91 90219 24968", width / 2, height - 12, { align: "center" });

    doc.save(`Arnav_Abacus_Speed_Certificate_${recipientName.replace(/\s+/g, "_")}.pdf`);
  } catch (err) {
    console.error("Certificate generation error:", err);
    alert("Could not generate certificate PDF. Please try again.");
  }
}
