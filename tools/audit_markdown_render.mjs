import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let marked;
try {
  ({ marked } = require("marked"));
} catch {
  const bundledMarked = path.join(
    process.env.USERPROFILE ?? "",
    ".cache",
    "codex-runtimes",
    "codex-primary-runtime",
    "dependencies",
    "node",
    "node_modules",
    "marked",
  );
  ({ marked } = require(bundledMarked));
}

const wikiDir = path.resolve("Wiki");
const files = fs.readdirSync(wikiDir)
  .filter((name) => name.endsWith(".md"))
  .sort();

let errors = 0;
let totalTables = 0;
let totalCodeBlocks = 0;

function walkTokens(tokens, visit) {
  for (const token of tokens) {
    visit(token);
    if (Array.isArray(token.tokens)) walkTokens(token.tokens, visit);
    if (Array.isArray(token.items)) walkTokens(token.items, visit);
  }
}

for (const name of files) {
  const file = path.join(wikiDir, name);
  const source = fs.readFileSync(file, "utf8");
  const lines = source.split(/\r?\n/);
  const fenceLines = lines.filter((line) => /^```(?:[\w-]+)?\s*$/.test(line)).length;

  if (fenceLines % 2 !== 0) {
    console.error(`[ERROR] ${name}: unbalanced fenced code blocks (${fenceLines})`);
    errors++;
  }

  let tokens;
  try {
    tokens = marked.lexer(source, { gfm: true });
  } catch (error) {
    console.error(`[ERROR] ${name}: parser failure: ${error.message}`);
    errors++;
    continue;
  }

  let tables = 0;
  let codeBlocks = 0;
  walkTokens(tokens, (token) => {
    if (token.type === "table") tables++;
    if (token.type === "code") codeBlocks++;
  });
  totalTables += tables;
  totalCodeBlocks += codeBlocks;

  const slideNumbers = [...source.matchAll(/^## 📄 Slide (\d+)/gm)].map((match) => Number(match[1]));
  const duplicates = slideNumbers.filter((number, index) => slideNumbers.indexOf(number) !== index);
  if (duplicates.length) {
    console.error(`[ERROR] ${name}: duplicate slide headings: ${[...new Set(duplicates)].join(", ")}`);
    errors++;
  }

  console.log(`[OK] ${name}: ${tables} rendered tables, ${codeBlocks} rendered code/flow blocks, ${slideNumbers.length} slide headings`);
}

console.log("\n--- MARKDOWN RENDER AUDIT ---");
console.log(`Files checked: ${files.length}`);
console.log(`Rendered tables: ${totalTables}`);
console.log(`Rendered code/flow blocks: ${totalCodeBlocks}`);
console.log(`Errors: ${errors}`);

if (errors) process.exitCode = 1;
