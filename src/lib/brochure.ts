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

    const getBase64FromUrl = (url: string, makeCircular: boolean = false): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const size = Math.min(img.width, img.height);
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            if (makeCircular) {
              ctx.beginPath();
              ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
              ctx.clip();
            }
            ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);
            // Changed from image/jpeg to image/png to preserve canvas transparency (no black corners)
            resolve(canvas.toDataURL("image/png"));
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
      // Fetch logo and crop to a circular shape
      logoBase64 = await getBase64FromUrl("/logo.png", true);
    } catch (err) {
      console.warn("Logo load failed", err);
    }

    try {
      // Fetch teacher photo and crop to a circular shape
      photoBase64 = await getBase64FromUrl("/teacher-profile.jpg", true);
    } catch (err) {
      console.warn("Photo load failed", err);
    }

    // ======================================================================
    // --- VIBRANT SOLID BLOCK-COLOR 1-PAGE A4 BROCHURE (WHITE TEXT ONLY) ---
    // ======================================================================
    
    // Page Background - Cream/Soft off-white
    doc.setFillColor(250, 248, 245);
    doc.rect(0, 0, 210, 297, "F");

    // Transparent horizontal separator line helper
    const drawSeparator = (y: number) => {
      doc.setDrawColor(240, 236, 230);
      doc.setLineWidth(0.3);
      doc.line(10, y, 200, y);
    };

    // 1. BRAND HEADER BLOCK (Navy Background with Circular Clipped Logo)
    doc.setFillColor(26, 46, 53); // Deep Navy
    doc.rect(0, 0, 210, 31, "F");

    // Circular Logo Drawing
    if (logoBase64) {
      // Image base64 is circular with transparent corners (using PNG)
      doc.addImage(logoBase64, "PNG", 12, 7.5, 16, 16);
    }
    
    doc.setTextColor(255, 255, 255); // White Text
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.text("ARNAV ABACUS ACADEMY", 32, 14.5);

    doc.setFontSize(8.5);
    doc.setTextColor(242, 100, 25); // Vibrant Orange tag
    doc.text("NEP 2020 COGNITIVE SKILLS | IIVA CERTIFIED TRAINING CENTER", 32, 19.5);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(210, 215, 220); // Muted gray-white
    doc.text("Wakad, Pune (Physical Hub) | International Online Micro-batches (US, UK, Gulf)", 32, 24.5);

    // 2. HOOK & FOUNDER SIDE-BY-SIDE BLOCKS
    // Left Hook Box (Solid Purple with White Text, Rounded)
    const hookY = 35;
    doc.setFillColor(124, 58, 237); // Vibrant Purple
    doc.roundedRect(12, hookY, 112, 28, 2, 2, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.text("UNLOCK YOUR CHILD'S MATH SUPERPOWERS!", 15, hookY + 4.5);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8.5);
    const hookText = "Traditional math workbook drills induce fear and rote memorization stress. We replace boring routines with visual abacus beads and ancient Vedic shortcuts, triggering whole-brain cognitive growth.";
    doc.text(doc.splitTextToSize(hookText, 106), 15, hookY + 9); // Spaced to avoid vertical overlap

    // Neha Patil's Welcome Quote (Oblique white text)
    doc.setFont("Helvetica", "oblique");
    doc.setFontSize(8);
    const welcomeMsg = "\"At AAA, we do not just teach calculations. We inspire deep spatial concentration and visual mastery of numbers to build lifelong academic self-belief.\"";
    doc.text(doc.splitTextToSize(welcomeMsg, 106), 15, hookY + 21.5);

    // Founder Info Badge - Solid Orange Background with White Text
    doc.setFillColor(217, 119, 6); // Vibrant Orange/Amber
    doc.roundedRect(130, hookY, 68, 28, 2, 2, "F");

    if (photoBase64) {
      doc.addImage(photoBase64, "PNG", 132.5, hookY + 6.5, 15, 15); // Circular cropped image
    }
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("Neha Patil", 151, hookY + 9.5);
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7.2); // Scaled down text to cleanly fit the longer certification phrase on the badge
    doc.setTextColor(240, 240, 240);
    doc.text("Founder & Master Trainer\nIIVA Certified International\nAbacus & Vedic Math\n(200+ Students Mentored)", 151, hookY + 14);

    drawSeparator(67);

    // 3. PROGRAMS GRID (3 Solid block columns, white text)
    doc.setTextColor(26, 46, 53);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text("High-Impact Learning Streams (Ages 4-14)", 12, 72);

    const colWidth = 59;
    const colGap = 6;
    const startX = 12;
    const startY = 76;

    const programs = [
      {
        title: "The Magic Bead Quest",
        tagline: "Abacus Math (Ages 4-14)",
        desc: "Transforms numbers into visual beads. Taps right-brain stimulation to multiply concentration, focus, and photographic memory storage.",
        accent: [234, 88, 12], // Solid Orange
        benefit1: "Photographic visual memory",
        benefit2: "Sensory hand-eye coordination",
        benefit3: "Laser-sharp school focus"
      },
      {
        title: "Speed-Math Sorcery",
        tagline: "Vedic Math (Ages 9-16)",
        desc: "16 speed principles that make calculations 10-15x faster. Skips manual worksheets and builds key Olympiad & SAT/ACT confidence.",
        accent: [13, 148, 136], // Solid Teal
        benefit1: "Rough workspace bypass",
        benefit2: "Elite competitive exam edge",
        benefit3: "Cross-checking calculation speeds"
      },
      {
        title: "The Olympiad Arena",
        tagline: "Academic Board Synergy",
        desc: "Direct board CBSE/ICSE class synergy. Sharpens logical concept checks to completely eradicate exam worksheet errors.",
        accent: [37, 99, 235], // Solid Blue
        benefit1: "CBSE & ICSE sync boards",
        benefit2: "Prep mock worksheets",
        benefit3: "Analytical grade boosts"
      }
    ];

    programs.forEach((prog, index) => {
      const x = startX + index * (colWidth + colGap);
      
      // Card Background (Vibrant Solid Color blocks)
      doc.setFillColor(prog.accent[0], prog.accent[1], prog.accent[2]);
      doc.roundedRect(x, startY, colWidth, 61, 2, 2, "F");
      
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(prog.title, x + 3.5, startY + 6.5);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(255, 220, 180); // Lighter accent color tag text
      doc.text(prog.tagline, x + 3.5, startY + 11);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(245, 245, 245);
      doc.text(doc.splitTextToSize(prog.desc, colWidth - 7), x + 3.5, startY + 15.5);

      // Benefit list (Vibrant inner white panel with colored text outcomes)
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x + 2, startY + 35, colWidth - 4, 24, 1.5, 1.5, "F");

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(prog.accent[0], prog.accent[1], prog.accent[2]);
      doc.text("Focus Outcomes:", x + 4, startY + 39.5);
      
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(70, 70, 70);
      doc.setFontSize(8);
      doc.text("- " + prog.benefit1, x + 4, startY + 44);
      doc.text("- " + prog.benefit2, x + 4, startY + 48);
      doc.text("- " + prog.benefit3, x + 4, startY + 52);
    });

    drawSeparator(141);

    // 4. WHY ARNAV ACADEMY VS FRANCHISES (Navy Block with White Text)
    doc.setTextColor(26, 46, 53);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Why Parents Choose Arnav Academy over Others", 12, 146);

    const tableY = 150;
    doc.setFillColor(26, 46, 53);
    doc.rect(12, tableY, 186, 6, "F");

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text("Strategic Metric", 15, tableY + 4.5);
    doc.text("Arnav Abacus Academy Advantage", 68, tableY + 4.5);
    doc.text("Commercial Franchises", 142, tableY + 4.5);

    const tableRows = [
      ["Classroom Student Ratio", "Max 1:8 ratio for personalized mentor care", "Crowded batches of 1:15 to 1:25 kids"],
      ["Syllabus Coordination", "Linked to school CBSE/ICSE curriculum directly", "Abstract homework drills in isolation"],
      ["Batch Flexibility", "Micro-batches matched to custom time zones", "Rigid slots with no option to reschedule"]
    ];

    tableRows.forEach((row, i) => {
      const y = tableY + 6 + (i * 7.5);
      doc.setFillColor(i % 2 === 0 ? 255 : 245, i % 2 === 0 ? 255 : 247, i % 2 === 0 ? 255 : 248);
      doc.rect(12, y, 186, 7.5, "F");
      
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(26, 46, 53);
      doc.text(row[0], 15, y + 5);

      // Custom Vector Check AAA
      doc.setFillColor(0, 121, 107);
      doc.circle(68, y + 3.8, 0.9, "F");
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(0, 121, 107);
      doc.setFontSize(8.5);
      doc.text(row[1], 71, y + 5);

      // Custom Vector Cross Commercial
      doc.setFillColor(198, 40, 40);
      doc.rect(142, y + 2.9, 1.8, 1.8, "F");
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(198, 40, 40);
      doc.text(row[2], 145, y + 5);
    });

    drawSeparator(183);

    // 5. QUICK PARENT FAQs (3 Solid vibrant columns, white text)
    doc.setTextColor(26, 46, 53);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Quick Parent FAQs", 12, 188);

    const faqs = [
      {
        q: "Q: Will this confuse current school methods?",
        a: "A: No! It acts as a mental catalyst, enabling kids to solve board school sheets up to 10x faster.",
        bg: [79, 70, 229] // Solid Indigo 600
      },
      {
        q: "Q: My child hates repetition. How to trigger interest?",
        a: "A: We replace rote drills with abacus visual gaming rounds. Learning feels like playing a quest!",
        bg: [217, 119, 6] // Solid Amber 600
      },
      {
        q: "Q: How soon can we expect improvements?",
        a: "A: Most parents report that finger-counting disappears and scores boost within the first 30 days.",
        bg: [225, 29, 72] // Solid Rose 600
      }
    ];

    const faqColWidth = 59;
    const faqColGap = 6;
    const faqStartY = 192;

    faqs.forEach((faq, index) => {
      const x = startX + index * (faqColWidth + faqColGap);
      
      // FAQ Box Background (Vibrant solid blocks)
      doc.setFillColor(faq.bg[0], faq.bg[1], faq.bg[2]);
      doc.roundedRect(x, faqStartY, faqColWidth, 25, 2, 2, "F");

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(255, 255, 255);
      doc.text(doc.splitTextToSize(faq.q, faqColWidth - 4), x + 2.5, faqStartY + 4.5);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(240, 240, 240);
      doc.text(doc.splitTextToSize(faq.a, faqColWidth - 4), x + 2.5, faqStartY + 12.5);
    });

    drawSeparator(221);

    // 6. STUDENT SUCCESS & PROMISE BOX (Side-by-Side row, solid block colors)
    doc.setTextColor(26, 46, 53);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Student Success & Our Promise", 12, 226);

    const midStartY = 230;
    // Left Box: Student Success (Solid Crimson Pink, White Text) - height extended slightly to fit 4 stories
    doc.setFillColor(219, 39, 119); // Pink 600
    doc.roundedRect(12, midStartY, 91, 30, 2, 2, "F");

    const stories = [
      "Arnav Patil: Achieved Rank 1 at the 8th International Abacus Meet (presented by Dr. Kiran Bedi).",
      "Hitanshi Agarwal & Shreshth Gupta: Clinched Ranks 3 & 1 respectively at the International Abacus Competition Pune 2025.",
      "Spriha Kamath: Perfect 100% score in Visual Abacus certification.",
      "Neha Patil: Honored with three consecutive Business Excellence Awards (2025-26)." // Added 4th Success story
    ];

    stories.forEach((story, idx) => {
      doc.setFillColor(255, 255, 255);
      doc.circle(15, midStartY + 4 + (idx * 6.5), 0.7, "F");
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5); // Slightly smaller font to fit 4 stories perfectly on 1 page
      doc.setTextColor(255, 255, 255);
      doc.text(doc.splitTextToSize(story, 81), 18, midStartY + 6 + (idx * 6.5)); // 1 line spacing with idx * 6.5
    });

    // Right Box: Promise to parents (Solid Emerald Green, White Text) - height matched to 30mm
    doc.setFillColor(5, 150, 105); // Emerald 600
    doc.roundedRect(107, midStartY, 91, 30, 2, 2, "F");

    const promiseList = [
      "Guaranteed 1:8 Student-Teacher ratios locally in Wakad (1:4 Micro-batches for international online sessions).",
      "Direct synchronization with board curriculum so visual abacus results show up on school grade report cards."
    ];

    promiseList.forEach((promise, idx) => {
      doc.setFillColor(255, 255, 255);
      doc.circle(110, midStartY + 5 + (idx * 13.5), 0.9, "F");
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(255, 255, 255);
      doc.text(doc.splitTextToSize(promise, 81), 113, midStartY + 7.5 + (idx * 13.5));
    });

    // 7. CALL TO ACTION BOX (Footer CTA - Solid Navy Block)
    const ctaY = 264;
    doc.setFillColor(26, 46, 53);
    doc.roundedRect(12, ctaY, 186, 27, 2, 2, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text("CLAIM A FREE 1-ON-1 MATH SPEED & FOCUS DIAGNOSTICS ASSESSMENT", 18, ctaY + 5);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(210, 210, 210);
    doc.text("- Check calculation speeds, logic accuracy checks, and visual attention indices.", 18, ctaY + 10);
    doc.text("Physical Hub: Adv. Balaji Sagar Bungalow, Opposite Creative Cameo, Wakad, Pune, MH, India.", 18, ctaY + 14.5);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(242, 100, 25);
    doc.text("WhatsApp/Call: +91 90219 24968  |  Email: nehaatharv@gmail.com", 18, ctaY + 21.5);

    // Microfooter
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Arnav Abacus Academy | 1-Page Summary Brochure (Ages 4-14)", 12, 294);

    doc.save("arnav_abacus_academy_brochure.pdf");

  } catch (err) {
    console.error("Brochure compilation failed", err);
  }
};
