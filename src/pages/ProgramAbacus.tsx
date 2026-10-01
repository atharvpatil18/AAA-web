/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  ChevronRight,
  Brain,
  HelpCircle,
  Clock,
  Users
} from "lucide-react";
import LeadForm from "../components/LeadForm";
import { trackProgramView } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function ProgramAbacus() {
  const { t } = useLanguage();

  useEffect(() => {
    trackProgramView("Abacus", "canonical_program_hub");
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Abacus Learning Program",
    "description": "Japanese Soroban Abacus and mental arithmetic calculation program for children aged 4 to 14 years in Wakad, Pune.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://arnavabacusacademy-web.vercel.app/"
    },
    "educationalCredentialAwarded": "Course Level Certificate (Levels 1 to 8)",
    "audience": {
      "@type": "Audience",
      "audienceType": "Children aged 4 to 14 years"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://arnavabacusacademy-web.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Programs",
        "item": "https://arnavabacusacademy-web.vercel.app/programs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Abacus Learning Program",
        "item": "https://arnavabacusacademy-web.vercel.app/programs/abacus"
      }
    ]
  };

  return (
    <div id="program-abacus-page" className="bg-[#FFFDF9] min-h-screen">
      {/* Course & Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-slate-100/80 border-b border-slate-200 py-2.5 px-4 md:px-8 text-xs font-semibold text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-vibrant-orange transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/programs" className="hover:text-vibrant-orange transition-colors">Programs</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-vibrant-dark font-bold">Abacus Learning Program</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="bg-vibrant-dark text-white py-14 md:py-20 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-vibrant-gold/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[10px] font-black text-vibrant-gold bg-[#FFF5CC]/15 border border-vibrant-gold/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                Flagship Cognitive Foundation
              </span>
              <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
                Abacus Maths Classes in Wakad, Pune
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                Structured Japanese Soroban calculation and mental math visualization for children. Building number confidence, focused concentration, and spatial thinking in our Wakad classroom.
              </p>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Clock className="w-3.5 h-3.5" /> Target Age: 4 to 14 Years
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-emerald-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> Peak Foundation: 5 to 9 Years
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-sky-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <MapPin className="w-3.5 h-3.5" /> Wakad Center, Pune
                </span>
              </div>

              {/* Academy Location Snippet */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-vibrant-orange shrink-0 mt-0.5" />
                <span>
                  <strong>Classroom Location:</strong> Flat No. 3, 1st Floor, Advocate Balaji Sagar Bungalow, Opp. Creative Cameo, Near Park Street, behind WISDOM WORLD SCHOOL, Wakad, Pune.
                </span>
              </div>
            </div>

            {/* Hero LeadForm Embed */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-vibrant-dark">
              <div className="mb-4">
                <span className="text-[10px] font-black text-vibrant-orange bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Book A Trial Session
                </span>
                <h2 className="text-xl font-black text-vibrant-dark mt-2">
                  Complimentary Center Evaluation
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Meet Mentor Neha Patil for a personalized counting and visualization readiness assessment.
                </p>
              </div>
              <LeadForm sourceCampaign="programs_abacus_page" defaultProgram="Abacus" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Who is this program for? */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Learner Readiness
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark">
            Who is the Abacus Program For?
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            Suitability depends on developmental readiness, motor coordination, and learning stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-vibrant-orange transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
              4–6
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">Early Beginners (Junior Soroban)</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Children developing number recognition and fine motor skills. Tactile beads provide physical, concrete anchors for numbers 1 to 100 without digital screen fatigue.
            </p>
          </div>

          <div className="bg-white border-2 border-vibrant-orange/40 p-6 rounded-3xl space-y-3 shadow-md relative">
            <span className="absolute -top-3 right-4 bg-vibrant-orange text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Optimal Foundation
            </span>
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-vibrant-orange flex items-center justify-center font-black text-sm">
              5–9
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">Elementary Learners (Anzan Foundation)</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Ideal window when mental calculation habits form. Children transition from physical beads to mental bead visualization, building natural calculation fluency and moving past finger counting.
            </p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-vibrant-orange transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-sm">
              10–14
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">Advanced Students (Speed & Focus)</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Older primary and middle schoolers seeking structured speed drills, multi-digit mental arithmetic, and auditory concentration practice to support competitive academic milestones.
            </p>
          </div>
        </div>
      </section>

      {/* 4. What the Child Learns & How AAA Teaches */}
      <section className="py-14 md:py-18 bg-vibrant-cream border-y-4 border-vibrant-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                Teaching Methodology
              </span>
              <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
                How Arnav Abacus Academy Teaches Abacus Maths
              </h2>
              <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
                Rather than teaching rote formulas, we utilize physical Japanese Soroban tools to engage visual, auditory, and kinesthetic learning channels simultaneously.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">Hands-on Tactile Bead Manipulation</strong>
                    <span className="text-xs text-slate-600 font-medium">Moving beads using thumbs and index fingers bridges physical quantities with mental number representation.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">Anzan Mental Visualization</strong>
                    <span className="text-xs text-slate-600 font-medium">Anzan — the Japanese method of mental abacus visualization — is used within AAA's advanced training to cultivate internal spatial representation of numbers.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">Auditory Dictation Rounds</strong>
                    <span className="text-xs text-slate-600 font-medium">Listening to rapid dictation drills trains auditory focus and immediate working memory recall.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">School Curriculum Alignment</strong>
                    <span className="text-xs text-slate-600 font-medium">Designed to support CBSE, ICSE, and State Board arithmetic concepts so children feel confident during school tests.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progressive Level Table */}
            <div className="bg-white border-4 border-vibrant-dark p-6 md:p-8 rounded-[32px] shadow-[8px_8px_0_0_#1A2E35] space-y-4">
              <h3 className="font-display font-black text-lg text-vibrant-dark flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-vibrant-orange" />
                Curriculum Progression Structure
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Students advance systematically across structured levels based on personal mastery and evaluation.
              </p>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Junior Level (Foundation)</span>
                  <span className="text-slate-500 font-medium">Introduction to Beads, 1-Digit Addition</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Runner Levels 1–3</span>
                  <span className="text-slate-500 font-medium">Friendly Numbers, Big & Small Friends</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Runner Levels 4–6</span>
                  <span className="text-slate-500 font-medium">Multi-Digit Addition, Subtraction & Anzan</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Master Levels 7–8</span>
                  <span className="text-slate-500 font-medium">Multiplication, Division, Decimals & Speed Drills</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-[11px] text-amber-900 font-semibold">
                💡 Batch sizes are strictly kept small (personalized mentor ratio) to ensure Neha Ma'am can observe each child's counting mechanics directly.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Defensible Educational Outcomes */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Realistic Educational Growth
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark">
            What Outcomes Can Parents Reasonably Expect?
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            Progress depends on consistency, attendance, and regular 10–15 minute daily practice at home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🧠</span>
            <h4 className="font-bold text-sm text-vibrant-dark">Stronger Number Sense</h4>
            <p className="text-xs text-slate-600 font-medium">Children visualize numbers as concrete quantities rather than abstract, intimidating symbols.</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🖐️</span>
            <h4 className="font-bold text-sm text-vibrant-dark">Less Finger Counting</h4>
            <p className="text-xs text-slate-600 font-medium">Internal mental beads replace reliance on physical fingers for basic single and double digit sums.</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">⏱️</span>
            <h4 className="font-bold text-sm text-vibrant-dark">Sustained Focus Habits</h4>
            <p className="text-xs text-slate-600 font-medium">Timed speed exercises train children to sit attentively and maintain focus through academic tasks.</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">✨</span>
            <h4 className="font-bold text-sm text-vibrant-dark">Calm Math Confidence</h4>
            <p className="text-xs text-slate-600 font-medium">Celebrating small daily milestones builds academic self-esteem and reduces school test anxiety.</p>
          </div>
        </div>
      </section>

      {/* 6. Parent Questions / FAQ */}
      <section className="py-14 md:py-18 bg-slate-50 border-t-2 border-slate-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black text-vibrant-teal bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Frequently Asked Questions
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-vibrant-dark">
              Common Parent Questions on Abacus
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-orange shrink-0" />
                What is the ideal age to start Abacus classes?
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                The program welcomes children aged 4 to 14 years. The optimal foundation window is between 5 and 9 years, when children are developing concrete number concepts and neuroplasticity for visualization is high. If you are also exploring Vedic Maths for an older child, read our <Link to="/parent-guides/abacus-vs-vedic-maths" className="text-vibrant-orange font-bold hover:underline">Abacus vs Vedic Maths parent guide</Link>.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-orange shrink-0" />
                Will Abacus confuse my child's school math addition?
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                In practice, children learn to segment different calculation settings cleanly, using mental visualization alongside school column steps. For an in-depth breakdown of how both systems interact, read our guide on <Link to="/parent-guides/does-abacus-confuse-school-math" className="text-vibrant-orange font-bold hover:underline">whether abacus confuses school maths</Link>.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-orange shrink-0" />
                How much daily practice is expected at home?
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                We recommend 10 to 15 minutes of regular daily practice rather than marathon weekend sessions. Consistency helps children turn conscious bead calculations into subconscious visualization.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-orange shrink-0" />
                Are the trainers certified?
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                Yes. Classes are conducted under the leadership of Founder Neha Patil, who is a certified Master Trainer through IIVA (Indian Institute of Vedic Maths & Abacus).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified Trust & Location Context */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white border-4 border-vibrant-dark rounded-[32px] p-6 md:p-10 shadow-[8px_8px_0_0_#1A2E35] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] font-black text-vibrant-orange bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Verified Academy Trust
            </span>
            <h3 className="font-display font-black text-2xl text-vibrant-dark">
              Learn at an Award-Winning Wakad Academy
            </h3>
            <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
              Arnav Abacus Academy students have achieved top honors at international and state level competitions, including 1st Rank honors presented by Dr. Kiran Bedi. Founder Neha Patil provides direct, compassionate mentorship in every offline batch.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-vibrant-gold" /> IIVA Certified Mentors
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-vibrant-teal" /> 1:8 Small Batch Ratio
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Screen-Free Offline Classroom
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              to="/showcase"
              className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-5 py-3.5 rounded-2xl text-center shadow-md transition-all flex items-center justify-center gap-2"
            >
              View Student Showcase <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="bg-vibrant-cream hover:bg-white text-vibrant-dark border-2 border-vibrant-dark font-black text-xs uppercase px-5 py-3.5 rounded-2xl text-center shadow-sm transition-all"
            >
              Get Center Directions
            </Link>
          </div>

        </div>
      </section>

      {/* 8. Related Programs Navigation */}
      <section className="py-12 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-6">
          <h3 className="font-display font-black text-lg text-vibrant-dark">
            Explore Other Academy Learning Tracks
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold">
            <Link
              to="/programs/vedic-maths"
              className="bg-white border-2 border-slate-200 hover:border-vibrant-orange px-5 py-3 rounded-2xl text-vibrant-dark transition-all flex items-center gap-2 shadow-xs"
            >
              <span>Vedic Mathematics (Ages 10+)</span>
              <ArrowRight className="w-3.5 h-3.5 text-vibrant-orange" />
            </Link>
            <Link
              to="/programs/school-maths"
              className="bg-white border-2 border-slate-200 hover:border-vibrant-orange px-5 py-3 rounded-2xl text-vibrant-dark transition-all flex items-center gap-2 shadow-xs"
            >
              <span>School Maths & Olympiad Prep (Class 1–10)</span>
              <ArrowRight className="w-3.5 h-3.5 text-vibrant-orange" />
            </Link>
            <Link
              to="/programs"
              className="bg-slate-800 text-white hover:bg-slate-900 px-5 py-3 rounded-2xl transition-all flex items-center gap-2 shadow-xs"
            >
              <span>All Programs Overview</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
