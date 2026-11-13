/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const labVedicEn = {
  // Breadcrumbs
  labVedicBreadcrumbHome: "Home",
  labVedicBreadcrumbLabs: "Interactive Learning Labs",
  labVedicBreadcrumbSutras: "Vedic Maths Sutras",

  // Hero Section
  labVedicHeroBadge: "High-Speed Mental Calculation",
  labVedicHeroTitle: "Interactive Vedic Mathematics Sutra Lab",
  labVedicHeroSubtitle: "Test 3 authentic Vedic Sutras below. See how cross-multiplication vector paths and algebraic deficiency patterns turn multi-step column calculations into single-line mental answers.",

  // Benefits Section
  labVedicBenefitsBadge: "CBSE, ICSE & Olympiad Exam Benefits",
  labVedicBenefitsTitle: "How Vedic Mathematics Solves the \"Exam Time Pressure\" Problem",
  labVedicBenefitsDesc: "In Class 6 to 10 board curricula, students spend up to 70% of exam time on raw arithmetic computations. Vedic Mathematics provides lightning-fast verification shortcuts, eliminating careless arithmetic slips.",
  labVedicBenefit1Title: "Single-Line Vector Math",
  labVedicBenefit1Desc: "The Urdhva-Tiryagbhyam sutra bypasses multiple rows of partial products, writing the final product in one horizontal stroke directly.",
  labVedicBenefit2Title: "Instant Result Checking",
  labVedicBenefit2Desc: "Using digital root sutras (Beejank), students verify answers in under 3 seconds without having to recalculate lengthy long division or squaring.",
  labVedicBenefit3Title: "Algebraic Grounding",
  labVedicBenefit3Desc: "Unlike rote tricks, every Vedic shortcut has an elegant algebraic proof ((a-b)², (10x+5)²), deepening high school algebraic maturity.",

  // CTA Section
  labVedicCtaBadge: "Class 5 to 10 Advanced Batches",
  labVedicCtaTitle: "Book a Free 1-on-1 Assessment with Neha Patil",
  labVedicCtaDesc: "Discover your child's arithmetic calculation bottlenecks. Neha Patil designs an individualized speed-learning plan tailored to school boards and Olympiads.",
  labVedicCtaBookBtn: "Book Parent Counselling",
  labVedicCtaLevelsBtn: "Examine Course Levels",

  // Vedic Math Demo Component Strings
  vedicSelectNumberLabel: "Select Number:",
  vedicStep1DeficiencyTitle: "Step 1: Deficiency",
  vedicStep1DeficiencyDesc: "Find how much the number is below 100",
  vedicStep2LeftTitle: "Step 2: Left Half",
  vedicStep2LeftDesc: "Subtract deviation from the number",
  vedicStep3RightTitle: "Step 3: Right Half",
  vedicStep3RightDesc: "Square the deficiency (keep as 2 digits)",
  vedicCombinePartsTitle: "Combine Parts",
  vedicFinalAnswerLabel: "Final Answer",

  // Sutra 2: Urdhva Tiryagbhyam
  vedicCrossTitle: "Sutra: Urdhva Tiryagbhyam (Vertically and Crosswise)",
  vedicCrossSubtitle: "Multiply any 3-digit number by a 2-digit number (e.g. 123 × 45) step-by-step using cross-multiplication vector pathways!",
  vedicCrossStep1Vector: "↑ Units Only",
  vedicCrossStep2Vector: "↖ Cross Tens/Units ↗",
  vedicCrossStep3Vector: "↖ Cross Hundreds/Units & Tens ↗",
  vedicCrossStep4Vector: "↖ Cross Hundreds/Tens ↗",
  vedicCrossStep5Vector: "✅ Done!",
  vedicCrossStepOfTotal: "Step {current} of 5",
  vedicBtnPrev: "Prev",
  vedicBtnNext: "Next",

  // 3x2 Steps Details
  vedic3x2Step1Title: "Step 1: Multiply Units Vertically",
  vedic3x2Step1Explain: "Multiply the rightmost digits. Write down 5, carry forward 1.",
  vedic3x2Step1Result: "Ans: ...5 (Carry: 1)",

  vedic3x2Step2Title: "Step 2: Cross-Multiply Tens & Units",
  vedic3x2Step2Explain: "Cross-multiply tens and units, then add the previous carry (1) = 23. Write down 3, carry forward 2.",
  vedic3x2Step2Result: "Ans: ..35 (Carry: 2)",

  vedic3x2Step3Title: "Step 3: Cross-Multiply Hundreds & Units + Tens",
  vedic3x2Step3Explain: "Cross-multiply hundreds/units and tens/tens, then add previous carry (2) = 15. Write down 5, carry forward 1.",
  vedic3x2Step3Result: "Ans: .535 (Carry: 1)",

  vedic3x2Step4Title: "Step 4: Cross-Multiply Hundreds & Tens",
  vedic3x2Step4Explain: "Cross-multiply the leftmost digits, then add previous carry (1) = 5. Write down 5.",
  vedic3x2Step4Result: "Ans: 5535 (Carry: 0)",

  vedic3x2Step5Title: "Step 5: Perfect Final Answer!",
  vedic3x2Step5Explain: "All steps complete! Look at how fast you solved a 3-digit by 2-digit multiplication in a single horizontal line.",
  vedic3x2Step5Result: "Result: 5535 ✅",

  // Sutra 3: Ekadhikena Purvena
  vedicEkadhikenaTitle: "Sutra: Ekadhikena Purvena (Numbers ending in 5)",
  vedicEkadhikenaSubtitle: "Square any number ending in 5 (e.g. 35²) instantly in 3 simple steps!",
  vedicEkadhikenaStep1Title: "Step 1: First Digit",
  vedicEkadhikenaStep1Desc: "Take the digit before the ending 5",
  vedicEkadhikenaStep2Title: "Step 2: Left Half",
  vedicEkadhikenaStep2Desc: "Multiply digit by (digit + 1)",
  vedicEkadhikenaStep3Title: "Step 3: Right Half",
  vedicEkadhikenaStep3Desc: "The right half is always 25",

  // Formulas & Proofs
  vedicShowFormulaBtn: "Show Formula Explanation (For Ages 9-14)",
  vedicHideFormulaBtn: "Hide Formula Explanation",
  vedicProofHeading: "Algebraic Proof (Sutra logic):",
  vedicProofSquare: "If a number is 'd' below 100, then (100 - d)² = 10000 - 200d + d² = 100(100 - 2d) + d² = 100(Number - deviation) + deviation². Hence, the left half is (Number - deviation) and the right half is deviation².",
  vedicProofCross: "The expansion of place values (100a + 10b + c)(10d + e) = 1000ad + 100(ae + bd) + 10(be + cd) + ce, which dictates the step-by-step vertical and crosswise multiplication.",
  vedicProofEkadhikena: "Any number ending in 5 can be written as 10x + 5. Its square is (10x + 5)² = 100x(x + 1) + 25. This mathematically proves why the left side is x(x + 1) and the right side is always 25.",
};

