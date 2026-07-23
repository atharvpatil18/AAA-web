/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Security & Anti-Vulgarity / Anti-Spam / Anti-XSS Input Validation Engine
 * Arnav Abacus Academy & Vedic Maths
 */

// Comprehensive Profanity & Vulgarity dictionary (English, Hinglish, & Leetspeak variations)
const VULGAR_PROFANITY_PATTERNS = [
  // Obscene / Vulgar English Terms & Leetspeak
  /\b(fuck|f\*ck|fck|fuk|fukin|fucking|fucker|motherfucker|mf)\b/i,
  /\b(shit|sh\*t|sht|bullshit|bullsh\*t)\b/i,
  /\b(bitch|b\*tch|btch|bitches)\b/i,
  /\b(bastard|b\*stard)\b/i,
  /\b(asshole|a\*\*hole|ass|asswipe)\b/i,
  /\b(dick|d\*ck|penis|cock|c\*ck|clit|cunt|c\*nt)\b/i,
  /\b(pussy|p\*ssy|vagina|boobs|tits)\b/i,
  /\b(whore|slut|sl\*t|prostitute|prosti)\b/i,
  /\b(nigger|n\*gger|nigga|faggot|f\*ggot)\b/i,
  /\b(porn|porno|xx|xxx|sex|pornography|nude|naked)\b/i,

  // Vulgar & Offensive Hinglish / Indian Abusive Slang
  /\b(madarchod|madarch*d|mc|bc|bhenchod|bhench*d|bhosdike|bhosdi|bhosdika)\b/i,
  /\b(chutiya|chut|ch*tiya|choot|chutiye|chutiyapa)\b/i,
  /\b(gaand|gand|gandu|g*nd|g*ndu)\b/i,
  /\b(lauda|loda|laund|lund|l*nd|lode|lodhu)\b/i,
  /\b(harami|haramzada|kamina|saala|sale|kamine)\b/i,
  /\b(randi|r*ndi|randwa)\b/i,
  /\b(hijra|chakka)\b/i,
  /\b(terimaa|teribhen)\b/i,
];

// Keyboard Mashing & Dummy Content Patterns
const KEYBOARD_MASH_PATTERNS = [
  /qwerty/i,
  /asdfgh/i,
  /zxcvbn/i,
  /poiuyt/i,
  /lkjhgf/i,
  /mnbvcxz/i,
  /123456/i,
  /abc123/i,
  /test123 test123/i,
  /junkjunk/i,
  /dummy text/i,
];

// Blocklist of dummy & fake email domains/prefixes
const DUMMY_EMAIL_PREFIXES = [
  "test", "testing", "asdf", "qwerty", "fake", "dummy", "sample", "temp", "aaa", "bbb",
  "xxx", "xyz", "abcd", "admin", "null", "none", "noemail", "junk", "mail", "email"
];

const DUMMY_EMAIL_DOMAINS = [
  "test.com", "example.com", "fake.com", "dummy.com", "temp.com", "asdf.com",
  "qwerty.com", "aaa.com", "bbb.com", "xxx.com", "xyz.com", "sample.com",
  "mail.com", "email.com", "no.com", "invalid.com", "trashmail.com", "dispostable.com"
];

/**
 * Strips HTML tags, script execution attributes, SQL injection signatures, and dangerous characters.
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";
  let clean = input.trim();
  
  // Remove HTML tags & script tags
  clean = clean.replace(/<[^>]*>?/gm, "");
  
  // Neutralize script execution prefixes
  clean = clean.replace(/(javascript:|vbscript:|data:|onload=|onerror=|onclick=|onmouseover=)/gi, "");
  
  // Neutralize common SQL Injection patterns
  clean = clean.replace(/(\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION|ALTER|CREATE|EXEC)\b|--|\/\*|\*\/|;)/gi, "");

  return clean;
}

/**
 * Checks if the text contains vulgarity, profanity, or offensive slangs.
 */
