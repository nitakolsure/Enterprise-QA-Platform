#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');

const tagArg = process.argv[2] || process.env.TAGS || process.env.TAG;

if (!tagArg) {
  console.error(`
Run tests by tag using cucumber.ts.

Usage (PowerShell: quote tags that start with @):
  node run-by-tag.js smoke
  node run-by-tag.js '@smoke'
  npm run test:smoke
  npm run cucumber -- --tags '@smoke or @cart'
`);
  process.exit(1);
}

const tags = tagArg.startsWith('@') || tagArg.includes(' ') ? tagArg : `@${tagArg}`;
const extraArgs = process.argv.slice(3);
const cucumberBin = path.join(__dirname, 'node_modules', '@cucumber', 'cucumber', 'bin', 'cucumber.js');

console.log(`Running scenarios matching: ${tags}`);

const run = spawnSync(
  process.execPath,
  ['--import', 'tsx', cucumberBin, '--config', 'cucumber.ts', '--tags', tags, ...extraArgs],
  { stdio: 'inherit', shell: false, cwd: __dirname }
);

process.exit(run.status ?? 0);
