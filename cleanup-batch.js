#!/usr/bin/env node
/**
 * EasyEnglish Batch Cleanup Script
 * Fixes 4 recurring patterns across all HTML files:
 * 1. Orphaned e.target.closest('.nav-drop') code
 * 2. Inline page-transition-js (common.js handles this)
 * 3. Duplicate speakTTS() definitions (move to common.js)
 * 4. Inline ee_streak logic (gamification.js handles this)
 */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const SKIP = ['cleanup-batch.js']; // don't process self
const LOG = [];

function log(file, pattern) {
  LOG.push(`  ✓ ${path.basename(file)} — ${pattern}`);
}

// Get all HTML files
const htmlFiles = fs.readdirSync(DIR)
  .filter(f => f.endsWith('.html') && !SKIP.includes(f))
  .map(f => path.join(DIR, f));

console.log(`\n🔍 Scanning ${htmlFiles.length} HTML files...\n`);

let totalFixes = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  const basename = path.basename(file);
  let fixes = [];

  // ═══════════════════════════════════════
  // FIX 1: Orphaned e.target.closest('.nav-drop')
  // Pattern: standalone line with e.target.closest outside any function
  // Variations found:
  //   if(!e.target.closest('.nav-drop')) document.querySelectorAll(...)
  //   });  ← trailing close that goes with it
  // ═══════════════════════════════════════
  
  // Pattern A: orphaned as standalone lines (outside addEventListener)
  // Match the orphaned code + its trailing });
  const orphanedPatterns = [
    // Variant 1: "  if(!e.target..." on its own line + next line ");"
    /\n\s*if\(!e\.target\.closest\('\.nav-drop'\)\)\s*document\.querySelectorAll\('\.nav-drop\.open'\)\.forEach\(d\s*=>\s*d\.classList\.remove\('open'\)\);\s*\n\}\);?\s*\n/g,
    // Variant 2: within a document.addEventListener('click',...) that ONLY contains this code
    /document\.addEventListener\('click',\s*function\(e\)\s*\{\s*\n\s*if\(!e\.target\.closest\('\.nav-drop'\)\)\s*document\.querySelectorAll\('\.nav-drop\.open'\)\.forEach\(d\s*=>\s*d\.classList\.remove\('open'\)\);\s*\n\s*\}\);?\s*\n/g,
  ];
  
  orphanedPatterns.forEach(pat => {
    if (pat.test(content)) {
      content = content.replace(pat, '\n');
      fixes.push('orphaned nav-drop');
    }
  });

  // Also catch the simpler inline version (no addEventListener wrapper)
  const simpleOrphan = /\n\s*if\(!e\.target\.closest\('\.nav-drop'\)\)\s*document\.querySelectorAll\('\.nav-drop\.open'\)\.forEach\([^)]+\);\s*\n/g;
  if (simpleOrphan.test(content)) {
    content = content.replace(simpleOrphan, '\n');
    // Also remove trailing }); if it's on the next line alone
    content = content.replace(/\n\s*\}\);\s*\n(\s*<\/script>)/g, '\n$1');
    if (!fixes.includes('orphaned nav-drop')) fixes.push('orphaned nav-drop');
  }

  // ═══════════════════════════════════════
  // FIX 2: Inline page-transition-js
  // common.js already handles page transitions
  // ═══════════════════════════════════════
  
  // Skip common.js reference (the one that says "removed" already)
  // Only remove the actual inline script block
  const pageTransitionRegex = /<script\s+id="page-transition-js">\s*\n?\s*\(function\(\)\{[\s\S]*?\}\)\(\);\s*\n?\s*<\/script>/g;
  if (pageTransitionRegex.test(content)) {
    content = content.replace(pageTransitionRegex, '<!-- page-transition: handled by common.js -->');
    fixes.push('inline page-transition-js');
  }

  // ═══════════════════════════════════════
  // FIX 3: Duplicate speakTTS() definitions
  // Should only exist in common.js (or 1 shared place)
  // Skip tu-dien.html (has its own speak system) and ngu-phap*.html (needs it inline for now since it's in <script> before common.js loads)
  // Actually, keep speakTTS in files that call it inline via onclick="speakTTS(...)"
  // but ensure common.js has it too
  // For now: just flag, don't remove (since speakTTS is called before common.js loads)
  // ═══════════════════════════════════════
  // Skip this fix for now — speakTTS is called synchronously in onclick handlers
  // before common.js (deferred) loads. Moving it would break TTS buttons.
  // TODO: Move to a non-deferred shared script in the future.

  // ═══════════════════════════════════════
  // FIX 4: Inline ee_streak logic
  // gamification.js handles streak tracking
  // ═══════════════════════════════════════
  
  // Match the streak block pattern
  const streakPatterns = [
    // Pattern: const today = ... let data = JSON.parse(localStorage.getItem('ee_streak')...
    /\/\/\s*(?:Update\s+)?streak[^\n]*\n\s*(?:const|let|var)\s+today\s*=\s*new\s+Date\(\)\.toDateString\(\);\s*\n[\s\S]*?localStorage\.setItem\('ee_streak',\s*JSON\.stringify\(data\)\);\s*\n\s*\}\s*\n/g,
    // Simpler: just the ee_streak block
    /(?:const|let|var)\s+today\s*=\s*new\s+Date\(\)\.toDateString\(\);\s*\n\s*(?:let|var|const)\s+data\s*=\s*JSON\.parse\(localStorage\.getItem\('ee_streak'\)[^;]*;\s*\n(?:.*\n)*?.*localStorage\.setItem\('ee_streak'[^;]*;\s*\n\s*\}\s*\n/g,
  ];

  streakPatterns.forEach(pat => {
    if (pat.test(content)) {
      content = content.replace(pat, '// streak: handled by gamification.js\n');
      fixes.push('inline streak logic');
    }
  });

  // ═══════════════════════════════════════
  // CLEANUP: Remove empty/orphaned }); lines that are left over
  // ═══════════════════════════════════════
  // After removing orphaned code, sometimes }); is left dangling
  // Only clean up if preceded by another }); or </script> or blank line
  
  // Write back if changed
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    fixes.forEach(f => log(file, f));
    totalFixes += fixes.length;
    console.log(`  ✅ ${basename}: ${fixes.join(', ')}`);
  }
});

// ═══════════════════════════════════════
// Ensure common.js has speakTTS
// ═══════════════════════════════════════
const commonPath = path.join(DIR, 'common.js');
if (fs.existsSync(commonPath)) {
  let common = fs.readFileSync(commonPath, 'utf8');
  if (!common.includes('function speakTTS')) {
    const ttsCode = `
// ===== Shared TTS =====
function speakTTS(text) {
  speechSynthesis.cancel();
  var u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.85;
  speechSynthesis.speak(u);
}
`;
    common += ttsCode;
    fs.writeFileSync(commonPath, common, 'utf8');
    console.log(`  ✅ common.js: added shared speakTTS()`);
    totalFixes++;
  }
}

console.log(`\n═══════════════════════════════════`);
console.log(`✅ Done! ${totalFixes} fixes applied across ${htmlFiles.length} files.`);
console.log(`═══════════════════════════════════\n`);

if (LOG.length) {
  console.log('Details:');
  LOG.forEach(l => console.log(l));
}