export const labVedicHi: typeof labVedicEn = {
  // Breadcrumbs
  labVedicBreadcrumbHome: "मुख्यपृष्ठ",
  labVedicBreadcrumbLabs: "इंटरैक्टिव लर्निंग लैब्स",
  labVedicBreadcrumbSutras: "वैदिक गणित सूत्र",

  // Hero Section
  labVedicHeroBadge: "अत्यंत तीव्र मानसिक गणना",
  labVedicHeroTitle: "इंटरैक्टिव वैदिक गणित सूत्र लैब",
  labVedicHeroSubtitle: "नीचे 3 प्रामाणिक वैदिक सूत्रों का परीक्षण करें। देखें कि कैसे क्रॉस-गुणन वेक्टर पथ और बीजगणितीय विचलन पैटर्न कई पंक्तियों की गणना को एक ही पंक्ति के मानसिक उत्तर में बदल देते हैं।",

  // Benefits Section
  labVedicBenefitsBadge: "CBSE, ICSE और ओलंपियाड परीक्षा लाभ",
  labVedicBenefitsTitle: "वैदिक गणित परीक्षा के समय के दबाव की समस्या को कैसे हल करता है",
  labVedicBenefitsDesc: "कक्षा 6 से 10 के पाठ्यक्रम में छात्र परीक्षा का 70% समय केवल अंकगणितीय गणनाओं में बिताते हैं। वैदिक गणित त्वरित सत्यापन शॉर्टकट प्रदान करता है, जिससे लापरवाह गलतियाँ समाप्त हो जाती हैं।",
  labVedicBenefit1Title: "एकल-पंक्ति वेक्टर गणित",
  labVedicBenefit1Desc: "ऊर्ध्व-तिर्यग्भ्याम् सूत्र आंशिक गुणनफल की कई पंक्तियों को दरकिनार करते हुए अंतिम उत्तर सीधे एक क्षैतिज पंक्ति में लिखता है।",
  labVedicBenefit2Title: "त्वरित उत्तर सत्यापन (बीजांक)",
  labVedicBenefit2Desc: "डिजिटल रूट सूत्रों (बीजांक) का उपयोग करके छात्र 3 सेकंड से कम समय में उत्तर की पुष्टि करते हैं, बिना लंबी भाग या वर्ग गणना को दोबारा किए।",
  labVedicBenefit3Title: "मजबूत बीजगणितीय आधार",
  labVedicBenefit3Desc: "रटने के बजाय प्रत्येक वैदिक शॉर्टकट का एक सुंदर बीजगणितीय प्रमाण ((a-b)², (10x+5)²) होता है, जो हाई स्कूल बीजगणित को गहरा बनाता है।",

  // CTA Section
  labVedicCtaBadge: "कक्षा 5 से 10 उन्नत बैच",
  labVedicCtaTitle: "नेहा पाटिल के साथ निःशुल्क 1-ऑन-1 मूल्यांकन बुक करें",
  labVedicCtaDesc: "अपने बच्चे की अंकगणितीय गणना बाधाओं की पहचान करें। नेहा पाटिल स्कूली बोर्ड और ओलंपियाड के अनुसार व्यक्तिगत स्पीड-लर्निंग योजना तैयार करती हैं।",
  labVedicCtaBookBtn: "पालक परामर्श बुक करें",
  labVedicCtaLevelsBtn: "पाठ्यक्रम स्तर देखें",

  // Vedic Math Demo Component Strings
  vedicSelectNumberLabel: "संख्या चुनें:",
  vedicStep1DeficiencyTitle: "चरण 1: विचलन",
  vedicStep1DeficiencyDesc: "संख्या 100 से कितनी कम है ज्ञात करें",
  vedicStep2LeftTitle: "चरण 2: बायाँ भाग",
  vedicStep2LeftDesc: "संख्या में से विचलन घटाएं",
  vedicStep3RightTitle: "चरण 3: दायाँ भाग",
  vedicStep3RightDesc: "विचलन का वर्ग करें (2 अंकों में रखें)",
  vedicCombinePartsTitle: "भागों को मिलाएं",
  vedicFinalAnswerLabel: "अंतिम उत्तर",

  // Sutra 2: Urdhva Tiryagbhyam
  vedicCrossTitle: "सूत्र: ऊर्ध्व-तिर्यग्भ्याम् (ऊर्ध्वाधर और तिर्यक)",
  vedicCrossSubtitle: "क्रॉस-गुणा वेक्टर पथों का उपयोग करके किसी भी 3-अंकीय संख्या को 2-अंकीय संख्या (जैसे 123 × 45) से चरण-दर-चरण गुणा करें!",
  vedicCrossStep1Vector: "↑ केवल इकाइयां",
  vedicCrossStep2Vector: "↖ दहाई/इकाई का तिरछा गुणा ↗",
  vedicCrossStep3Vector: "↖ सैकड़ा/इकाई और दहाई का तिरछा गुणा ↗",
  vedicCrossStep4Vector: "↖ सैकड़ा/दहाई का तिरछा गुणा ↗",
  vedicCrossStep5Vector: "✅ हो गया!",
  vedicCrossStepOfTotal: "चरण {current} / 5",
  vedicBtnPrev: "पिछला",
  vedicBtnNext: "अगला",

  // 3x2 Steps Details
  vedic3x2Step1Title: "चरण 1: इकाइयों को सीधा गुणा करें",
  vedic3x2Step1Explain: "दाहिनी ओर के अंकों को गुणा करें। 5 लिखें, 1 को आगे बढ़ाएं (हासिल)।",
  vedic3x2Step1Result: "उत्तर: ...5 (हासिल: 1)",

  vedic3x2Step2Title: "चरण 2: दहाई और इकाई को तिरछा गुणा करें",
  vedic3x2Step2Explain: "दहाई और इकाई को तिरछा गुणा करें, फिर पिछला हासिल (1) जोड़ें = 23। 3 लिखें, 2 आगे बढ़ाएं।",
  vedic3x2Step2Result: "उत्तर: ..35 (हासिल: 2)",

  vedic3x2Step3Title: "चरण 3: सैकड़ा और इकाई + दहाई को तिरछा गुणा करें",
  vedic3x2Step3Explain: "सैकड़ा/इकाई और दहाई/दहाई को तिरछा गुणा करें, फिर पिछला हासिल (2) जोड़ें = 15। 5 लिखें, 1 आगे बढ़ाएं।",
  vedic3x2Step3Result: "उत्तर: .535 (हासिल: 1)",

  vedic3x2Step4Title: "चरण 4: सैकड़ा और दहाई को तिरछा गुणा करें",
  vedic3x2Step4Explain: "सबसे बाईं ओर के अंकों को तिरछा गुणा करें, फिर पिछला हासिल (1) जोड़ें = 5। 5 लिखें।",
  vedic3x2Step4Result: "उत्तर: 5535 (हासिल: 0)",

  vedic3x2Step5Title: "चरण 5: सही अंतिम उत्तर!",
  vedic3x2Step5Explain: "सभी चरण पूरे हुए! देखें कि आपने केवल एक पंक्ति में 3-अंकीय और 2-अंकीय गुणा कितनी तेजी से हल किया।",
  vedic3x2Step5Result: "उत्तर: 5535 ✅",

  // Sutra 3: Ekadhikena Purvena
  vedicEkadhikenaTitle: "सूत्र: एकाधिकेन पूर्वेण (5 पर समाप्त होने वाली संख्याएं)",
  vedicEkadhikenaSubtitle: "5 पर समाप्त होने वाली किसी भी संख्या का वर्ग (जैसे 35²) केवल 3 आसान चरणों में तुरंत ज्ञात करें!",
  vedicEkadhikenaStep1Title: "चरण 1: पहला अंक",
  vedicEkadhikenaStep1Desc: "अंतिम '5' को छोड़कर पहला अंक लें",
  vedicEkadhikenaStep2Title: "चरण 2: बायाँ भाग",
  vedicEkadhikenaStep2Desc: "अंतिम '5' को छोड़कर पहले अंक को (अंक + 1) से गुणा करें",
  vedicEkadhikenaStep3Title: "चरण 3: दायाँ भाग",
  vedicEkadhikenaStep3Desc: "अंतिम भाग हमेशा 25 होता है",

  // Formulas & Proofs
  vedicShowFormulaBtn: "सूत्र स्पष्टीकरण देखें (9-14 वर्ष के लिए)",
  vedicHideFormulaBtn: "सूत्र स्पष्टीकरण छिपाएं",
  vedicProofHeading: "बीजगणितीय प्रमाण (Algebraic Proof):",
  vedicProofSquare: "यदि कोई संख्या 100 से 'd' कम है, तो (100 - d)² = 10000 - 200d + d² = 100(100 - 2d) + d² = 100(संख्या - विचलन) + विचलन²। इसलिए बायाँ भाग (संख्या - विचलन) और दायाँ भाग विचलन² है।",
  vedicProofCross: "इकाइयों, दहाइयों और सैकड़ा स्थानों के सामान्य विस्तार (100a + 10b + c)(10d + e) को गुणन स्तंभों में दर्शाया गया है: 1000ad + 100(ae + bd) + 10(be + cd) + ce।",
  vedicProofEkadhikena: "5 पर समाप्त होने वाली संख्या (10x + 5)² = 100x² + 100x + 25 = 100x(x + 1) + 25 होती है। इसलिए बायाँ भाग x(x + 1) होता है और दाहिना भाग हमेशा 25 होता है।",
};

