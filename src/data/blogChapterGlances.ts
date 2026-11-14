/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Multilingual Curated Chapter Glances for AAA Blog Post 4 (National Championship 2026)
 * Supports English (en), Hindi (hi), and Marathi (mr).
 * 
 * Strict Governance:
 * - Zero fabricated credentials
 * - Accurate director attribution: Neha Patil / नेहा पाटिल (HI) / नेहा पाटील (MR)
 * - Zero-PII analytics protocol
 */

export interface ChapterGlanceItem {
  badgeText: string;
  readTime: string;
  hasDirectorPhoto?: boolean;
  highlights: {
    icon: string;
    label: string;
    text: string;
  }[];
}

export const CHAMPIONSHIP_CHAPTER_GLANCES: Record<"en" | "hi" | "mr", Record<number, ChapterGlanceItem>> = {
  en: {
    1: {
      badgeText: "5 Core Highlights",
      readTime: "2 min",
      highlights: [
        { icon: "🎯", label: "Core Philosophy", text: "Zero exam anxiety & calm cognitive confidence over shallow medal races." },
        { icon: "💡", label: "AAA Learning Model™", text: "6-stage cognitive cycle converting repetitive drills into deep visual retention." },
        { icon: "🧮", label: "56 Personalized Paths", text: "Stage-specific mentoring across 15 developmental tiers from KG-1 to Senior Vedic." },
        { icon: "🚀", label: "40% Accuracy Benchmark", text: "40% of AAA champions solve 100 questions with 100% accuracy in <20 mins." },
        { icon: "👨‍👩‍👧", label: "Parent Reflection Kit", text: "5 transformative questions moving beyond 'What was your score?'." },
      ]
    },
    2: {
      badgeText: "3 Reader Tracks",
      readTime: "1 min",
      highlights: [
        { icon: "👨‍👩‍👧", label: "For Parents", text: "Practical ways to replace exam panic with calm confidence and home visualization." },
        { icon: "🎒", label: "For Students", text: "Owning your own rhythmic pace so peer page-turning never rattles your focus." },
        { icon: "🎓", label: "For Educators", text: "Child-centric blueprint for running high-stakes national competitions with dignity." },
      ]
    },
    3: {
      badgeText: "Core Mindset",
      readTime: "1.5 min",
      highlights: [
        { icon: "⏱️", label: "Beyond Speed", text: "Speed without clarity is fragile; true mastery is calm, self-reliant execution." },
        { icon: "💡", label: "Breakthrough Moment", text: "When a student pauses with steady breath and knows: 'I can solve this myself.'" },
        { icon: "📍", label: "National Stage", text: "AAA Wakad serves as Official Offline Exam Center on Sunday, 18 Oct 2026." },
      ]
    },
    4: {
      badgeText: "15 Learning Levels",
      readTime: "2 min",
      highlights: [
        { icon: "🧮", label: "Abacus Soroban (KG-1 to SR-3)", text: "Tactile bead mechanics & 2-hand bilateral brain activation." },
        { icon: "✨", label: "Vedic Maths (JVM-0 to VM)", text: "16 Sanskrit Sutras, lightning vertical & crosswise mental multiplication." },
        { icon: "🌟", label: "56 Individual Stories", text: "Tailored milestones honoring each child's cognitive fingerprint." },
      ]
    },
    5: {
      badgeText: "Diagnostic Milestone",
      readTime: "1.5 min",
      highlights: [
        { icon: "📊", label: "The 40% Milestone", text: "Approximately 40% of students completed 100 questions with 100% accuracy in <20 mins." },
        { icon: "🔍", label: "Mistakes as Data", text: "Errors are treated as diagnostic clues to calibrate concepts, not failures." },
        { icon: "💭", label: "Growth Reflection", text: "'What did this attempt teach you, and what will you try differently next time?'" },
      ]
    },
    6: {
      badgeText: "5 Lifelong Habits",
      readTime: "2 min",
      highlights: [
        { icon: "🎯", label: "1. Laser Precision", text: "Deliberate calculation and accuracy before rushing to write." },
        { icon: "👁️", label: "2. Deep Focus", text: "Sustained concentration locked across 100 consecutive problems." },
        { icon: "⏱️", label: "3. Pacing Mastery", text: "Steady rhythm immune to surrounding peer distractions." },
        { icon: "💡", label: "4. Autonomous Execution", text: "Self-reliant mental arithmetic without waiting for hints." },
        { icon: "🦁", label: "5. Exam Fearlessness", text: "Curiosity and an eager smile over numerical panic." },
      ]
    },
    7: {
      badgeText: "6-Stage Pedagogy",
      readTime: "1.5 min",
      highlights: [
        { icon: "🔁", label: "The Cognitive Cycle", text: "Inspire → Explore → Understand → Practice → Apply → Reflect." },
        { icon: "🧠", label: "Whole-Brain Balance", text: "Stimulating both analytical (left) and creative/visual (right) hemispheres." },
      ]
    },
    8: {
      badgeText: "Neuroscience of Anzan",
      readTime: "1.5 min",
      highlights: [
        { icon: "🧠", label: "Photographic Soroban", text: "Transitioning from physical beads to an internal mental abacus." },
        { icon: "⚡", label: "High-Speed Calculation", text: "Sub-second mental arithmetic via spatial memory & tactile recall." },
      ]
    },
    9: {
      badgeText: "Mock Paper Strategy",
      readTime: "1.5 min",
      highlights: [
        { icon: "📈", label: "Error Heatmaps", text: "Pinpointing speed friction points rather than judging test marks." },
        { icon: "🛡️", label: "Stress-Free Simulation", text: "Familiarizing exam duration so championship day feels like home practice." },
      ]
    },
    10: {
      badgeText: "4 Championship Rules",
      readTime: "1.5 min",
      highlights: [
        { icon: "🧘", label: "Rule 1 - The 10-Second Pause", text: "Deep belly breath before flipping the first page." },
        { icon: "🔇", label: "Rule 2 - Blindfold Your Ears", text: "Ignore how fast neighbors turn pages; stick to your own rhythm." },
        { icon: "🔍", label: "Rule 3 - The Checksum Habit", text: "Quick Vedic digit-sum sanity check on multi-digit problems." },
        { icon: "🏆", label: "Rule 4 - Post-Exam Celebration", text: "Celebrate effort and courage immediately after the exam." },
      ]
    },
    11: {
      badgeText: "Home Conversation Kit",
      readTime: "1.5 min",
      highlights: [
        { icon: "💬", label: "5 Reflective Questions", text: "'Which problem challenged you most?', 'How did your breathing feel?', 'What made you proud?'" },
        { icon: "🏡", label: "Intrinsic Motivation", text: "Building self-worth rooted in perseverance rather than exam ranks." },
      ]
    },
    12: {
      badgeText: "Event Snapshot",
      readTime: "1 min",
      highlights: [
        { icon: "🗓️", label: "Championship Date", text: "Sunday, 18 October 2026." },
        { icon: "📍", label: "Official Offline Center", text: "Arnav Abacus Academy, Wakad, Pune, Maharashtra." },
        { icon: "🏅", label: "Organisers & Accreditations", text: "Organised by AVAS & powered by IIVA Book of Records (NSDC Approved Partner)." },
      ]
    },
    13: {
      badgeText: "Founder's Address",
      readTime: "1.5 min",
      hasDirectorPhoto: true,
      highlights: [
        { icon: "💌", label: "Letter to 56 Champions", text: "'You have already won by daring to challenge yourself with courage.'" },
        { icon: "🎁", label: "Free Math Assessment", text: "Book 1-on-1 Free Abacus & Vedic Math Assessment Session at AAA Wakad." },
      ]
    }
  },
  hi: {
    1: {
      badgeText: "५ मुख्य बिंदु",
      readTime: "२ मिनट",
      highlights: [
        { icon: "🎯", label: "मुख्य शैक्षिक दर्शन", text: "पदकों की अंधी दौड़ के बजाय शांत आत्मविश्वास और परीक्षा के तनाव से मुक्ति।" },
        { icon: "💡", label: "AAA लर्निंग मॉडल™", text: "६-चरणीय शिक्षण चक्र जो रटने के बजाय गहरी दृश्य स्मृति बनाता है।" },
        { icon: "🧮", label: "१५ स्तरों में ५६ व्यक्तिगत पथ", text: "केजी-१ से सीनियर वैदिक तक १५ स्तरों में व्यक्तिगत मार्गदर्शन।" },
        { icon: "🚀", label: "४०% सटीकता का मानक", text: "४०% छात्रों ने २० मिनट से कम में १०० प्रश्नों को १००% सटीकता से हल किया।" },
        { icon: "👨‍👩‍👧", label: "पेरेंट रिफ्लेक्शन किट", text: "५ विचारोत्तेजक प्रश्न जो 'कितने अंक मिले?' से आगे आत्म-विश्वास जगाते हैं।" },
      ]
    },
    2: {
      badgeText: "३ पाठक वर्ग",
      readTime: "१ मिनट",
      highlights: [
        { icon: "👨‍👩‍👧", label: "अभिभावकों के लिए", text: "परीक्षा के तनाव को शांत आत्मविश्वास में बदलने और घर पर अभ्यास कराने के व्यावहारिक तरीके।" },
        { icon: "🎒", label: "छात्रों के लिए", text: "अपनी अध्ययन गति पर विश्वास ताकि सहपाठियों के पन्ने पलटने से ध्यान न भटके।" },
        { icon: "🎓", label: "शिक्षकों के लिए", text: "बाल मनोविज्ञान और गरिमा को केंद्र में रखकर राष्ट्रीय प्रतियोगिताओं के संचालन का मॉडल।" },
      ]
    },
    3: {
      badgeText: "मुख्य दृष्टिकोण",
      readTime: "१.५ मिनट",
      highlights: [
        { icon: "⏱️", label: "गति से परे", text: "स्पष्टता के बिना गति कमजोर होती है; वास्तविक प्रवीणता शांत और स्वतंत्र समाधान है।" },
        { icon: "💡", label: "जादुई क्षण", text: "जब बच्चा गहरी सांस लेता है और जानता है: 'मैं इसे खुद हल कर सकता हूँ।'" },
        { icon: "📍", label: "राष्ट्रीय मंच", text: "रविवार, १८ अक्टूबर २०२६ को AAA वाकड आधिकारिक ऑफलाइन परीक्षा केंद्र के रूप में सज्ज।" },
      ]
    },
    4: {
      badgeText: "१५ शिक्षण स्तर",
      readTime: "२ मिनट",
      highlights: [
        { icon: "🧮", label: "अबेकस सोरोबन (KG-1 से SR-3)", text: "स्पर्श-आधारित मणियाँ और दोनों हाथों से द्विपक्षीय मस्तिष्क सक्रियण।" },
        { icon: "✨", label: "वैदिक गणित (JVM-0 से VM)", text: "१६ संस्कृत सूत्र और बिजली की गति से ऊर्ध्व-तिर्यक मानसिक गुणा।" },
        { icon: "🌟", label: "५६ अनूठी कहानियाँ", text: "प्रत्येक बच्चे की व्यक्तिगत सीखने की गति और क्षमता का सम्मान।" },
      ]
    },
    5: {
      badgeText: "नैदानिक उपलब्धि",
      readTime: "१.५ मिनट",
      highlights: [
        { icon: "📊", label: "४०% की उपलब्धि", text: "लगभग ४०% छात्रों ने २० मिनट से कम में १०० प्रश्न १००% सटीकता से पूरे किए।" },
        { icon: "🔍", label: "गलतियाँ केवल डेटा हैं", text: "गलतियाँ विफलता नहीं, बल्कि सुधार और बेहतर समझ के नैदानिक सुराग हैं।" },
        { icon: "💭", label: "आत्म-चिंतन प्रश्न", text: "'इस प्रयास ने आपको क्या सिखाया, और अगली बार आप क्या नया आज़माएंगे?'" },
      ]
    },
    6: {
      badgeText: "५ स्थायी आदतें",
      readTime: "२ मिनट",
      highlights: [
        { icon: "🎯", label: "१. सटीक दृष्टि", text: "उत्तर लिखने की जल्दबाजी करने से पहले ध्यानपूर्वक पढ़ना और सटीकता।" },
        { icon: "👁️", label: "२. गहरी एकाग्रता", text: "बिना भटके लगातार १०० प्रश्नों पर गहरा व अखंड ध्यान।" },
        { icon: "⏱️", label: "३. गति पर नियंत्रण", text: "सहपाठियों से अप्रभावित अपनी स्थिर व संतुलित अध्ययन गति।" },
        { icon: "💡", label: "४. स्वतंत्र निष्पादन", text: "किसी संकेत की प्रतीक्षा किए बिना स्वतंत्र मानसिक गणना।" },
        { icon: "🦁", label: "५. परीक्षा से निर्भयता", text: "संख्याओं के डर पर जिज्ञासा और आत्मविश्वास की विजय।" },
      ]
    },
    7: {
      badgeText: "६-चरणीय शिक्षण",
      readTime: "१.५ मिनट",
      highlights: [
        { icon: "🔁", label: "संज्ञानात्मक चक्र", text: "प्रेरित करें → अन्वेषण → समझें → अभ्यास → लागू करें → चिंतन।" },
        { icon: "🧠", label: "संपूर्ण मस्तिष्क संतुलन", text: "विश्लेषणात्मक (बाएं) और दृश्य/रचनात्मक (दाएं) दोनों गोलार्धों को सक्रिय करना।" },
      ]
    },
    8: {
      badgeText: "अंज़ान का तंत्रिका विज्ञान",
      readTime: "१.५ मिनट",
      highlights: [
        { icon: "🧠", label: "फोटोग्राफिक सोरोबन", text: "भौतिक मणियों से अंतर्मन में मानसिक अबेकस का निर्माण।" },
        { icon: "⚡", label: "अति-तीव्र गणना", text: "स्थानिक स्मृति और त्वरित स्पर्श स्मृति द्वारा सेकंडों में गणना।" },
      ]
    },
    9: {
      badgeText: "मॉक पेपर रणनीति",
      readTime: "१.५ मिनट",
      highlights: [
        { icon: "📈", label: "कठिनाइयों की पहचान", text: "अंकों पर निर्णय लेने के बजाय गति में आने वाली अड़चनों को समझना।" },
        { icon: "🛡️", label: "तनावमुक्त सिमुलेशन", text: "परीक्षा अवधि का ऐसा अभ्यास कि प्रतियोगिता का दिन सामान्य अभ्यास जैसा लगे।" },
      ]
    },
    10: {
      badgeText: "४ स्वर्ण नियम",
      readTime: "१.५ मिनट",
      highlights: [
        { icon: "🧘", label: "नियम १ - १० सेकंड का विराम", text: "पहला पन्ना पलटने से पहले गहरी सांस लें और मन शांत करें।" },
        { icon: "🔇", label: "नियम २ - एकाग्रता बनाए रखें", text: "दूसरे छात्र कितनी तेजी से पन्ने पलट रहे हैं, इस पर ध्यान न दें।" },
        { icon: "🔍", label: "नियम ३ - उत्तर जाँच की आदत", text: "बहु-अंकीय गणनाओं पर त्वरित वैदिक बीजांक जाँच पद्धति अपनाएं।" },
        { icon: "🏆", label: "नियम ४ - प्रयास का उत्सव", text: "परीक्षा के तुरंत बाद बच्चे के साहस और प्रयास का दिल से जश्न मनाएं।" },
      ]
    },
    11: {
      badgeText: "घरेलू संवाद किट",
      readTime: "१.५ मिनट",
      highlights: [
        { icon: "💬", label: "५ विचारोत्तेजक प्रश्न", text: "'किस प्रश्न ने सबसे ज्यादा चुनौती दी?', 'आज किस बात पर गर्व हुआ?'" },
        { icon: "🏡", label: "सच्ची प्रेरणा", text: "परीक्षा रैंक के बजाय निरंतरता और मेहनत पर आधारित आत्मसम्मान।" },
      ]
    },
    12: {
      badgeText: "आयोजन विवरण",
      readTime: "१ मिनट",
      highlights: [
        { icon: "🗓️", label: "चैंपियनशिप तिथि", text: "रविवार, १८ अक्टूबर २०२६।" },
        { icon: "📍", label: "आधिकारिक ऑफलाइन केंद्र", text: "अर्णव अबेकस एकेडमी, वाकड, पुणे, महाराष्ट्र।" },
        { icon: "🏅", label: "आयोजक एवं मान्यता", text: "AVAS द्वारा आयोजित एवं IIVA बुक ऑफ रिकॉर्ड्स (NSDC अनुमोदित भागीदार) द्वारा संचालित।" },
      ]
    },
    13: {
      badgeText: "संस्थापिका का संदेश",
      readTime: "१.५ मिनट",
      hasDirectorPhoto: true,
      highlights: [
        { icon: "💌", label: "५६ चैंपियंस के नाम पत्र", text: "'साहस के साथ खुद को चुनौती देकर आप पहले ही जीत चुके हैं।'" },
        { icon: "🎁", label: "निःशुल्क मूल्यांकन", text: "AAA वाकड में १-ऑन-१ निःशुल्क अबेकस एवं वैदिक गणित मूल्यांकन सत्र बुक करें।" },
      ]
    }
  },
  mr: {
    1: {
      badgeText: "५ मुख्य मुद्दे",
      readTime: "२ मिनिटे",
      highlights: [
        { icon: "🎯", label: "मुख्य शैक्षणिक दृष्टिकोन", text: "पदकांच्या पोकळ शर्यतीपेक्षा शांत आत्मविश्वास आणि परीक्षेची भीती घालवणे." },
        { icon: "💡", label: "AAA लर्निंग मॉडेल™", text: "पोपटपंची न करता दीर्घकालीन दृश्य स्मृती तयार करणारे ६ टप्प्यांचे अध्ययन मॉडेल." },
        { icon: "🧮", label: "१५ स्तरांमध्ये ५६ स्वतंत्र मार्ग", text: "केजी-१ ते सीनियर वैदिकपर्यंत १५ स्तरांमध्ये वैयक्तिक मार्गदर्शन." },
        { icon: "🚀", label: "४०% अचूकतेचा टप्पा", text: "४०% विद्यार्थ्यांनी २० मिनिटांपेक्षा कमी वेळेत १०० प्रश्न १००% अचूक सोडवले." },
        { icon: "👨‍👩‍👧", label: "पालकांसाठी विचारमंथन किट", text: "मुलांशी बोलताना 'किती गुण मिळाले?' पलीकडे विचार प्रवृत्त करणारे ५ प्रश्न." },
      ]
    },
    2: {
      badgeText: "३ वाचक वर्ग",
      readTime: "१ मिनिट",
      highlights: [
        { icon: "👨‍👩‍👧", label: "पालकांसाठी", text: "मुलांमधील परीक्षेची भीती घालवून घरात शांत आत्मविश्वास निर्माण करण्याचे मार्ग." },
        { icon: "🎒", label: "विद्यार्थ्यांसाठी", text: "स्वतःच्या गतीवर विश्वास, जेणेकरून शेजारी पाने उलटल्याने लक्ष विचलित होणार नाही." },
        { icon: "🎓", label: "शिक्षकांसाठी", text: "विद्यार्थ्यांचा स्वाभिमान केंद्रस्थानी ठेवून राष्ट्रीय स्पर्धा चालवण्याचा आदर्श आराखडा." },
      ]
    },
    3: {
      badgeText: "मूलभूत विचारसरणी",
      readTime: "१.५ मिनिटे",
      highlights: [
        { icon: "⏱️", label: "वेगाच्या पलीकडे", text: "समज नसताना केलेली घाई फसवी असते; शांत वृत्तीने स्वतःच्या बळावर गणित सोडवणे हेच खरे यश." },
        { icon: "💡", label: "प्रगतीचा जादुई क्षण", text: "जेव्हा मूल शांत श्वास घेते आणि म्हणते: 'हे गणित मी स्वतः सोडवू शकतो.'" },
        { icon: "📍", label: "राष्ट्रीय व्यासपीठ", text: "रविवार, १८ ऑक्टोबर २०२६ रोजी AAA वाकड अधिकृत ऑफलाइन परीक्षा केंद्र म्हणून सज्ज." },
      ]
    },
    4: {
      badgeText: "१५ अध्ययन स्तर",
      readTime: "२ मिनिटे",
      highlights: [
        { icon: "🧮", label: "ॲबॅकस सोरोबान (KG-1 ते SR-3)", text: "प्रत्यक्ष मण्यांचा स्पर्श आणि दोन्ही हातांनी मेंदूचा द्विपक्षीय विकास." },
        { icon: "✨", label: "वैदिक गणित (JVM-0 ते VM)", text: "१६ संस्कृत सूत्रे आणि सेकंदात होणारा उभा व तिरपा गुणाकार." },
        { icon: "🌟", label: "५६ वैयक्तिक स्वप्ने", text: "प्रत्येक मुलाच्या बौद्धिक क्षमतेचा सन्मान करणारे वैयक्तिक टप्पे." },
      ]
    },
    5: {
      badgeText: "सराव चाचणी यश",
      readTime: "१.५ मिनिटे",
      highlights: [
        { icon: "📊", label: "४०% अचूकतेचा टप्पा", text: "सुमारे ४०% विद्यार्थ्यांनी २० मिनिटांपेक्षा कमी वेळेत १०० प्रश्न १००% अचूक सोडवले." },
        { icon: "🔍", label: "चुका म्हणजे शिकण्याची संधी", text: "चुका म्हणजे अपयश नव्हे, तर कुठे सुधारणा हवी हे दाखवणारी दिशा." },
        { icon: "💭", label: "आत्मपरीक्षणाचे प्रश्न", text: "'या प्रयत्नातून तुला काय शिकायला मिळाले आणि पुढच्या वेळी तू काय वेगळे करून पाहशील?'" },
      ]
    },
    6: {
      badgeText: "५ जीवनोपयोगी सवयी",
      readTime: "२ मिनिटे",
      highlights: [
        { icon: "🎯", label: "१. अचूकतेची सवय", text: "उत्तर लिहिण्याची घाई करण्यापूर्वी प्रश्न शांतपणे वाचून अचूकता राखणे." },
        { icon: "👁️", label: "२. अखंड एकाग्रता", text: "सलग १०० प्रश्नांवर जराही विचलित न होता लक्ष केंद्रित ठेवणे." },
        { icon: "⏱️", label: "३. स्वतःच्या लयीवर ताबा", text: "इतरांच्या घाईकडे दुर्लक्ष करून स्वतःच्या लयीत काम करणे." },
        { icon: "💡", label: "४. स्वावलंबी विचारसरणी", text: "इतरांच्या सूचनेची वाट न पाहता स्वतःच्या बुद्धीने आकडेमोड करणे." },
        { icon: "🦁", label: "५. भीती नाहीशी होणे", text: "गणिताच्या भीतीवर मात करून चेहऱ्यावर आत्मविश्वासाचे हसू आणणे." },
      ]
    },
    7: {
      badgeText: "६ टप्प्यांची पद्धती",
      readTime: "१.५ मिनिटे",
      highlights: [
        { icon: "🔁", label: "अध्ययन चक्र", text: "प्रेरणा → शोध → संकल्पना समजणे → सराव → प्रत्यक्ष उपयोग → आत्मपरीक्षण." },
        { icon: "🧠", label: "मेंदूचा समतोल विकास", text: "मेंदूच्या डाव्या आणि उजव्या दोन्ही भागांचा समतोल व सर्वांगीण विकास." },
      ]
    },
    8: {
      badgeText: "अंझा़नचे न्यूरोसायन्स",
      readTime: "१.५ मिनिटे",
      highlights: [
        { icon: "🧠", label: "फोटोग्राफिक सोरोबान", text: "प्रत्यक्ष मण्यांवरून अंतर्मनातील काल्पनिक ॲबॅकसकडे वाटचाल." },
        { icon: "⚡", label: "अतिवेगाचा सराव", text: "स्थानिक स्मृती आणि बोटांच्या लयीतून सेकंदाच्या आत अचूक उत्तर." },
      ]
    },
    9: {
      badgeText: "सराव चाचणी रणनीती",
      readTime: "१.५ मिनिटे",
      highlights: [
        { icon: "📈", label: "अडचणी समजून घेणे", text: "गुणांवरून मुलाला न ठरवता वेगात येणाऱ्या अडचणी समजून घेणे." },
        { icon: "🛡️", label: "तणावमुक्त सराव", text: "परीक्षेची इतकी सवय करणे की चॅम्पियनशिपचा दिवसही रोजच्या सरावासारखा वाटेल." },
      ]
    },
    10: {
      badgeText: "४ सुवर्ण नियम",
      readTime: "१.५ मिनिटे",
      highlights: [
        { icon: "🧘", label: "नियम १ - १० सेकंदांचा शांत श्वास", text: "पहिला पान उलटण्यापूर्वी शांत श्वास घ्या आणि मन स्थिर करा." },
        { icon: "🔇", label: "नियम २ - स्वतःच्या लयीत राहा", text: "शेजारी किती वेगाने पाने पलटत आहे याकडे लक्ष देऊ नका." },
        { icon: "🔍", label: "नियम ३ - पडताळणीची सवय", text: "मोठ्या गणितांवर वैदिक बीजांक पद्धतीने त्वरित खात्री करणे." },
        { icon: "🏆", label: "नियम ४ - कौतुक आणि शाबासकी", text: "परीक्षेनंतर लगेच मुलांच्या मेहनतीचे आणि धैर्याचे मनापासून कौतुक करा." },
      ]
    },
    11: {
      badgeText: "घरगुती संवाद किट",
      readTime: "१.५ मिनिटे",
      highlights: [
        { icon: "💬", label: "५ विचारप्रवर्तक प्रश्न", text: "'कोणत्या गणिताने जास्त विचार करायला लावला?', 'आज कशाचा जास्त अभिमान वाटला?'" },
        { icon: "🏡", label: "अंतर्गत प्रेरणा", text: "परीक्षेतील क्रमांकाऐवजी स्वतःच्या चिकाटीतून मुलांमध्ये आत्मसन्मान निर्माण करणे." },
      ]
    },
    12: {
      badgeText: "स्पर्धा माहिती",
      readTime: "१ मिनिट",
      highlights: [
        { icon: "🗓️", label: "परीक्षेची तारीख", text: "रविवार, १८ ऑक्टोबर २०२६." },
        { icon: "📍", label: "अधिकृत केंद्र", text: "अर्णव ॲबॅकस अकॅडमी, वाकड, पुणे, महाराष्ट्र." },
        { icon: "🏅", label: "आयोजक व संस्था", text: "AVAS द्वारे आयोजित आणि IIVA बुक ऑफ रेकॉर्ड्स (NSDC मान्यताप्राप्त भागीदार) द्वारे संचालित." },
      ]
    },
    13: {
      badgeText: "संस्थापिकेचा संदेश",
      readTime: "१.५ मिनिटे",
      hasDirectorPhoto: true,
      highlights: [
        { icon: "💌", label: "५६ विजेत्यांना पत्र", text: "'धैर्याने स्वतःला आव्हान देऊन तुम्ही आधीच जिंकला आहात.'" },
        { icon: "🎁", label: "मोफत चाचणी सत्र", text: "AAA वाकड येथे १-ऑन-१ मोफत ॲबॅकस आणि वैदिक गणित चाचणी सत्र बुक करा." },
      ]
    }
  }
};