export function containsProfanityOrVulgarity(text: string): boolean {
  if (!text) return false;
  const clean = text.toLowerCase().trim();
  
  for (const pattern of VULGAR_PROFANITY_PATTERNS) {
    if (pattern.test(clean)) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if text is random keyboard mashing, repeated characters, or dummy junk.
 */
export function isJunkOrGibberish(text: string): boolean {
  if (!text) return true;
  const clean = text.trim();

  // Too short
  if (clean.length < 2) return true;

  // Repetitive identical characters e.g. "aaaaaa", "!!!!!!", "111111"
  if (/(.)\1{4,}/i.test(clean)) return true;

  // Keyboard mashing patterns
  for (const pattern of KEYBOARD_MASH_PATTERNS) {
    if (pattern.test(clean)) return true;
  }

  // Must contain at least some alphabetic or alphanumeric characters
  const hasLetters = /[a-zA-Z0-9\u0900-\u097F]/;
  if (!hasLetters.test(clean)) return true;

  return false;
}

/**
 * Validates candidate / student name for real human names.
 */
export function validateSanitizedName(name: string): { valid: boolean; sanitized: string; error?: string } {
  const sanitized = sanitizeInput(name);

  if (!sanitized || sanitized.length < 2) {
    return { valid: false, sanitized: "", error: "Please enter a valid name (minimum 2 letters)." };
  }

  if (sanitized.length > 60) {
    return { valid: false, sanitized: "", error: "Name is too long (maximum 60 characters)." };
  }

  if (containsProfanityOrVulgarity(sanitized)) {
    return { valid: false, sanitized: "", error: "Inappropriate or vulgar language detected in name. Please use your real name." };
  }

  if (isJunkOrGibberish(sanitized)) {
    return { valid: false, sanitized: "", error: "Please enter a genuine student/parent name (no random characters or keyboard mashing)." };
  }

  // Ensure name only contains letters, spaces, dots, hyphens
  const validNameRegex = /^[a-zA-Z\u0900-\u097F\s\.\-']{2,60}$/;
  if (!validNameRegex.test(sanitized)) {
    return { valid: false, sanitized: "", error: "Name can only contain letters, spaces, dots, or hyphens." };
  }

  return { valid: true, sanitized };
}

/**
 * Validates candidate / student email address against dummy emails, junk prefixes, and format errors.
 */
export function validateSanitizedEmail(email: string): { valid: boolean; sanitized: string; error?: string } {
  const sanitized = sanitizeInput(email).toLowerCase();

  if (!sanitized || !sanitized.includes("@")) {
    return { valid: false, sanitized: "", error: "Please enter a valid email address (e.g. name@gmail.com)." };
  }

  // Standard email format regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(sanitized)) {
    return { valid: false, sanitized: "", error: "Please enter a valid email format (e.g. student@gmail.com)." };
  }

  const [prefix, domain] = sanitized.split("@");

  if (containsProfanityOrVulgarity(sanitized)) {
    return { valid: false, sanitized: "", error: "Inappropriate or profane email address detected." };
  }

  if (DUMMY_EMAIL_DOMAINS.includes(domain)) {
    return { valid: false, sanitized: "", error: `Please use your real personal/work email address (dummy domains like ${domain} are not accepted).` };
  }

  if (DUMMY_EMAIL_PREFIXES.includes(prefix) || prefix.length < 2) {
    return { valid: false, sanitized: "", error: "Please enter a valid personal email address (dummy test prefixes are blocked)." };
  }

  if (isJunkOrGibberish(prefix)) {
    return { valid: false, sanitized: "", error: "Please enter a genuine email address (random keyboard mashing detected)." };
  }

  return { valid: true, sanitized };
}

/**
 * Validates candidate / visitor message & feedback inputs.
 */
export function validateSanitizedMessage(message: string): { valid: boolean; sanitized: string; error?: string } {
  const sanitized = sanitizeInput(message);

  if (!sanitized || sanitized.length < 3) {
    return { valid: false, sanitized: "", error: "Please enter a message or feedback (minimum 3 characters)." };
  }

  if (sanitized.length > 1000) {
    return { valid: false, sanitized: "", error: "Message is too long (maximum 1000 characters)." };
  }

  if (containsProfanityOrVulgarity(sanitized)) {
    return { valid: false, sanitized: "", error: "Inappropriate, vulgar, or offensive language detected. Please keep your feedback professional and respectful." };
  }

  if (isJunkOrGibberish(sanitized)) {
    return { valid: false, sanitized: "", error: "Please enter meaningful feedback or questions (random keyboard mashing detected)." };
  }

  return { valid: true, sanitized };
}