export const labVedicMr: typeof labVedicEn = {
  // Breadcrumbs
  labVedicBreadcrumbHome: "मुख्यपृष्ठ",
  labVedicBreadcrumbLabs: "परस्परसंवादी लर्निंग लॅब्स",
  labVedicBreadcrumbSutras: "वैदिक गणित सूत्रे",

  // Hero Section
  labVedicHeroBadge: "अति-वेगवान मानसिक गणना",
  labVedicHeroTitle: "परस्परसंवादी वैदिक गणित सूत्र लॅब",
  labVedicHeroSubtitle: "खालील ३ अस्सल वैदिक सूत्रांची चाचणी घ्या. क्रॉस-गुणाकार व्हेक्टर मार्ग आणि बीजगणितीय विचलन पद्धतीमुळे अनेक पायऱ्यांचे गुणाकार एकाच आडव्या ओळीत तोंडी कसे सोडवता येतात ते पहा.",

  // Benefits Section
  labVedicBenefitsBadge: "CBSE, ICSE आणि ऑलिम्पियाड परीक्षांचे फायदे",
  labVedicBenefitsTitle: "वैदिक गणित परीक्षेतील वेळेचा दबाव कसा दूर करते",
  labVedicBenefitsDesc: "इयत्ता ६ वी ते १० वी च्या शालेय अभ्यासक्रमात विद्यार्थी परीक्षेचा ७०% वेळ केवळ कच्च्या अंकगणिती आकडेमोडीत घालवतात. वैदिक गणित अति-वेगवान पडताळणी पद्धती देते, ज्यामुळे निष्काळजी चुका टळतात.",
  labVedicBenefit1Title: "एकाच ओळीतील व्हेक्टर गणित",
  labVedicBenefit1Desc: "ऊर्ध्व-तिर्यग्भ्याम् सूत्र अनेक पायऱ्यांचा लांबलचक गुणाकार न करता अंतिम उत्तर थेट एकाच आडव्या ओळीत लिहिण्याची पद्धत देते.",
  labVedicBenefit2Title: "त्वरित उत्तर पडताळणी (बीजांक)",
  labVedicBenefit2Desc: "डिजिटल रूट सूत्रांचा (बीजांक) वापर करून विद्यार्थी ३ सेकंदांत उत्तराची अचूकता तपासतात, ज्यामुळे पुन्हा संपूर्ण भागाकार किंवा वर्ग करण्याची गरज उरत नाही.",
  labVedicBenefit3Title: "भक्कम बीजगणितीय पाया",
  labVedicBenefit3Desc: "घोकंपट्टीच्या युक्त्यांऐवजी प्रत्येक वैदिक सूत्राला एक सुरेख बीजगणितीय सिद्धता ((a-b)², (10x+5)²) असते, ज्यामुळे माध्यमिक शाळेतील बीजगणित सहज समजते.",

  // CTA Section
  labVedicCtaBadge: "इयत्ता ५ वी ते १० वी प्रगत बॅचेस",
  labVedicCtaTitle: "नेहा पाटील यांच्यासोबत विनामूल्य १-ऑन-१ मूल्यमापन बुक करा",
  labVedicCtaDesc: "आपल्या पाल्याच्या अंकगणितीय अडचणी शोधा. नेहा पाटील शालेय बोर्ड आणि ऑलिम्पियाडनुसार वैयक्तिकृत स्पीड-लर्निंग योजना तयार करतात.",
  labVedicCtaBookBtn: "पालक समुपदेशन बुक करा",
  labVedicCtaLevelsBtn: "अभ्यासक्रम स्तर तपासा",

  // Vedic Math Demo Component Strings
  vedicSelectNumberLabel: "संख्या निवडा:",
  vedicStep1DeficiencyTitle: "पायरी १: विचलन",
  vedicStep1DeficiencyDesc: "दिलेली संख्या १०० पेक्षा किती कमी आहे ते काढा",
  vedicStep2LeftTitle: "पायरी २: डावा भाग",
  vedicStep2LeftDesc: "संख्येतून विचलन वजा करा",
  vedicStep3RightTitle: "पायरी ३: उजवा भाग",
  vedicStep3RightDesc: "विचलनाचा वर्ग करा (२ अंकी ठेवा)",
  vedicCombinePartsTitle: "भाग एकत्र करा",
  vedicFinalAnswerLabel: "अंतिम उत्तर",

  // Sutra 2: Urdhva Tiryagbhyam
  vedicCrossTitle: "सूत्र: ऊर्ध्व-तिर्यग्भ्याम् (उभा आणि तिरपा गुणाकार)",
  vedicCrossSubtitle: "क्रॉस-गुणा पद्धत वापरून ३-अंकी संख्येला २-अंकी संख्येने (उदा. १२३ × ४५) सोप्या टप्प्यात गुणाकार करा!",
  vedicCrossStep1Vector: "↑ फक्त एकक स्थान",
  vedicCrossStep2Vector: "↖ दशक/एकक तिरपा गुणाकार ↗",
  vedicCrossStep3Vector: "↖ शतक/एकक आणि दशक तिरपा गुणाकार ↗",
  vedicCrossStep4Vector: "↖ शतक/दशक तिरपा गुणाकार ↗",
  vedicCrossStep5Vector: "✅ पूर्ण!",
  vedicCrossStepOfTotal: "पायरी {current} पैकी ५",
  vedicBtnPrev: "मागे",
  vedicBtnNext: "पुढे",

  // 3x2 Steps Details
  vedic3x2Step1Title: "पायरी १: एकक स्थानाचा उभा गुणाकार",
  vedic3x2Step1Explain: "उजवीकडील एकक स्थानच्या अंकांचा उभा गुणाकार करा. ५ खाली लिहा, १ हातचा ठेवा.",
  vedic3x2Step1Result: "उत्तर: ...५ (हातचा: १)",

  vedic3x2Step2Title: "पायरी २: दशक आणि एकक अंकांचा तिरपा गुणाकार",
  vedic3x2Step2Explain: "दशक आणि एकक अंकांचा तिरपा गुणाकार करा आणि पूर्वीचा हातचा (१) जोडा = २३. ३ खाली लिहा, २ हातचा ठेवा.",
  vedic3x2Step2Result: "उत्तर: ..३५ (हातचा: २)",

  vedic3x2Step3Title: "पायरी ३: शतक-एकक आणि दशक-दशक गुणाकार",
  vedic3x2Step3Explain: "शतक आणि एकक, आणि दशक आणि दशक यांचा गुणाकार करून हातचा (२) जोडा = १५. ५ खाली लिहा, १ हातचा ठेवा.",
  vedic3x2Step3Result: "उत्तर: .५३५ (हातचा: १)",

  vedic3x2Step4Title: "पायरी ४: शतक आणि दशक अंकांचा तिरपा गुणाकार",
  vedic3x2Step4Explain: "शतक आणि दशक अंकांचा गुणाकार करा आणि हातचा (१) जोडा = ५. ५ खाली लिहा.",
  vedic3x2Step4Result: "उत्तर: ५५३५ (हातचा: ०)",

  vedic3x2Step5Title: "पायरी ५: अचूक अंतिम उत्तर!",
  vedic3x2Step5Explain: "सर्व पायऱ्या पूर्ण झाल्या! केवळ एका ओळीत तुम्ही ३-अंकी आणि २-अंकी गुणाकार किती जलद सोडवला ते पहा.",
  vedic3x2Step5Result: "उत्तर: ५५३५ ✅",

  // Sutra 3: Ekadhikena Purvena
  vedicEkadhikenaTitle: "सूत्र: एकाधिकेन पूर्वेण (५ ने शेवट होणाऱ्या संख्या)",
  vedicEkadhikenaSubtitle: "५ ने शेवट होणाऱ्या कोणत्याही संख्येचा वर्ग (उदा. ३५²) अवघ्या ३ सोप्या टप्प्यात त्वरित काढा!",
  vedicEkadhikenaStep1Title: "पायरी १: पहिला अंक",
  vedicEkadhikenaStep1Desc: "शेवटचा '५' वगळता पहिला अंक घ्या",
  vedicEkadhikenaStep2Title: "पायरी २: डावा भाग",
  vedicEkadhikenaStep2Desc: "शेवटचा '५' वगळता पहिल्या अंकाला (अंक + १) ने गुणा",
  vedicEkadhikenaStep3Title: "पायरी ३: उजवा भाग",
  vedicEkadhikenaStep3Desc: "शेवटचा भाग नेहमी २५ असतो",

  // Formulas & Proofs
  vedicShowFormulaBtn: "सूत्र स्पष्टीकरण पहा (९-१४ वर्षे)",
  vedicHideFormulaBtn: "सूत्र स्पष्टीकरण लपवा",
  vedicProofHeading: "बीजगणितीय स्पष्टीकरण (Algebraic Proof):",
  vedicProofSquare: "जर एखादी संख्या १०० पेक्षा 'd' ने कमी असेल, तर (100 - d)² = 10000 - 200d + d² = 100(100 - 2d) + d² = 100(संख्या - विचलन) + विचलन²। म्हणून डावी बाजू (संख्या - विचलन) आणि उजवी बाजू विचलन² असते.",
  vedicProofCross: "इकाई, दशक आणि शतक स्थानांचा विस्तार (100a + 10b + c)(10d + e) गुणाकारात असा होतो: 1000ad + 100(ae + bd) + 10(be + cd) + ce।",
  vedicProofEkadhikena: "५ ने शेवट होणारी संख्या (10x + 5)² = 100x² + 100x + 25 = 100x(x + 1) + 25 असते। म्हणून डावी बाजू x(x + 1) आणि उजवी बाजू नेहमी २५ असते.",
};
