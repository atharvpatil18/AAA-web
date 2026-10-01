/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

export interface StoryPromptInput {
  studentName: string;
  achievementTitle?: string;
  ageOrGrade?: string;
  customPrompt: string;
}

/**
 * Fallback deterministic template generator
 */
function generateTemplateStory(input: StoryPromptInput): string {
  const name = input.studentName.trim() || "Our Student";
  const achievement = input.achievementTitle?.trim() || "Speed Math Drill Excellence";
  const prompt = input.customPrompt.trim();
  const info = input.ageOrGrade?.trim() || "Wakad Pune Branch";

  const stories = [
    `${name} (${info}) has achieved outstanding milestone success in ${achievement}! ${prompt ? `During practice, ${prompt.toLowerCase().startsWith(name.toLowerCase()) ? prompt : `${name} ${prompt}`}.` : `${name} demonstrated remarkable photographic calculation agility.`} By mastering Soroban bead visualization and whole-brain Speed Math techniques at Arnav Abacus Academy, ${name} has built exceptional concentration, laser speed accuracy, and academic self-confidence that shines in every competition!`,
    
    `We are immensely proud to feature ${name}! Celebrating "${achievement}", ${prompt ? `${name}'s journey highlights: "${prompt}".` : `${name} completed drills with flawless focus and speed.`} Through systematic daily practice at Arnav Abacus Academy, Wakad, ${name} transformed calculation speed into photographic mental agility, setting an inspiring benchmark for fellow young speed math champions!`,
    
    `Inspiring Achievement Alert! ${name} (${info}) earned top honors in "${achievement}". ${prompt ? `${prompt}.` : `${name} tackled challenging multi-row Speed Math drills with zero errors.`} This remarkable feat reflects the power of visual mental arithmetic taught at Arnav Abacus Academy. ${name}'s dedication, sharp memory recall, and photographic calculation skills continue to inspire our entire academy family!`,
  ];

  const index = Math.abs(name.length + (prompt ? prompt.length : 0)) % stories.length;
  return stories[index];
}

/**
 * Generates an inspiring, AI-synthesized student success story for Arnav Abacus Academy.
 * Utilizes the Google Gen AI SDK (Gemini 2.5 Flash) when VITE_GEMINI_API_KEY is available,
 * and gracefully falls back to structured academy narrative templates.
 */
export async function generateAISuccessStory(input: StoryPromptInput): Promise<string> {
  const apiKey = ((import.meta as any).env?.VITE_GEMINI_API_KEY as string) || "";

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the lead academic mentor at Arnav Abacus Academy & Vedic Maths Classes in Wakad, Pune.
Write an authentic, highly encouraging 3-4 sentence achievement story celebrating student success.
Student: ${input.studentName}
Achievement: ${input.achievementTitle || "Mental Math Milestones"}
Details: ${input.ageOrGrade || "Wakad Pune Center"}
Context / Milestone: ${input.customPrompt}

Highlight mental visualization, focus, eliminating finger counting, and speed agility. Do not use hyperbolic clichés. Keep it inspiring and parent-friendly.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      if (response && response.text) {
        return response.text.trim();
      }
    } catch (error) {
      console.warn("Gemini AI story synthesis notice, using template fallback:", error);
    }
  }

  return generateTemplateStory(input);
}
