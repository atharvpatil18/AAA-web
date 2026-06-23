/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { trackLeadFormSubmission } from "../lib/analytics";
import { Sparkles, Gift, Send, Landmark, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { jsPDF } from "jspdf";

interface LeadFormProps {
  sourceCampaign?: string;
  defaultProgram?: string;
}

export default function LeadForm({ sourceCampaign, defaultProgram = "Abacus" }: LeadFormProps) {
  const { language, t } = useLanguage();
  const [salutation, setSalutation] = useState("Mr.");
  const [parentName, setParentName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [childAge, setChildAge] = useState("7-9");
  const [program, setProgram] = useState(defaultProgram);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectSuccess, setRedirectSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  // International Demo Customizations
  const [countryCode, setCountryCode] = useState("+91");
  const [classMode, setClassMode] = useState("offline"); // Default to Offline Wakad Pune Center
  const [timeZone, setTimeZone] = useState("Asia/Kolkata");
  const [schoolCurriculum, setSchoolCurriculum] = useState("CBSE/ICSE");

  useEffect(() => {
    if (defaultProgram) {
      setProgram(defaultProgram);
    }
  }, [defaultProgram]);

  useEffect(() => {
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTz) {
        setTimeZone(userTz);
        if (userTz !== "Asia/Kolkata") {
          // Keep demo mode offline by default as requested.
          if (userTz.startsWith("America")) {
            setCountryCode("+1");
          } else if (userTz.startsWith("Europe/London") || userTz.startsWith("Europe")) {
            setCountryCode("+44");
          } else if (userTz.startsWith("Asia/Dubai") || userTz.startsWith("Asia/Riyadh") || userTz.startsWith("Asia/Muscat") || userTz.startsWith("Asia/Qatar") || userTz.startsWith("Asia/Kuwait")) {
            setCountryCode("+971");
          } else if (userTz.startsWith("Australia")) {
            setCountryCode("+61");
          } else if (userTz.startsWith("Asia/Singapore")) {
            setCountryCode("+65");
          }
        }
      }
    } catch (e) {
      console.warn("Timezone detection failed", e);
    }
  }, []);

  const generatePDFWorksheet = async () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

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

      // Page 1 Styles & Design
      doc.setFillColor(26, 46, 53);
      doc.rect(0, 0, 210, 8, "F");
      doc.setFillColor(242, 100, 25);
      doc.rect(0, 8, 210, 2, "F");

      if (logoBase64) {
        doc.addImage(logoBase64, "JPEG", 15, 15, 20, 20);
      }

      doc.setTextColor(26, 46, 53);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(22);
      doc.text("ARNAV ABACUS ACADEMY", 40, 24);
      doc.setFontSize(10);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(120, 120, 120);
      doc.text("National & International Abacus & Vedic Math Excellence", 40, 29);

      // Header Accent Badge
      doc.setFillColor(242, 100, 25);
      doc.roundedRect(145, 16, 50, 7, 1.5, 1.5, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.text("DIAGNOSTIC WORKBOOK", 170, 20.8, { align: "center" });

      doc.setDrawColor(242, 100, 25);
      doc.setLineWidth(0.8);
      doc.line(15, 38, 195, 38);

      doc.setTextColor(26, 46, 53);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(14);
      doc.text("A Welcome Message from Our Founder", 15, 46);

      if (photoBase64) {
        // Aesthetic Offset Shadow for Photo
        doc.setFillColor(242, 100, 25);
        doc.rect(17, 54, 40, 48, "F");
        doc.addImage(photoBase64, "JPEG", 15, 52, 40, 48);
        doc.setDrawColor(26, 46, 53);
        doc.setLineWidth(0.5);
        doc.rect(15, 52, 40, 48);
      }

      const cardX = photoBase64 ? 60 : 15;
      const cardWidth = photoBase64 ? 135 : 180;

      // Welcome Card Box with Left Color Border
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(cardX, 52, cardWidth, 52, 2, 2, "F");
      doc.setFillColor(242, 100, 25);
      doc.rect(cardX, 52, 1.5, 52, "F");

      const welcomeLetter = `Dear Parent,

Thank you for choosing Arnav Abacus Academy! We are honored to accompany your child on their mathematical journey.

Our core philosophy extends past mere rote calculations. We focus on building spatial visualization skills, visual agility, focus, and a foundational love for numbers.

This diagnostic sheet is designed to evaluate your child's visual counting confidence and logical agility. We look forward to analyzing their scores and helping them grow.

Warm regards,

Neha Patil
Founder & Director, Arnav Abacus Academy
(IIVA Certified Mentor) `;

      doc.setTextColor(60, 66, 78);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.2);
      const splitWelcome = doc.splitTextToSize(welcomeLetter, cardWidth - 8);
      doc.text(splitWelcome, cardX + 5, 56.5);

      doc.setDrawColor(230, 235, 240);
      doc.setLineWidth(0.3);
      doc.line(15, 112, 195, 112);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(26, 46, 53);
      doc.text("About the Founder & Director", 15, 120);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(70, 75, 85);
      const bioText = `Neha Patil is a highly certified IIVA (Indian Institute of Vedic Maths & Abacus) Master Trainer and Child Psychology specialist. With over 3+ years of direct mentoring excellence, she has coached more than 200+ local students in Wakad, Pune, India, and 10+ international students from the US, UK, and Gulf countries.

Arnav Abacus Academy operates in alignment with the National Education Policy (NEP) 2020 and is an active Skill India partner, prioritizing 1:8 maximum student-teacher ratios for dedicated personal growth.`;

      const splitBio = doc.splitTextToSize(bioText, 180);
      doc.text(splitBio, 15, 126);

      // Core Pillars Section
      doc.setFillColor(240, 246, 248);
      doc.roundedRect(15, 168, 180, 42, 2, 2, "F");
      doc.setDrawColor(26, 46, 53);
      doc.setLineWidth(0.4);
      doc.roundedRect(15, 168, 180, 42, 2, 2);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(26, 46, 53);
      doc.text("Our Core Pillars of Educational Excellence:", 22, 175);

      // Bullet 1
      doc.setFillColor(242, 100, 25);
      doc.rect(22, 181, 2, 2, "F");
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(26, 46, 53);
      doc.text("Personalized Growth:", 27, 183);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text("Guaranteed 1:8 batch ratio for dedicated teacher attention.", 64, 183);

      // Bullet 2
      doc.setFillColor(242, 100, 25);
      doc.rect(22, 189, 2, 2, "F");
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(26, 46, 53);
      doc.text("Global Curriculums:", 27, 191);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text("Complete board synergy with CBSE, ICSE, IB, IGCSE & US Common Core.", 64, 191);

      // Bullet 3
      doc.setFillColor(242, 100, 25);
      doc.rect(22, 197, 2, 2, "F");
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(26, 46, 53);
      doc.text("Cognitive Agility:", 27, 199);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text("Photographic memory development via tactile Soroban Abacus methods.", 64, 199);

      // Bottom Compliance Banner
      doc.setFillColor(26, 46, 53);
      doc.roundedRect(15, 218, 180, 15, 1, 1, "F");
      doc.setFillColor(242, 100, 25);
      doc.rect(15, 233, 180, 1.5, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.text("AUTHORIZED SKILL INDIA PARTNER • NEP 2020 COMPLIANT CURRICULUM", 105, 227.5, { align: "center" });

      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Page 1 of 2 • Arnav Abacus Academy", 15, 285);
      doc.text("Contact: +91 90219 24968", 165, 285);

      // Page 2
      doc.addPage();
      doc.setFillColor(26, 46, 53);
      doc.rect(0, 0, 210, 8, "F");
      doc.setFillColor(242, 100, 25);
      doc.rect(0, 8, 210, 2, "F");

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(15);
      doc.setTextColor(26, 46, 53);
      doc.text("MATH DIAGNOSTIC WORKSHEET (AGES 4-14)", 15, 20);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(100, 100, 100);
      doc.text("Please have your child solve these problems mentally. Record the time taken and errors.", 15, 25);

      doc.setFillColor(240, 244, 248);
      doc.rect(15, 30, 180, 7, "F");
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(26, 46, 53);
      doc.text("SECTION 1: ABACUS VISUALIZATION (AGES 4-8)", 18, 35);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(55, 55, 55);
      const qAbacus = [
        "1)  2  +  2  -  1  =  [   ]",
        "2)  5  +  3  -  2  =  [   ]",
        "3)  10  +  5  -  5  =  [   ]",
        "4)  22  +  11  -  3  =  [   ]",
        "5)  50  +  20  -  10  =  [   ]"
      ];
      let currentY = 44;
      qAbacus.forEach((q) => {
        doc.text(q, 25, currentY);
        currentY += 8;
      });

      doc.setFillColor(240, 244, 248);
      doc.rect(15, 90, 180, 7, "F");
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(26, 46, 53);
      doc.text("SECTION 2: SPEED MATH & SUTRAS (AGES 9-14)", 18, 95);

      doc.setFont("Helvetica", "normal");
      const qSpeed = [
        "1)  Square of 98  =  [   ]  (Hint: Use Deviation from Base 100!)",
        "2)  Square of 45  =  [   ]  (Hint: Use ending in 5 formula: 4 * (4+1) | 25!)",
        "3)  123 x 5  =  [   ]",
        "4)  99 x 9  =  [   ]",
        "5)  300 - 145  =  [   ]"
      ];
      currentY = 104;
      qSpeed.forEach((q) => {
        doc.text(q, 25, currentY);
        currentY += 8;
      });

      doc.setFillColor(255, 248, 240);
      doc.rect(15, 150, 180, 35, "F");
      doc.setDrawColor(242, 100, 25);
      doc.rect(15, 150, 180, 35);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(242, 100, 25);
      doc.text("PARENT'S DIAGNOSTIC REPORT CARD LOG:", 20, 157);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(50, 50, 50);
      doc.text("Total Time Taken: ____________ seconds", 25, 166);
      doc.text("Silly Mistakes Count: ____________", 25, 172);
      doc.text("Focus & Attention Scale (1 - 10): ____________ / 10", 25, 178);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(26, 46, 53);
      doc.text("Ready for a Professional Cognitive Assessment?", 15, 205);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(80, 80, 80);
      const bookingNotice = `Bring this sheet with you to your booked demo session (either online via video share or at our physical center in Wakad, Pune). Neha Patil will review your child's accuracy and visualization speeds to suggest custom learning tracks.`;
      const splitNotice = doc.splitTextToSize(bookingNotice, 180);
      doc.text(splitNotice, 15, 211);

      doc.setFillColor(245, 247, 248);
      doc.rect(15, 230, 180, 25, "F");
      doc.setDrawColor(220, 220, 220);
      doc.rect(15, 230, 180, 25);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(26, 46, 53);
      doc.text("Arnav Abacus Academy", 20, 236);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 100, 100);
      doc.text("Address: Flat No. 3, Adv. Balaji Sagar Bungalow, Opposite Creative Cameo, Wakad, Pune, India", 20, 242);
      doc.text("Contact Phone / WhatsApp: +91 90219 24968", 20, 248);

      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Page 2 of 2 • Arnav Abacus Academy", 15, 285);
      doc.text("Contact: +91 90219 24968", 165, 285);

      doc.save("arnav_abacus_diagnostic_worksheet.pdf");
    } catch (err) {
      console.error("PDF generation error", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!parentName.trim()) {
      setValidationError(t("formNameError"));
      return;
    }
    if (!studentName.trim()) {
      setValidationError(language === "hi" ? "कृपया छात्र का नाम दर्ज करें।" : language === "mr" ? "कृपया विद्यार्थ्याचे नाव टाईप करा." : "Please enter student's name.");
      return;
    }

    setIsSubmitting(true);
    
    // Log conversion event
    trackLeadFormSubmission(parentName, childAge, program);

    // Form custom WhatsApp message template
    let textMessage = `Hello, I'm interested in a Demo Class at Arnav Abacus Academy!
Parent Name: ${salutation} ${parentName}
Student Name: ${studentName}
Child's Age: ${childAge}
Program: ${program}
Country Code: ${countryCode}
Mode: ${classMode === "online" ? "Online Video Class (Zoom/Meet)" : "Offline (Wakad Pune Center)"}
Time Zone: ${classMode === "online" ? timeZone : "Asia/Kolkata (IST)"}
Curriculum: ${schoolCurriculum}${sourceCampaign ? `\nCampaign: ${sourceCampaign}` : ""}`;

    if (language === "hi") {
      textMessage = `नमस्ते, मैं अर्णव एबाकस एकेडमी में फ्री डेमो क्लास के लिए उत्सुक हूँ!
अभिभावक का नाम: ${salutation} ${parentName}
छात्र का नाम: ${studentName}
बच्चे की उम्र: ${childAge}
कोर्स विषय: ${program}
कंट्री कोड: ${countryCode}
क्लास का प्रकार: ${classMode === "online" ? "ऑनलाइन वीडियो क्लास (Zoom/Meet)" : "ऑफलाइन (वाकड पुणे सेंटर)"}
टाइम ज़ोन: ${classMode === "online" ? timeZone : "Asia/Kolkata (IST)"}
स्कूल बोर्ड: ${schoolCurriculum}${sourceCampaign ? `\nCampaign: ${sourceCampaign}` : ""}`;
    } else if (language === "mr") {
      textMessage = `नमस्कार, मी अर्णव ॲबॅकस अकॅडमीमध्ये मोफत डेमो क्लाससाठी चौकशी करू इच्छितो!
पालकांचे नाव: ${salutation} ${parentName}
विद्यार्थ्याचे नाव: ${studentName}
मुलाचे वय: ${childAge}
कोर्स प्रकार: ${program}
कंट्री कोड: ${countryCode}
डेमोचा प्रकार: ${classMode === "online" ? "ऑनलाइन व्हिडिओ क्लास (Zoom/Meet)" : "ऑफलाइन (वाकड पुणे सेंटर)"}
टाइम झोन: ${classMode === "online" ? timeZone : "Asia/Kolkata (IST)"}
अभ्यासक्रम: ${schoolCurriculum}${sourceCampaign ? `\nCampaign: ${sourceCampaign}` : ""}`;
    }

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/919021924968?text=${encodedText}`;

    // Simulate smooth redirection
    setTimeout(() => {
      setRedirectSuccess(true);
      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 1500);
    }, 1000);
  };

  if (redirectSuccess) {
    return (
      <div 
        id="lead-form-success" 
        className="bg-white/85 backdrop-blur-md border border-emerald-100 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center justify-center min-h-[400px] animate-fade-in"
      >
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-100 text-emerald-500 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="font-display font-bold text-2xl text-emerald-950 mb-2">
          {t("formSuccessTitle").replace("{name}", parentName)}
        </h3>
        <p 
          className="text-emerald-808/90 max-w-sm leading-relaxed mb-6 text-xs md:text-sm font-medium"
          dangerouslySetInnerHTML={{ __html: t("formSuccessDesc") }}
        />
        <div className="flex items-center gap-3 bg-emerald-50 text-emerald-800 px-5 py-3 rounded-full text-sm font-medium border border-emerald-100">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          {t("formRedirecting")}
        </div>
        <p className="text-xs text-gray-405 mt-6 font-semibold">
          {language === "hi" ? "रीडायरेक्ट नहीं हुआ?" : language === "mr" ? "दुसरीकडे पाठवले नाही का?" : "Didn't redirect?"}{" "}
          <a href={`https://wa.me/919021924968`} className="text-emerald-600 underline font-medium hover:text-emerald-700">
            {language === "hi" ? "मैन्युअल बुकिंग के लिए यहाँ क्लिक करें" : language === "mr" ? "मॅन्युअली बुक करण्यासाठी येथे क्लिक करा" : "Click here to continue manual booking"}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div 
      id="lead-form-container" 
      className="bg-white rounded-[40px] border-4 border-vibrant-dark p-6 md:p-10 shadow-[6px_6px_0_0_#1A2E35] md:shadow-[12px_12px_0_0_#1A2E35] relative overflow-hidden"
    >
      {/* Free 2 Sessions sticker rotated element */}
      <div className="absolute -top-5 -right-5 bg-vibrant-gold p-4 rounded-2xl rotate-12 border-2 border-vibrant-dark shadow-md text-vibrant-dark text-center leading-none z-20 max-w-[120px]">
        <p className="font-black text-xs leading-none">{language === "hi" ? "फ्री ट्रायल" : language === "mr" ? "मोफत ट्रायल" : "FREE TRIAL"}</p>
        <p className="text-[8px] font-black tracking-wide uppercase mt-1">{language === "hi" ? "2 मेंटल मैथ सेशन्स" : language === "mr" ? "२ मेंटल मॅथ सेशन्स" : "2 Mental Math Sessions"}</p>
      </div>

      <div className="relative z-10 space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#FFF0E0] border border-[#FFD8B1] px-4 py-1.5 rounded-full text-xs font-bold text-vibrant-orange uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> {t("bookFreeDemo")}
        </div>

        <h3 className="font-display font-black text-2xl lg:text-3xl text-vibrant-dark leading-tight">
          {t("formClaimSlot")}
        </h3>
        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
          {t("formEvaluationDesc")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {validationError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-medium border border-red-100">
              {validationError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-[10px] font-bold text-vibrant-dark uppercase mb-1 ml-1.5 tracking-wider">
                {t("formSalutation")}
              </label>
              <select
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-vibrant-orange focus:bg-white outline-none text-sm text-gray-800 transition cursor-pointer shadow-sm"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[10px] font-bold text-vibrant-dark uppercase mb-1 ml-1.5 tracking-wider">
                {t("formParentName")}
              </label>
              <input
                type="text"
                required
                placeholder={t("formNamePlaceholder")}
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-vibrant-orange focus:bg-white outline-none text-sm text-gray-800 placeholder-gray-400 transition shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-vibrant-dark uppercase mb-1 ml-1.5 tracking-wider">
              {t("formStudentName")}
            </label>
            <input
              type="text"
              required
              placeholder={language === "hi" ? "जैसे: आयुष शर्मा" : language === "mr" ? "उदा. आयुष शर्मा" : "e.g. Ayush Sharma"}
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-vibrant-orange focus:bg-white outline-none text-sm text-gray-800 placeholder-gray-400 transition shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-vibrant-dark uppercase mb-1 ml-1.5 tracking-wider">
                {t("formAgeBracket")}
              </label>
              <select
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-vibrant-orange focus:bg-white outline-none text-sm text-gray-800 transition cursor-pointer shadow-sm"
              >
                <option value="4-6">{language === "hi" ? "4 - 6 वर्ष" : language === "mr" ? "४ - ६ वर्षे" : "4 - 6 Years"}</option>
                <option value="7-9">{language === "hi" ? "7 - 9 वर्ष" : language === "mr" ? "७ - ९ वर्षे" : "7 - 9 Years"}</option>
                <option value="10-12">{language === "hi" ? "10+ वर्ष" : language === "mr" ? "१०+ वर्षे" : "10+ Years"}</option>
                <option value="13+">{language === "hi" ? "13+ वर्ष" : language === "mr" ? "१३+ वर्षे" : "13+ Years"}</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-vibrant-dark uppercase mb-1 ml-1.5 tracking-wider">
                {t("formProgramTopic")}
              </label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-vibrant-orange focus:bg-white outline-none text-sm text-gray-800 transition cursor-pointer shadow-sm"
              >
                <option value="Abacus Math">{language === "hi" ? "एबाकस गणित" : language === "mr" ? "ॲबॅकस गणित" : "Abacus Math"}</option>
                <option value="Vedic Math">{language === "hi" ? "वैदिक गणित" : language === "mr" ? "वैदिक गणित" : "Vedic Math"}</option>
                <option value="School Math">{language === "hi" ? "स्कूल गणित" : language === "mr" ? "शालेय गणित" : "School Math"}</option>
                <option value="IPM Math">{language === "hi" ? "आईपीएम गणित" : language === "mr" ? "आयपीएम गणित" : "IPM Math"}</option>
                <option value="Olympiad Math">{language === "hi" ? "ओलंपियाड गणित" : language === "mr" ? "ऑलिम्पियाड गणित" : "Olympiad Math"}</option>
                <option value="Scholarship Math">{language === "hi" ? "स्कॉलरशिप गणित" : language === "mr" ? "स्कॉलरशिप गणित" : "Scholarship Math"}</option>
                <option value="Competitive Math">{language === "hi" ? "प्रतियोगी गणित" : language === "mr" ? "स्पर्धात्मक गणित" : "Competitive Math"}</option>
                <option value="Mental Math">{language === "hi" ? "मेंटल मैथ" : language === "mr" ? "मेंटल मॅथ" : "Mental Math"}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-vibrant-dark uppercase mb-1 ml-1.5 tracking-wider">
                {t("formClassMode")}
              </label>
              <select
                value={classMode}
                onChange={(e) => setClassMode(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-vibrant-orange focus:bg-white outline-none text-sm text-gray-800 transition cursor-pointer shadow-sm"
              >
                <option value="offline">{t("formOffline")}</option>
                <option value="online">{t("formOnline")}</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-vibrant-dark uppercase mb-1 ml-1.5 tracking-wider">
                {t("formCurriculum")}
              </label>
              <select
                value={schoolCurriculum}
                onChange={(e) => setSchoolCurriculum(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-vibrant-orange focus:bg-white outline-none text-sm text-gray-800 transition cursor-pointer shadow-sm"
              >
                <option value="CBSE/ICSE">CBSE / ICSE</option>
                <option value="State Board">State Board</option>
                <option value="IB">IB (International Baccalaureate)</option>
                <option value="IGCSE">Cambridge IGCSE</option>
                <option value="US Common Core">US Common Core</option>
                <option value="Other">Other / International</option>
              </select>
            </div>
          </div>

          {classMode === "online" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
              <div>
                <label className="block text-[10px] font-bold text-vibrant-dark uppercase mb-1 ml-1.5 tracking-wider">
                  {t("formCountryCode")}
                </label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-vibrant-orange focus:bg-white outline-none text-sm text-gray-800 transition cursor-pointer shadow-sm"
                >
                  <option value="+91">🇮🇳 India (+91)</option>
                  <option value="+1">🇺🇸/🇨🇦 US/Canada (+1)</option>
                  <option value="+44">🇬🇧 United Kingdom (+44)</option>
                  <option value="+971">🇦🇪 UAE / Middle East (+971)</option>
                  <option value="+65">🇸🇬 Singapore (+65)</option>
                  <option value="+61">🇦🇺 Australia (+61)</option>
                  <option value="+966">🇸🇦 Saudi Arabia (+966)</option>
                  <option value="+968">🇴🇲 Oman (+968)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-vibrant-dark uppercase mb-1 ml-1.5 tracking-wider">
                  {t("formTimeZone")}
                </label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-vibrant-orange focus:bg-white outline-none text-[11px] text-gray-800 transition cursor-pointer shadow-sm"
                >
                  <option value="Asia/Kolkata">🇮🇳 India (IST - UTC+5:30)</option>
                  <option value="America/New_York">🇺🇸 US Eastern (EST/EDT)</option>
                  <option value="America/Chicago">🇺🇸 US Central (CST/CDT)</option>
                  <option value="America/Denver">🇺🇸 US Mountain (MST/MDT)</option>
                  <option value="America/Los_Angeles">🇺🇸 US Pacific (PST/PDT)</option>
                  <option value="Europe/London">🇬🇧 London (GMT/BST)</option>
                  <option value="Asia/Dubai">🇦🇪 Gulf Standard (GST - UTC+4)</option>
                  <option value="Asia/Singapore">🇸🇬 Singapore (SGT - UTC+8)</option>
                  <option value="Australia/Sydney">🇦🇺 Australia Eastern (AEST)</option>
                  <option value={timeZone}>{timeZone} (Detected)</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-vibrant-orange text-white py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_0_#B33A00] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-80"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>{t("formSecuringSlot")}</span>
              </>
            ) : (
              <>
                <span>{t("formBookWhatsapp")}</span>
                <Send className="w-4 h-4 text-orange-100" />
              </>
            )}
          </button>

          {/* Diagnostic Worksheet Download Button */}
          <button
            type="button"
            onClick={generatePDFWorksheet}
            className="w-full bg-white hover:bg-slate-50 text-vibrant-dark border-2 border-vibrant-dark py-3.5 rounded-2xl font-black text-sm shadow-[0_4px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 mt-3 cursor-pointer"
          >
            <Gift className="w-4 h-4 text-vibrant-teal" />
            <span>{language === "hi" ? "फ्री गणितीय वर्कशीट डाउनलोड करें" : language === "mr" ? "मोफत गणितीय वर्कशीट डाउनलोड करा" : "Download Free Diagnostic Worksheet"}</span>
          </button>
        </form>

        <p className="text-center text-[10px] font-bold uppercase text-gray-400 mt-4 flex items-center justify-center gap-1.5">
          <Landmark className="w-3.5 h-3.5 shrink-0 text-gray-300" /> {language === "hi" ? "स्किल इंडिया अधिकृत केंद्र, क्रिएटिव कैमियो के सामने, पार्क स्ट्रीट से पहले, वाकड, पुणे, भारत" : language === "mr" ? "स्किल इंडिया अधिकृत केंद्र, क्रिएटिव्ह कॅमिओच्या समोर, पार्क स्ट्रीटजवळ, वाकड, पुणे, भारत" : "Skill India Authorised Center Opposite Creative Cameo, before Park Street, Wakad, Pune, India"}
        </p>
      </div>
    </div>
  );
}
