const fs = require('fs');
const path = require('path');

// Read translations_supporting_pages.ts
const filePath = path.join(__dirname, '..', 'src', 'lib', 'translations_supporting_pages.ts');
const content = fs.readFileSync(filePath, 'utf8');

function extractKeys(varName) {
  const regex = new RegExp(`export const ${varName}: Record<string, string> = {([\\s\\S]*?)};`);
  const match = content.match(regex);
  if (!match) throw new Error(`Could not find ${varName}`);
  const block = match[1];
  const keys = [];
  const lineRegex = /^\s*([a-zA-Z0-9_]+)\s*:/gm;
  let m;
  while ((m = lineRegex.exec(block)) !== null) {
    keys.push(m[1]);
  }
  return keys;
}

const enKeys = extractKeys('supportingPagesEn');
const hiKeys = extractKeys('supportingPagesHi');
const mrKeys = extractKeys('supportingPagesMr');

console.log(`\n=== Batch 6 Supporting Pages Translations Symmetry Check ===`);
console.log(`EN Keys: ${enKeys.length}`);
console.log(`HI Keys: ${hiKeys.length}`);
console.log(`MR Keys: ${mrKeys.length}`);

let hasErrors = false;

// Check duplicates
function checkDuplicates(keys, lang) {
  const seen = new Set();
  const dupes = [];
  for (const k of keys) {
    if (seen.has(k)) dupes.push(k);
    seen.add(k);
  }
  if (dupes.length > 0) {
    console.error(`[FAIL] Duplicates found in ${lang}:`, dupes);
    hasErrors = true;
  }
}
checkDuplicates(enKeys, 'EN');
checkDuplicates(hiKeys, 'HI');
checkDuplicates(mrKeys, 'MR');

// Check missing in HI
const missingInHi = enKeys.filter(k => !hiKeys.includes(k));
if (missingInHi.length > 0) {
  console.error(`[FAIL] Missing in HI:`, missingInHi);
  hasErrors = true;
}

// Check missing in MR
const missingInMr = enKeys.filter(k => !mrKeys.includes(k));
if (missingInMr.length > 0) {
  console.error(`[FAIL] Missing in MR:`, missingInMr);
  hasErrors = true;
}

// Check extra in HI
const extraInHi = hiKeys.filter(k => !enKeys.includes(k));
if (extraInHi.length > 0) {
  console.error(`[FAIL] Extra in HI:`, extraInHi);
  hasErrors = true;
}

// Check extra in MR
const extraInMr = mrKeys.filter(k => !enKeys.includes(k));
if (extraInMr.length > 0) {
  console.error(`[FAIL] Extra in MR:`, extraInMr);
  hasErrors = true;
}

if (!hasErrors && enKeys.length === hiKeys.length && hiKeys.length === mrKeys.length) {
  console.log(`[PASS] 100% Dictionary Symmetry Confirmed across EN, HI, MR! (${enKeys.length} keys each)\n`);
  process.exit(0);
} else {
  console.error(`[FAIL] Dictionary asymmetry detected!\n`);
  process.exit(1);
}
