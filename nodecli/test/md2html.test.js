const assert = require('assert');
const fs = require('fs');
const path = require('path');
const md2html = require('../md2html');

const relativePath = (p) => path.resolve(__dirname, p);
const readFileSync = (p) => fs.readFileSync(relativePath(p), { encoding: 'utf-8' });

it('converts Markdown to HTML (GFM = false)', () => {
  const sample = readFileSync('./fixtures/sample.md');
  const expected = readFileSync('./fixtures/expected.html');
  assert.strictEqual(md2html(sample, { gfm: false }).trimEnd(), expected.trimEnd());
});

it('converts Markdown to HTML (GFM = true)', () => {
  const sample = readFileSync('./fixtures/sample.md');
  const expected = readFileSync('./fixtures/expected.gfm.html');
  assert.strictEqual(md2html(sample, { gfm: true }).trimEnd(), expected.trimEnd());
});
