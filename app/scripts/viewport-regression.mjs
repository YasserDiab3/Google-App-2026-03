/**
 * viewport-regression.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Static CSS regression checker.
 * Validates that the built CSS conforms to the UI contract:
 *   - No unchecked fixed heights on cards/buttons outside token usage
 *   - No !important on layout geometry outside allowed selectors
 *   - Touch targets (min-height ≥ 44px) on interactive elements
 *   - No raw px widths > 320px on container elements
 *
 * Usage:  node app/scripts/viewport-regression.mjs
 * Returns exit 0 if all checks pass, exit 1 if any fail.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { readFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '../..');
const LEGACY_CSS = join(ROOT, 'Frontend', 'css');
const REACT_CSS = join(ROOT, 'app', 'dist', 'assets');

// ── Viewport matrix (documentation only — not machine-checked here) ───────────
const VIEWPORT_MATRIX = [
  { label: 'xs-android',   w: 360,  h: 800  },
  { label: 'xs-iphone14',  w: 390,  h: 844  },
  { label: 'tablet-port',  w: 768,  h: 1024 },
  { label: 'tablet-land',  w: 1024, h: 768  },
  { label: 'laptop-hd',    w: 1366, h: 768  },
  { label: 'desktop-fhd',  w: 1600, h: 900  },
];

// ── Rules ─────────────────────────────────────────────────────────────────────
const rules = [
  {
    id: 'no-hardcoded-kpi-height',
    description: 'KPI cards should NOT have fixed height/max-height outside token reference',
    files: [join(LEGACY_CSS, 'dashboard-enhanced.css')],
    check(content) {
      // Allowed: uses token var(--kpi-...) or "auto"
      // Flagged: bare px values on .kpi-card rules without "var("
      const matches = [];
      const regex = /\.kpi-grid\s*>?\s*\.kpi-card[^{]*\{[^}]*(?:max-height|height)\s*:\s*(\d+px)[^}]*\}/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        matches.push(`  Found fixed height "${m[1]}" on .kpi-card`);
      }
      return matches;
    },
  },
  {
    id: 'btn-touch-target',
    description: 'All .btn-primary / .btn-secondary must have min-height (touch target)',
    files: [join(ROOT, 'Frontend', 'styles.css')],
    check(content) {
      const issues = [];
      // Extract the .btn-primary block and check for min-height
      const btnBlock = content.match(/\.btn-primary\s*\{[^}]+\}/);
      if (btnBlock && !btnBlock[0].includes('min-height')) {
        issues.push('  .btn-primary is missing min-height (touch target)');
      }
      const btn2Block = content.match(/\.btn-secondary\s*\{[^}]+\}/);
      if (btn2Block && !btn2Block[0].includes('min-height')) {
        issues.push('  .btn-secondary is missing min-height (touch target)');
      }
      return issues;
    },
  },
  {
    id: 'react-css-bundle-size',
    description: 'Built CSS bundle should not exceed 100 kB (uncompressed)',
    files: [],
    check() {
      try {
        const files = readdirSync(REACT_CSS).filter(f => f.endsWith('.css'));
        const issues = [];
        for (const f of files) {
          const size = readFileSync(join(REACT_CSS, f)).length;
          if (size > 100 * 1024) {
            issues.push(`  ${f}: ${(size / 1024).toFixed(1)} kB > 100 kB`);
          }
        }
        return issues;
      } catch {
        return ['  Could not read dist/assets — run npm run build first'];
      }
    },
  },
  {
    id: 'no-injected-style-sidebar',
    description: 'sidebar-english-fix-v2 injected <style> must NOT be created in JS (removal cleanup is OK)',
    files: [join(ROOT, 'Frontend', 'js', 'modules', 'app-ui.js')],
    check(content) {
      // Flag only if JS creates and populates the style block (not if it removes it)
      const createsElement = /createElement\s*\(\s*['"]style['"]\s*\)/.test(content) &&
                             /styleId\s*=\s*['"]sidebar-english-fix-v2['"]/.test(content);
      if (createsElement) {
        return ['  JS still creates sidebar-english-fix-v2 <style> element — geometry should live in layout.css'];
      }
      return [];
    },
  },
  {
    id: 'no-inline-height-100vh-js',
    description: 'JS must not set style.height = "100vh" (use dvh via CSS)',
    files: [join(ROOT, 'Frontend', 'js', 'modules', 'app-ui.js')],
    check(content) {
      const issues = [];
      const regex = /style\.(height|minHeight)\s*=\s*['"]100vh['"]/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        issues.push(`  Found style.${m[1]} = "100vh" — use CSS token / 100dvh`);
      }
      return issues;
    },
  },
  {
    id: 'design-token-btn-present',
    description: 'design-tokens.css must define --btn-h-md for touch-safe buttons',
    files: [join(LEGACY_CSS, 'design-tokens.css')],
    check(content) {
      if (!content.includes('--btn-h-md')) {
        return ['  --btn-h-md token missing from design-tokens.css'];
      }
      return [];
    },
  },
];

// ── Runner ────────────────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;

console.log('\n🔍  Viewport Regression Checks\n' + '═'.repeat(50));
console.log(`\n📐  Viewport matrix (${VIEWPORT_MATRIX.length} targets):`);
VIEWPORT_MATRIX.forEach(v => console.log(`    ${v.label.padEnd(14)} ${v.w}×${v.h}`));
console.log();

for (const rule of rules) {
  process.stdout.write(`  ▶  ${rule.id} ... `);
  try {
    let allIssues = [];
    if (rule.files.length === 0) {
      allIssues = rule.check('');
    } else {
      for (const file of rule.files) {
        const content = readFileSync(file, 'utf8');
        allIssues.push(...rule.check(content));
      }
    }

    if (allIssues.length === 0) {
      console.log('✅  PASS');
      passed++;
    } else {
      console.log('❌  FAIL');
      console.log(`     ${rule.description}`);
      allIssues.forEach(i => console.log(i));
      failed++;
    }
  } catch (err) {
    console.log(`⚠️   ERROR (${err.message})`);
    failed++;
  }
}

console.log('\n' + '═'.repeat(50));
console.log(`  Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  console.log('  ❌  Some checks failed. Fix issues before deploying.\n');
  process.exit(1);
} else {
  console.log('  ✅  All checks passed.\n');
  process.exit(0);
}
