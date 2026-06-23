/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from "jspdf";

export const generateBrochurePDF = async (language: string) => {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Helper to fetch and convert image to Base64
    const getBase64FromUrl = (url: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/jpeg", 0.8));
          } else {
            reject(new Error("Canvas context error"));
          }
        };
        img.onerror = () => reject(new Error("Image load error: " + url));
        img.src = url;
      });
    };

    let logoBase64 = "";
    let photoBase64 = "";

    try {
      logoBase64 = await getBase64FromUrl("/logo.png");
    } catch (err) {
      console.warn("Logo load failed", err);
    }

    try {
      photoBase64 = await getBase64FromUrl("/teacher-profile.jpg");
    } catch (err) {
      console.warn("Photo load failed", err);
    }

    // Helper: Header design for internal pages
    const drawPageDecorations = (pageNum: number) => {
      doc.setFillColor(26, 46, 53); // dark gray
      doc.rect(0, 0, 210, 8, "F");
      doc.setFillColor(242, 100, 25); // orange
      doc.rect(0, 8, 210, 2, "F");

      // Footer
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${pageNum} of 4 • Arnav Abacus Academy`, 15, 285);
      doc.text("Contact: +91 90219 24968", 165, 285);
    };

    // ==========================================
    // --- PAGE 1: COVER PAGE & FOUNDER WELCOME ---
    // ==========================================
    doc.setFillColor(26, 46, 53);
    doc.rect(0, 0, 210, 8, "F");
    doc.setFillColor(242, 100, 25);
    doc.rect(0, 8, 210, 2, "F");

    if (logoBase64) {
      doc.addImage(logoBase64, "JPEG", 15, 15, 22, 22);
    }

    doc.setTextColor(26, 46, 53);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(24);
    doc.text("ARNAV ABACUS ACADEMY", 42, 25);
    doc.setFontSize(10);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(242, 100, 25);
    doc.text("FOUNDATIONAL NUMERACY • COGNITIVE FOCUS • SAT & OLYMPIAD SPEED MATHS", 42, 31);

    doc.setDrawColor(220, 220, 220);
    doc.line(15, 42, 195, 42);

    // Welcome Section Title
    doc.setTextColor(26, 46, 53);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Founder & Director's Address", 15, 52);

    if (photoBase64) {
      doc.setDrawColor(26, 46, 53);
      doc.setLineWidth(0.5);
      doc.rect(15, 58, 42, 50);
      doc.addImage(photoBase64, "JPEG", 15, 58, 42, 50);
    }

    const textX = photoBase64 ? 62 : 15;
    const textWidth = photoBase64 ? 133 : 180;
    doc.setTextColor(60, 60, 60);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);

    const addressLetter = `Dear Parents,

Welcome to Arnav Abacus Academy (AAA). We believe that math should never be a subject of exam anxiety or blind rote calculations. 

Our mission is to combine tactile Soroban Abacus techniques with fast Vedic Math sutras to unlock children's visual agility, spatial diagnostics, and whole-brain memory coordination. 

Whether your child makes silly arithmetic mistakes or is already a sharp performer striving for national & international Olympiad ranks, our max 1:8 batch sizes ensure they receive customized attention to excel.

Thank you for trusting us with your child's academic development.

Neha Patil
Founder & Director, Arnav Abacus Academy (IIVA Certified Master Coach)`;

    const splitLetter = doc.splitTextToSize(addressLetter, textWidth);
    doc.text(splitLetter, textX, 62);

    doc.setDrawColor(220, 220, 220);
    doc.line(15, 120, 195, 120);

    // About Neha Patil / Accreditations
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(26, 46, 53);
    doc.text("Professional Academy Accreditations & Standards", 15, 128);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(80, 80, 80);
    const bioText = `Arnav Abacus Academy operates under government-registered guidelines and is a certified Indian Institute of Vedic Maths & Abacus (IIVA) master center. Fully aligned with the National Education Policy (NEP) 2020 and Indian Knowledge Systems (IKS), we bridge the gap between abstract academic arithmetic (CBSE, ICSE, IB, IGCSE, US Common Core) and visual mental calculations. 

Over 200+ Wakad, Pune classroom students and 10+ online students in the US, UK, and Gulf countries have unlocked photographic memory with our certified curriculum.`;

    const splitBio = doc.splitTextToSize(bioText, 180);
    doc.text(splitBio, 15, 134);

    // Pillars Box
    doc.setFillColor(242, 100, 25, 0.05);
    doc.rect(15, 162, 180, 42, "F");
    doc.setDrawColor(242, 100, 25);
    doc.rect(15, 162, 180, 42);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(242, 100, 25);
    doc.text("OUR CORE VALUES:", 20, 169);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(50, 50, 50);
    doc.text("- Guaranteed 1:8 Student-Teacher Classroom Ratios (1:4 Online Micro-batches)", 20, 176);
    doc.text("- Complete School board curriculum sync to directly boost exam scorecard grades", 20, 182);
    doc.text("- Visual & tactile teaching methods that eliminate calculator and finger counting dependence", 20, 188);
    doc.text("- Premium globally shipped physical abacus kits & verifiable certifications", 20, 194);

    // Cover Footer
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Page 1 of 4 • Arnav Abacus Academy", 15, 285);
    doc.text("Contact: +91 90219 24968", 165, 285);

    // ==========================================
    // --- PAGE 2: COURSES & COMPETITOR SWITCH ---
    // ==========================================
    doc.addPage();
    drawPageDecorations(2);

    doc.setTextColor(26, 46, 53);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Targeted Mathematical Training Streams", 15, 20);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 100, 100);
    doc.text("AAA offers structured levels for various age scales and competitive targets:", 15, 25);

    // Card 1
    doc.setFillColor(245, 247, 248);
    doc.rect(15, 30, 85, 45, "F");
    doc.setDrawColor(220, 220, 220);
    doc.rect(15, 30, 85, 45);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(26, 46, 53);
    doc.text("1. Abacus Math & Focus", 19, 36);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text("- Ages: 4 to 14 Years", 19, 42);
    doc.text("- Tactile bead counting practice", 19, 47);
    doc.text("- Photographic recall activation", 19, 52);
    doc.text("- Zeroes down calculation errors", 19, 57);

    // Card 2
    doc.setFillColor(245, 247, 248);
    doc.rect(110, 30, 85, 45, "F");
    doc.rect(110, 30, 85, 45);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(26, 46, 53);
    doc.text("2. Vedic Speed Math", 114, 36);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text("- Ages: 9 to 16 Years", 114, 42);
    doc.text("- 16 Vedic calculation sutras", 114, 47);
    doc.text("- 10-15x faster squaring & multiplying", 114, 52);
    doc.text("- Ideal for SAT, ACT, and UKMT tests", 114, 57);

    // Card 3
    doc.setFillColor(245, 247, 248);
    doc.rect(15, 82, 85, 45, "F");
    doc.rect(15, 82, 85, 45);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(26, 46, 53);
    doc.text("3. Olympiad / IPM Math", 19, 88);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text("- Target: High-stakes math contents", 19, 94);
    doc.text("- Logical reasoning questions", 19, 99);
    doc.text("- Conceptual depth checking", 19, 104);
    doc.text("- Formulated for Kangaroo Math & IPM", 19, 109);

    // Card 4
    doc.setFillColor(245, 247, 248);
    doc.rect(110, 82, 85, 45, "F");
    doc.rect(110, 82, 85, 45);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(26, 46, 53);
    doc.text("4. Scholarship & Competitive", 114, 88);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text("- Target: State board scholarship", 114, 94);
    doc.text("- Time management tricks", 114, 99);
    doc.text("- Advanced arithmetic practice", 114, 104);
    doc.text("- School syllabus grade booster", 114, 109);

    doc.setDrawColor(220, 220, 220);
    doc.line(15, 137, 195, 137);

    // Comparison Section Title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(26, 46, 53);
    doc.text("The Franchise Switch: Why Parents Choose AAA", 15, 145);

    // Simple Table Grid
    doc.setFillColor(240, 244, 248);
    doc.rect(15, 152, 180, 8, "F");
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("Comparison parameter", 17, 157);
    doc.text("Arnav Abacus Academy", 75, 157);
    doc.text("Standard Commercial Franchises", 135, 157);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);

    // Comparison Rows
    const rows = [
      ["Batch Size Ratios", "Max 1:8 ratio for personalized guidance", "Crowded batches of 1:15 to 1:30 kids"],
      ["Mentor Continuity", "Neha Patil directs all levels directly", "High teacher turnover & part-time staff"],
      ["School Synergy", "Direct link to school board CBSE/ICSE word questions", "Strict repetitive drills in isolation"],
      ["Class Timing Fit", "1:4 micro-batches matched to US/UK/Gulf time zones", "Rigid timeframes with zero flexibility"]
    ];

    let rowY = 168;
    rows.forEach((r) => {
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(26, 46, 53);
      doc.text(r[0], 17, rowY);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(0, 137, 123); // Teal
      doc.text("✓  " + r[1], 75, rowY);
      doc.setTextColor(211, 47, 47); // Red
      doc.text("✗  " + r[2], 135, rowY);

      doc.setDrawColor(240, 240, 240);
      doc.line(15, rowY + 3, 195, rowY + 3);
      rowY += 9;
    });

    // ==========================================
    // --- PAGE 3: STUDENT SUCCESS STORIES ---
    // ==========================================
    doc.addPage();
    drawPageDecorations(3);

    doc.setTextColor(26, 46, 53);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Hall of Fame: Our Student Success Stories", 15, 20);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 100, 100);
    doc.text("Meet our supersonic performers and international winners:", 15, 25);

    // Story 1: Arnav Patil
    doc.setFillColor(255, 248, 240);
    doc.rect(15, 30, 180, 32, "F");
    doc.setDrawColor(242, 100, 25);
    doc.rect(15, 30, 180, 32);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(242, 100, 25);
    doc.text("Arnav Patil - 1st Rank International Champion (2025)", 20, 37);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    const story1Text = `Secured 1st Rank at the International Abacus Competition on National Mathematics Day 2025. Awarded with a trophy by India's legendary former IPS officer Dr. Kiran Bedi. Followed this up by securing another 1st Rank at the 8th International Abacus Competition Pune.`;
    doc.text(doc.splitTextToSize(story1Text, 170), 20, 43);

    // Story 2: Spriha Kamath
    doc.setFillColor(240, 247, 245);
    doc.rect(15, 68, 180, 32, "F");
    doc.setDrawColor(0, 137, 123);
    doc.rect(15, 68, 180, 32);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0, 137, 123);
    doc.text("Spriha Kamath - Student of the Year & 100% Score Holder", 20, 75);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    const story2Text = `Acknowledged for stellar consistency and timeline homework submissions, Spriha scored a perfect 100% in Runner Level 1 Abacus verification. Under Neha Patil's guidance, she built visual mathematics recall that directly improved school performance.`;
    doc.text(doc.splitTextToSize(story2Text, 170), 20, 81);

    // Story 3: Hitanshi Agarwal
    doc.setFillColor(245, 247, 248);
    doc.rect(15, 106, 180, 32, "F");
    doc.setDrawColor(100, 100, 100);
    doc.rect(15, 106, 180, 32);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text("Hitanshi Agarwal & Shreshth Gupta - International Ranks", 20, 113);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    const story3Text = `Hitanshi clinched Rank 3 at the 8th International Abacus Competition 2025, and Shreshth clinched Rank 1 (B1 Level) competing against 150+ students in Pune. This proves the agility of visual photographic memory taught at Arnav Academy.`;
    doc.text(doc.splitTextToSize(story3Text, 170), 20, 119);

    // Review snippet
    doc.setFillColor(245, 247, 250);
    doc.rect(15, 146, 180, 22, "F");
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(80, 80, 80);
    doc.text('"Neha Mam’s abacus class completely changed our daughter\'s perspective on math. She no longer counts on fingers, and her mental calculation speed is faster than ours!" - Sameer Kamath (Parent)', 20, 154);

    // ==========================================
    // --- PAGE 4: FAQ & ENROLLMENT CONTACT ---
    // ==========================================
    doc.addPage();
    drawPageDecorations(4);

    doc.setTextColor(26, 46, 53);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Frequently Asked Questions (FAQs)", 15, 20);

    // FAQ 1
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text("Q1. What is the recommended starting age for Abacus and Vedic Maths?", 15, 30);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(80, 80, 80);
    doc.text("A: Abacus is ideal for children aged 4 to 14, as it utilizes tactile memory during key brain development years. Vedic Math is recommended for children aged 9 to 16 to boost speed arithmetic.", 17, 36);

    // FAQ 2
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(26, 46, 53);
    doc.text("Q2. How does AAA synchronize with standard school curricula?", 15, 48);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text("A: We align our mental math techniques directly with CBSE, ICSE, IB, IGCSE, and State Board concepts. Instead of abstract calculation, children learn to apply abacus speeds to school word problems.", 17, 54);

    // FAQ 3
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(26, 46, 53);
    doc.text("Q3. Do you offer online classes for international students?", 15, 66);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text("A: Yes, we host premium online classes in 1:4 micro-batches. Sessions are timed to match US, UK, and Gulf time zones, and physical learning kits (abacus tool, worksheets) are shipped directly to your home.", 17, 72);

    // FAQ 4
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(26, 46, 53);
    doc.text("Q4. Are the batches and certifications recognized?", 15, 84);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text("A: Yes, Arnav Abacus Academy is government-registered and partnered with the Indian Institute of Vedic Maths & Abacus (IIVA). All level transition certificates are globally verifiable.", 17, 90);

    doc.setDrawColor(220, 220, 220);
    doc.line(15, 104, 195, 104);

    // Enrollment Call to action
    doc.setFillColor(26, 46, 53);
    doc.rect(15, 114, 180, 68, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("BOOK A FREE EVALUATION DEMO TODAY!", 22, 124);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text("- Get diagnostic cognitive assessment on concentration, speed, & focus scale.", 22, 133);
    doc.text("- Pre-schedule online zoom demo classes or offline classroom sessions.", 22, 139);
    doc.text("- Claim 2 free trial value-added sessions to see instant arithmetic progress.", 22, 145);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(242, 100, 25);
    doc.text("Contact Neha Patil (Certified Master Coach) to Book Slot:", 22, 155);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text("WhatsApp / Phone Hotline: +91 90219 24968", 22, 163);
    doc.text("Email Inquiries: nehaatharv@gmail.com", 22, 171);

    // Location Address
    doc.setFillColor(245, 247, 248);
    doc.rect(15, 194, 180, 28, "F");
    doc.setDrawColor(220, 220, 220);
    doc.rect(15, 194, 180, 28);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(26, 46, 53);
    doc.text("Arnav Abacus Academy - Wakad Center", 20, 201);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Address: Flat No. 3, 1st Floor, Adv. Balaji Sagar Bungalow,", 20, 207);
    doc.text("Opposite Creative Cameo, Near Park Street, Wakad, Pune, Maharashtra 411057, India", 20, 213);

    doc.save("arnav_abacus_academy_brochure.pdf");

  } catch (err) {
    console.error("Brochure Generation Error", err);
    alert("Failed to compile brochure PDF.");
  }
};
