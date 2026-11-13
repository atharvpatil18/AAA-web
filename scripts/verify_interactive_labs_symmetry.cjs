/**
 * Automated Verification Script: Batch 4 Interactive Learning Labs Translation Symmetry
 */
const fs = require('fs');
const path = require('path');

function extractKeys(filePath, exportName) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = new RegExp(`export const ${exportName}[^=]*= {([\\s\\S]*?)};`);
  const match = content.match(regex);
  if (!match) throw new Error(`Could not find ${exportName} in ${filePath}`);
  
  const body = match[1];
  const keys = [];
  const lineRegex = /^\s*([a-zA-Z0-9_]+):/gm;
  let lineMatch;
  while ((lineMatch = lineRegex.exec(body)) !== null) {
    keys.push(lineMatch[1]);
  }
  return keys;
}

const files = [
  { file: 'src/lib/translations_lab_abacus.ts', en: 'labAbacusEn', hi: 'labAbacusHi', mr: 'labAbacusMr' },
  { file: 'src/lib/translations_lab_vedic.ts', en: 'labVedicEn', hi: 'labVedicHi', mr: 'labVedicMr' },
  { file: 'src/lib/translations_lab_speed.ts', en: 'labSpeedEn', hi: 'labSpeedHi', mr: 'labSpeedMr' },
];

let allPassed = true;
let totalKeys = 0;

for (const { file, en, hi, mr } of files) {
  const filePath = path.resolve(__dirname, '..', file);
  const enKeys = extractKeys(filePath, en);
  const hiKeys = extractKeys(filePath, hi);
  const mrKeys = extractKeys(filePath, mr);

  console.log(`Checking ${file}: EN=${enKeys.length}, HI=${hiKeys.length}, MR=${mrKeys.length}`);
  totalKeys += enKeys.length;

  const missingInHi = enKeys.filter(k => !hiKeys.includes(k));
  const missingInMr = enKeys.filter(k => !mrKeys.includes(k));
  const extraInHi = hiKeys.filter(k => !enKeys.includes(k));
  const extraInMr = mrKeys.filter(k => !enKeys.includes(k));

  if (missingInHi.length || missingInMr.length || extraInHi.length || extraInMr.length) {
    console.error(`Symmetry failed in ${file}!`);
    if (missingInHi.length) console.error(`Missing in HI:`, missingInHi);
    if (missingInMr.length) console.error(`Missing in MR:`, missingInMr);
    if (extraInHi.length) console.error(`Extra in HI:`, extraInHi);
    if (extraInMr.length) console.error(`Extra in MR:`, extraInMr);
    allPassed = false;
  }
}

if (allPassed) {
  console.log(`\nALL BATCH 4 INTERACTIVE LABS TRANSLATIONS 100% SYMMETRICAL! (${totalKeys} keys per language)`);
  process.exit(0);
} else {
  process.exit(1);
}
