import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const cwd = process.cwd();
const envPath = path.join(cwd, '.env');

function parseEnv(content) {
  const values = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
      continue;
    }
    const index = trimmed.indexOf('=');
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (key) {
      values[key] = value;
    }
  }
  return values;
}

function runStep(command, args, env) {
  const result = spawnSync(command, args, {
    cwd,
    env,
    stdio: 'inherit',
    shell: false,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const fileEnv = fs.existsSync(envPath) ? parseEnv(fs.readFileSync(envPath, 'utf8')) : {};
const runtimeEnv = {
  ...process.env,
  ...fileEnv,
  TINA_SELF_HOSTED_AUTH: 'false',
  GITHUB_BRANCH: process.env.GITHUB_BRANCH || fileEnv.GITHUB_BRANCH || 'main',
};

console.log(`Running hosted verification on branch: ${runtimeEnv.GITHUB_BRANCH}`);

runStep('node', ['scripts/tina-mode.mjs', 'check'], runtimeEnv);
runStep('npm', ['run', 'build'], runtimeEnv);

console.log('✅ Hosted verification complete.');
