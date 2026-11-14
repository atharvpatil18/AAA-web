const fs = require('fs');
const path = require('path');

function extractObjectKeys(content, objectName) {
  // Find "en: {" or "hi: {" or "mr: {"
  const startIdx = content.indexOf(`${objectName}: {`);
  if (startIdx === -1) throw new Error(`Could not find ${objectName}: {`);
  
  // Find closing bracket corresponding to this object
  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }
  
  const block = content.slice(startIdx, endIdx);
  const keys = [];
  const lineRegex = /^\s*([a-zA-Z0-9_]+)\s*:/gm;
  let m;
  while ((m = lineRegex.exec(block)) !== null) {
    if (m[1] !== objectName) {
      keys.push(m[1]);
    }
  }
  return keys;
}

const transFile = path.join(__dirname, '..', 'src', 'lib', 'translations.ts');
const content = fs.readFileSync(transFile, 'utf8');

const enKeys = extractObjectKeys(content, 'en');
const hiKeys = extractObjectKeys(content, 'hi');
const mrKeys = extractObjectKeys(content, 'mr');

console.log('Direct translations.ts keys count:');
console.log('en:', enKeys.length);
console.log('hi:', hiKeys.length);
console.log('mr:', mrKeys.length);

const missingInHi = enKeys.filter(k => !hiKeys.includes(k));
const missingInMr = enKeys.filter(k => !mrKeys.includes(k));
if (missingInHi.length > 0) console.error('Missing in HI direct:', missingInHi);
if (missingInMr.length > 0) console.error('Missing in MR direct:', missingInMr);

if (missingInHi.length === 0 && missingInMr.length === 0 && enKeys.length === hiKeys.length && hiKeys.length === mrKeys.length) {
  console.log('[PASS] Global direct keys 100% symmetrical!');
} else {
  console.error('[FAIL] Global direct keys asymmetrical!');
  process.exit(1);
}
