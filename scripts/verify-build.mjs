// ============================================================
// verify-build.mjs — post-build smoke test
// Run with: npm run check   (after a fresh `npm run build`)
// Fails (non-zero exit) on any missing marker or broken asset.
// ============================================================

import { readFile, access } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist', import.meta.url));
const errors = [];

const run = (name, fn) =>
  Promise.resolve()
    .then(fn)
    .then(() => console.log(`  OK   ${name}`))
    .catch((err) => {
      errors.push(name);
      console.error(`  FAIL ${name}  -> ${err.message}`);
    });

const mustExist = (rel) =>
  access(join(dist, rel)).then(
    () => {},
    () => {
      throw new Error(`missing file: ${rel}`);
    }
  );

const bundleFirst = (ext) =>
  readdir(join(dist, 'assets')).then((names) => {
    const hit = names.find((n) => n.startsWith('index-') && n.endsWith(ext));
    if (!hit) throw new Error(`no index bundle with ext ${ext}`);
    return hit;
  });

const main = async () => {
  const html = await readFile(join(dist, 'index.html'), 'utf8');
  const cssFile = await bundleFirst('.css');
  const jsFile = await bundleFirst('.js');
  const css = await readFile(join(dist, 'assets', cssFile), 'utf8');
  const js = await readFile(join(dist, 'assets', jsFile), 'utf8');

  // Static HTML markers (elements that JS depends on / wires up).
  const htmlMarkers = [
    'id="preloader"',
    'id="hero-canvas"',
    'id="activity-filters"',
    'id="events-wrap"',
    'id="scrollProgress"',
    'id="countdownWrap"',
    'id="toastContainer"',
    'id="stepProgressBar"',
    'id="interestsError"',
    'class="skip-link"',
    'id="contactForm"',
    'href="./site.webmanifest"',
  ];
  for (const m of htmlMarkers) {
    await run(`html has ${m.replace(/"$/, '')}"`, () => {
      if (!html.includes(m)) throw new Error(`marker not found: ${m}`);
    });
  }

  // New styles actually compiled into the CSS bundle.
  const cssMarkers = [
    '.countdown-banner',
    '.countdown-box',
    '.toast-card',
    '.step-progress-bar',
    '.skip-link',
    '.section-title:after',
    '.step-progress-label',
  ];
  for (const m of cssMarkers) {
    await run(`css has ${m}`, () => {
      if (!css.includes(m)) throw new Error(`style not found: ${m}`);
    });
  }

  // Data/config strings bundled into the JS (stats, countdown, forms).
  const jsMarkers = [
    'Smart University Hackathon',
    'Flagship Activities',
    'Open to Every Student',
    'formspree.io',
    'subic_membership_draft',
    'stepProgressBar',
  ];
  for (const m of jsMarkers) {
    await run(`js has "${m}"`, () => {
      if (!js.includes(m)) throw new Error(`string not in bundle: ${m}`);
    });
  }

  // Static assets copied from public/.
  for (const a of ['sub-logo.jpg', 'site.webmanifest']) {
    await run(`dist has ${a}`, () => mustExist(a));
  }

  // Every local asset referenced by the built HTML must resolve.
  const localRefs = [...html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)].map((m) => m[1]);
  for (const ref of localRefs) {
    await run(`asset resolves: ${ref}`, () => mustExist(ref));
  }

  // No raw module sources leaking into the build.
  await run('no absolute /src refs', () => {
    if (/(?:src|href)="\/src\//.test(html)) throw new Error('absolute /src reference leaked');
  });

  if (errors.length) {
    console.error(`\nverify-build failed: ${errors.length} check(s) failed`);
    process.exit(1);
  }
  console.log('\nverify-build passed - dist looks healthy.');
};

main().catch((err) => {
  console.error('verify-build crashed:', err.message);
  process.exit(1);
});