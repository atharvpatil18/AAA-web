const fs = require('fs');
const path = require('path');

function extractExportKeys(filePath, exportName) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = new RegExp(`export const ${exportName}[^=]*= {([\\s\\S]*?)};`, 'm');
  const match = content.match(regex);
  if (!match) {
    throw new Error(`Could not find ${exportName} in ${filePath}`);
  }
  const body = match[1];
  const keys = [];
  const lineRegex = /^\s*([a-zA-Z0-9_]+):/gm;
  let lineMatch;
  while ((lineMatch = lineRegex.exec(body)) !== null) {
    keys.push(lineMatch[1]);
  }
  return keys;
}

const blogPath = path.join(__dirname, '..', 'src', 'lib', 'translations_blog.ts');

const enKeys = extractExportKeys(blogPath, 'blogEn');
const hiKeys = extractExportKeys(blogPath, 'blogHi');
const mrKeys = extractExportKeys(blogPath, 'blogMr');

console.log(`Checking translations_blog.ts: EN=${enKeys.length}, HI=${hiKeys.length}, MR=${mrKeys.length}`);

let hasErrors = false;

// Check EN vs HI
const missingInHi = enKeys.filter(k => !hiKeys.includes(k));
const extraInHi = hiKeys.filter(k => !enKeys.includes(k));
if (missingInHi.length > 0) {
  console.error(`Missing in blogHi:`, missingInHi);
  hasErrors = true;
}
if (extraInHi.length > 0) {
  console.error(`Extra in blogHi:`, extraInHi);
  hasErrors = true;
}

// Check EN vs MR
const missingInMr = enKeys.filter(k => !mrKeys.includes(k));
const extraInMr = mrKeys.filter(k => !enKeys.includes(k));
if (missingInMr.length > 0) {
  console.error(`Missing in blogMr:`, missingInMr);
  hasErrors = true;
}
if (extraInMr.length > 0) {
  console.error(`Extra in blogMr:`, extraInMr);
  hasErrors = true;
}

if (!hasErrors) {
  console.log(`\nALL BATCH 5 BLOG TRANSLATIONS 100% SYMMETRICAL! (${enKeys.length} keys per language)`);
  process.exit(0);
} else {
  process.exit(1);
}
