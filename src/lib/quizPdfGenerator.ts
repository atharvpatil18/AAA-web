/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from "jspdf";
import { getCustomizedSet } from "../data/practiceData";

export const generateQuizWorksheetPDF = async (
  studentName: string = "Guest Student",
  selectedSetId: string = "abacus-sr1-single-direct-5-6row",
  selectedTopicTitle: string = "ADD & SUB SINGLE DIGIT DIRECT (4-5-6 ROWS)",
  qCount: number = 20
) => {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const seed = `pdf_worksheets_${Date.now()}`;
    const questionSet = getCustomizedSet(selectedSetId, "exam", qCount, seed);
    const questions = questionSet.questions || [];

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
      logoBase64 = await getBase64FromUrl("/logo.png", true);
    } catch (e) {
      console.warn("Logo load error", e);
    }
    try {
      photoBase64 = await getBase64FromUrl("/teacher-profile.jpg", true);
    } catch (e) {
      console.warn("Photo load error", e);
    }

    // =========================================================================
    // WORKSHEET PAGES (25 Questions Per Page max for zero overlap & crisp legibility)
    // =========================================================================

    const itemsPerPage = 25; // 5 cols x 5 rows per page
    const colsPerPage = 5;
    const itemsPerCol = 5;
    const totalSheetPages = Math.ceil(questions.length / itemsPerPage);

    const renderWorksheetHeader = (sheetPageNum: number) => {
      // Top Header Bar
      doc.setFillColor(26, 46, 53); // Deep Navy
      doc.rect(0, 0, 210, 26, "F");

      if (logoBase64) {
        doc.addImage(logoBase64, "PNG", 10, 4, 18, 18);
      }

      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(15);
      doc.text("ARNAV ABACUS ACADEMY", 32, 11.5);

      doc.setFontSize(8);
      doc.setTextColor(242, 100, 25); // Vibrant Orange accent
      doc.text("SPEED MATH DRILL WORKSHEET | WAKAD, PUNE", 32, 16.5);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(210, 215, 220);
      doc.text(`nehaatharv@gmail.com | WhatsApp: +91 90219 24968 | Sheet Page ${sheetPageNum} of ${totalSheetPages}`, 32, 21.5);

      // Personalized Greeting & Student Metadata Card
      const infoY = 28;
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.4);
      doc.roundedRect(10, infoY, 190, 22, 2, 2, "FD");

      // Personalized Greeting Banner inside card
      doc.setFillColor(243, 244, 246);
      doc.rect(10, infoY, 190, 6, "F");
      doc.setTextColor(124, 58, 237); // Purple accent
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text(`Welcome & Good Luck, ${studentName || "Guest Student"}!`, 13, infoY + 4.2);

      doc.setTextColor(15, 23, 42);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.text(`Candidate Name: ${studentName || "Guest Student"}`, 13, infoY + 11.5);
      doc.text(`Date: ${new Date().toLocaleDateString("en-IN")}`, 115, infoY + 11.5);

      doc.setFont("Helvetica", "normal");
      doc.text(`Topic: ${selectedTopicTitle}`, 13, infoY + 16.5);
      doc.text(`Questions: ${qCount} Qs`, 115, infoY + 16.5);
      doc.text(`Target Time: ${qCount <= 20 ? "5 Mins" : qCount <= 50 ? "10 Mins" : "20 Mins"}`, 155, infoY + 16.5);

      doc.setFont("Helvetica", "bold");
      doc.setTextColor(234, 88, 12);
      doc.text("Score: ______ / " + qCount, 13, infoY + 20.8);
      doc.setTextColor(13, 148, 136);
      doc.text("Time Taken: ______ Mins", 115, infoY + 20.8);
      doc.setTextColor(71, 85, 105);
      doc.text("Evaluated By: ____________", 155, infoY + 20.8);
    };

    const drawFooter = () => {
      doc.setFillColor(26, 46, 53);
      doc.rect(0, 287, 210, 10, "F");
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text("Arnav Abacus Academy - Wakad, Pune, India | Physical & International Online Batches | WhatsApp: +91 90219 24968", 10, 293.5);
    };

    // Render Question Cards Grid
    const startX = 10;
    const startY = 53;
    const colGap = 3;
    const rowGap = 3;
    const colWidth = (190 - (colsPerPage - 1) * colGap) / colsPerPage; // 35.6mm
    const cellHeight = 43; // 43mm height per question box for zero overlap & perfect spacing!

    let currentSheetPage = 1;
    renderWorksheetHeader(currentSheetPage);

    for (let i = 0; i < questions.length; i++) {
      if (i > 0 && i % itemsPerPage === 0) {
        drawFooter();
        doc.addPage();
        currentSheetPage++;
        renderWorksheetHeader(currentSheetPage);
      }

      const indexInPage = i % itemsPerPage;
      const col = indexInPage % colsPerPage;
      const row = Math.floor(indexInPage / colsPerPage);

      const x = startX + col * (colWidth + colGap);
      const y = startY + row * (cellHeight + rowGap);

      const q = questions[i];

      // Question Outer Box Card
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.35);
      doc.roundedRect(x, y, colWidth, cellHeight, 1.5, 1.5, "FD");

      // Q Number Badge Header Bar
      doc.setFillColor(241, 245, 249);
      doc.rect(x, y, colWidth, 5, "F");
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`Q${i + 1}`, x + 2, y + 3.8);

      // Numbers stack (Center/Right aligned, crisp font)
      doc.setFont("Courier", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);

      let numY = y + 8.5;
      const lineStep = 3.6;

      if (q.numbers && q.numbers.length > 0) {
        q.numbers.forEach((n) => {
          const numStr = n >= 0 ? ` ${n}` : `${n}`;
          doc.text(numStr, x + colWidth - 3, numY, { align: "right" });
          numY += lineStep;
        });
      }

      // Horizontal Sum Line
      doc.setDrawColor(71, 85, 105);
      doc.setLineWidth(0.4);
      doc.line(x + 3, numY - 0.5, x + colWidth - 3, numY - 0.5);

      // Answer Box (For Student Handwritten Answer)
      const ansY = y + cellHeight - 11;
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(30, 41, 59);
      doc.text("Ans:", x + 2, ansY + 3.5);

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(148, 163, 184);
      doc.setLineWidth(0.3);
      doc.roundedRect(x + 8.5, ansY, colWidth - 11, 4.8, 1, 1, "FD");

      // Evaluation Box (For Correct or Wrong Check mark)
      const evalY = y + cellHeight - 5;
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text("Eval:", x + 2, evalY + 3);

      doc.setDrawColor(203, 213, 225);
      doc.rect(x + 8.5, evalY, 4, 3.8, "D"); // Checkbox square for teacher score

      // Vector Green Checkmark
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.45);
      doc.line(x + 14, evalY + 2.2, x + 15.2, evalY + 3.4);
      doc.line(x + 15.2, evalY + 3.4, x + 17, evalY + 1.2);

      // Vector Red Crossmark
      doc.setDrawColor(239, 68, 68);
      doc.setLineWidth(0.45);
      doc.line(x + 19, evalY + 1.2, x + 21.2, evalY + 3.4);
      doc.line(x + 19, evalY + 3.4, x + 21.2, evalY + 1.2);
    }

    drawFooter();

    // =========================================================================
    // ATTACHED 1-PAGE ACADEMY BROCHURE AT THE END
    // =========================================================================

    doc.addPage();

    // Brochure Background
    doc.setFillColor(250, 248, 245);
    doc.rect(0, 0, 210, 297, "F");

    const drawBrochureSeparator = (y: number) => {
      doc.setDrawColor(240, 236, 230);
      doc.setLineWidth(0.3);
      doc.line(10, y, 200, y);
    };

    // 1. BRAND HEADER BLOCK
    doc.setFillColor(26, 46, 53);
    doc.rect(0, 0, 210, 31, "F");

    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", 12, 7.5, 16, 16);
    }
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.text("ARNAV ABACUS ACADEMY", 32, 14.5);

    doc.setFontSize(8.5);
    doc.setTextColor(242, 100, 25);
    doc.text("NEP 2020 COGNITIVE SKILLS | IIVA CERTIFIED TRAINING CENTER", 32, 19.5);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(210, 215, 220);
    doc.text("Wakad, Pune (Physical Hub) | International Online Micro-batches (US, UK, Gulf)", 32, 24.5);

    // 2. HOOK & FOUNDER BLOCKS
    const hookY = 35;
    doc.setFillColor(124, 58, 237);
    doc.roundedRect(12, hookY, 112, 28, 2, 2, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.text("UNLOCK YOUR CHILD'S MATH SUPERPOWERS!", 15, hookY + 4.5);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8.5);
    const hookText = "Traditional math workbook drills induce fear and stress. We replace boring routines with visual abacus beads and ancient Vedic shortcuts, triggering 10X cognitive growth.";
    doc.text(doc.splitTextToSize(hookText, 106), 15, hookY + 9);

    doc.setFont("Helvetica", "oblique");
    doc.setFontSize(8);
    const welcomeMsg = '"At AAA, we do not just teach calculations. We inspire deep spatial concentration and visual mastery of numbers to build lifelong academic confidence."';
    doc.text(doc.splitTextToSize(welcomeMsg, 106), 15, hookY + 21.5);

    // Founder Info Badge
    doc.setFillColor(217, 119, 6);
    doc.roundedRect(130, hookY, 68, 28, 2, 2, "F");

    if (photoBase64) {
      doc.addImage(photoBase64, "PNG", 132.5, hookY + 6.5, 15, 15);
    }
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("Neha Patil", 151, hookY + 9.5);
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7.2);
    doc.setTextColor(240, 240, 240);
    doc.text("Founder & Master Trainer\nIIVA Certified International\nAbacus & Vedic Math\n(200+ Students Mentored)", 151, hookY + 14);

    drawBrochureSeparator(67);

    // 3. PROGRAMS GRID
    doc.setTextColor(26, 46, 53);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text("High-Impact Learning Streams (Ages 4-14)", 12, 72);

    const bColWidth = 59;
    const bColGap = 6;
    const bStartX = 12;
    const bStartY = 76;

    const programs = [
      {
        title: "The Magic Bead Quest",
        tagline: "Abacus Math (Ages 4-14)",
        desc: "Transforms numbers into visual beads. Taps right-brain stimulation to multiply concentration, focus, and memory storage.",
        accent: [234, 88, 12],
        b1: "Photographic visual memory",
        b2: "Sensory hand-eye coordination",
        b3: "Laser-sharp school focus"
      },
      {
        title: "Speed-Math Sorcery",
        tagline: "Vedic Math (Ages 9-16)",
        desc: "16 speed principles that make calculations 10-15x faster. Skips manual worksheets and builds Olympiad & SAT confidence.",
        accent: [13, 148, 136],
        b1: "Rough workspace bypass",
        b2: "Elite competitive exam edge",
        b3: "Cross-checking calculation speeds"
      },
      {
        title: "The Olympiad Arena",
        tagline: "Academic Board Synergy",
        desc: "Direct board CBSE/ICSE class synergy. Sharpens logical concept checks to completely eradicate exam worksheet errors.",
        accent: [37, 99, 235],
        b1: "CBSE & ICSE sync boards",
        b2: "Prep mock worksheets",
        b3: "Analytical grade boosts"
      }
    ];

    programs.forEach((prog, idx) => {
      const x = bStartX + idx * (bColWidth + bColGap);
      doc.setFillColor(prog.accent[0], prog.accent[1], prog.accent[2]);
      doc.roundedRect(x, bStartY, bColWidth, 61, 2, 2, "F");

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(prog.title, x + 3.5, bStartY + 6.5);

      doc.setFontSize(8.5);
      doc.setTextColor(255, 220, 180);
      doc.text(prog.tagline, x + 3.5, bStartY + 11);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(245, 245, 245);
      doc.text(doc.splitTextToSize(prog.desc, bColWidth - 7), x + 3.5, bStartY + 15.5);

      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x + 2, bStartY + 35, bColWidth - 4, 24, 1.5, 1.5, "F");

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(prog.accent[0], prog.accent[1], prog.accent[2]);
      doc.text("Focus Outcomes:", x + 4, bStartY + 39.5);
      
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(70, 70, 70);
      doc.setFontSize(8);
      doc.text("- " + prog.b1, x + 4, bStartY + 44);
      doc.text("- " + prog.b2, x + 4, bStartY + 48);
      doc.text("- " + prog.b3, x + 4, bStartY + 52);
    });

    drawBrochureSeparator(141);

    // 4. WHY ARNAV ACADEMY
    doc.setTextColor(26, 46, 53);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Why Parents Choose Arnav Academy over Commercial Franchises", 12, 146);

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

      doc.setFillColor(0, 121, 107);
      doc.circle(68, y + 3.8, 0.9, "F");
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(0, 121, 107);
      doc.setFontSize(8.5);
      doc.text(row[1], 71, y + 5);

      doc.setFillColor(198, 40, 40);
      doc.rect(142, y + 2.9, 1.8, 1.8, "F");
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(198, 40, 40);
      doc.text(row[2], 145, y + 5);
    });

    drawBrochureSeparator(183);

    // 5. CALL TO ACTION & CONTACT
    const ctaY = 188;
    doc.setFillColor(26, 46, 53);
    doc.roundedRect(12, ctaY, 186, 32, 2, 2, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text("ENROLL YOUR CHILD AT ARNAV ABACUS ACADEMY", 18, ctaY + 6);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(210, 210, 210);
    doc.text("- Book a Free 1-on-1 Math Diagnostic Session to check calculation speed & focus.", 18, ctaY + 12);
    doc.text("Physical Center: Adv. Balaji Sagar Bungalow, Opp. Creative Cameo, Wakad, Pune, MH, India.", 18, ctaY + 17.5);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(242, 100, 25);
    doc.text("WhatsApp / Call: +91 90219 24968   |   Email: nehaatharv@gmail.com", 18, ctaY + 25.5);

    // Microfooter
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Arnav Abacus Academy - Speed Math Worksheet & Academy Brochure (Ages 4-14)", 12, 294);

    doc.save(`Arnav_Abacus_Worksheet_${qCount}Qs.pdf`);
    return true;
  } catch (err) {
    console.error("Quiz Worksheet PDF generation error", err);
    throw err;
  }
};
