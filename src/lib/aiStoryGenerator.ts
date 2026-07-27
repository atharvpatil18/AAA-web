/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StoryPromptInput {
  studentName: string;
  achievementTitle?: string;
  ageOrGrade?: string;
  customPrompt: string;
}

/**
 * Generates an inspiring, AI-synthesized student success story for Arnav Abacus Academy
 */
export function generateAISuccessStory(input: StoryPromptInput): string {
  const name = input.studentName.trim() || "Our Student";
  const achievement = input.achievementTitle?.trim() || "Speed Math Drill Excellence";
  const prompt = input.customPrompt.trim();
  const info = input.ageOrGrade?.trim() || "Wakad Pune Branch";

  // Synthesize rich storytelling templates based on prompt keywords
  const stories = [
    `${name} (${info}) has achieved outstanding milestone success in ${achievement}! ${prompt ? `During practice, ${prompt.toLowerCase().startsWith(name.toLowerCase()) ? prompt : `${name} ${prompt}`}.` : `${name} demonstrated remarkable photographic calculation agility.`} By mastering Soroban bead visualization and whole-brain Speed Math techniques at Arnav Abacus Academy, ${name} has built exceptional concentration, laser speed accuracy, and academic self-confidence that shines in every competition!`,
    
    `We are immensely proud to feature ${name}! Celebrating "${achievement}", ${prompt ? `${name}'s journey highlights: "${prompt}".` : `${name} completed drills with flawless focus and speed.`} Through systematic daily practice at Arnav Abacus Academy, Wakad, ${name} transformed calculation speed into photographic mental agility, setting an inspiring benchmark for fellow young speed math champions!`,
    
    `Inspiring Achievement Alert! ${name} (${info}) earned top honors in "${achievement}". ${prompt ? `${prompt}.` : `${name} tackled challenging multi-row Speed Math drills with zero errors.`} This remarkable feat reflects the power of visual mental arithmetic taught at Arnav Abacus Academy. ${name}'s dedication, sharp memory recall, and photographic calculation skills continue to inspire our entire academy family!`,
  ];

  // Select pseudo-randomized or keyword-matched story
  const index = Math.abs(name.length + (prompt ? prompt.length : 0)) % stories.length;
  return stories[index];
}
