import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('dist');
const sitemap = await readFile(path.join(output, 'sitemap-0.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
assert.equal(new Set(urls).size, urls.length, 'Sitemap contains duplicate URLs');
const canonicalOf = (html) => html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
for (const url of urls) {
  const pathname = decodeURIComponent(new URL(url).pathname);
  const html = await readFile(path.join(output, pathname, 'index.html'), 'utf8');
  assert(!/http-equiv="refresh"/.test(html), `Redirect in sitemap: ${url}`);
  assert.equal(canonicalOf(html), url, `Canonical differs from sitemap: ${url}`);
}
let redirects = 0;
for (const directory of ['projects', 'project']) {
  for (const entry of await readdir(path.join(output, directory), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const html = await readFile(path.join(output, directory, entry.name, 'index.html'), 'utf8');
    if (!/http-equiv="refresh"/.test(html)) continue;
    redirects++;
    const canonical = canonicalOf(html);
    assert(canonical, `Redirect lacks canonical: ${directory}/${entry.name}`);
    assert(urls.includes(canonical), `Redirect target absent from sitemap: ${canonical}`);
    assert(!urls.some((url) => new URL(url).pathname === `/${directory}/${entry.name}/`), 'Alias in sitemap');
    assert(/name="robots" content="noindex"/.test(html), 'Redirect must be noindex');
  }
}
assert(redirects > 0, 'Expected project alias redirects');
console.log(`SEO checks passed: ${urls.length} sitemap URLs, ${redirects} project redirects.`);
