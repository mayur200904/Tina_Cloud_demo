import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const envLocalPath = path.join(rootDir, '.env.local');

function parseEnvFile(fileContent) {
  const values = {};
  const order = [];

  for (const line of fileContent.split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#') || !line.includes('=')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1);
    if (!key) {
      continue;
    }

    values[key] = value;
    order.push(key);
  }

  return { values, order };
}

function loadEnvLocal() {
  if (!fs.existsSync(envLocalPath)) {
    return { values: {}, order: [] };
  }

  const content = fs.readFileSync(envLocalPath, 'utf8');
  return parseEnvFile(content);
}

function writeEnvLocal(values, order) {
  const uniqueOrder = [...new Set(order)];
  const body = uniqueOrder
    .filter((key) => Object.prototype.hasOwnProperty.call(values, key))
    .map((key) => `${key}=${values[key] ?? ''}`)
    .join('\n');

  fs.writeFileSync(envLocalPath, `${body}\n`, 'utf8');
}

function getEffectiveValue(values, key) {
  if (typeof process.env[key] === 'string' && process.env[key] !== '') {
    return process.env[key];
  }
  return values[key] ?? '';
}

function printStatus(values) {
  const mode = values.TINA_SELF_HOSTED_AUTH === 'true' ? 'self-hosted' : 'hosted';
  const localAuth = values.TINA_PUBLIC_IS_LOCAL || '(unset)';
  const clientId = getEffectiveValue(values, 'NEXT_PUBLIC_TINA_CLIENT_ID') || getEffectiveValue(values, 'TINA_CLIENT_ID');
  const hasToken = Boolean(getEffectiveValue(values, 'TINA_TOKEN'));

  console.log(`Tina mode: ${mode}`);
  console.log(`TINA_PUBLIC_IS_LOCAL: ${localAuth}`);
  console.log(`Client ID configured: ${clientId ? 'yes' : 'no'}`);
  console.log(`TINA_TOKEN configured: ${hasToken ? 'yes' : 'no'}`);
}

function requiredKeysForMode(mode) {
  if (mode === 'self-hosted') {
    return ['NEXT_PUBLIC_TINA_CLIENT_ID', 'TINA_TOKEN'];
  }
  return ['TINA_CLIENT_ID', 'TINA_TOKEN'];
}

function validateMode(values) {
  const mode = values.TINA_SELF_HOSTED_AUTH === 'true' ? 'self-hosted' : 'hosted';
  const missing = requiredKeysForMode(mode).filter((key) => !getEffectiveValue(values, key));

  if (missing.length === 0) {
    console.log(`✅ ${mode} mode requirements satisfied.`);
    return 0;
  }

  console.error(`❌ Missing required environment variables for ${mode} mode: ${missing.join(', ')}`);
  return 1;
}

function ensureKeyInOrder(order, key) {
  if (!order.includes(key)) {
    order.push(key);
  }
}

function setHosted(values, order) {
  values.TINA_SELF_HOSTED_AUTH = 'false';
  ensureKeyInOrder(order, 'TINA_SELF_HOSTED_AUTH');
  ensureKeyInOrder(order, 'TINA_CLIENT_ID');
  ensureKeyInOrder(order, 'TINA_TOKEN');
}

function setSelfHosted(values, order) {
  values.TINA_SELF_HOSTED_AUTH = 'true';
  if (!values.TINA_PUBLIC_IS_LOCAL) {
    values.TINA_PUBLIC_IS_LOCAL = 'true';
  }
  if (!values.NEXT_PUBLIC_TINA_CLIENT_ID && values.TINA_CLIENT_ID) {
    values.NEXT_PUBLIC_TINA_CLIENT_ID = values.TINA_CLIENT_ID;
  }

  ensureKeyInOrder(order, 'TINA_SELF_HOSTED_AUTH');
  ensureKeyInOrder(order, 'TINA_PUBLIC_IS_LOCAL');
  ensureKeyInOrder(order, 'NEXT_PUBLIC_TINA_CLIENT_ID');
  ensureKeyInOrder(order, 'TINA_TOKEN');
}

function main() {
  const action = process.argv[2] || 'status';
  const envLocal = loadEnvLocal();
  const { values, order } = envLocal;

  if (action === 'hosted') {
    setHosted(values, order);
    writeEnvLocal(values, order);
    console.log('Switched to hosted Tina mode in .env.local');
    printStatus(values);
    validateMode(values);
    process.exit(0);
  }

  if (action === 'self-hosted') {
    setSelfHosted(values, order);
    writeEnvLocal(values, order);
    console.log('Switched to self-hosted Tina mode in .env.local');
    printStatus(values);
    validateMode(values);
    process.exit(0);
  }

  if (action === 'check') {
    printStatus(values);
    process.exit(validateMode(values));
  }

  printStatus(values);
  process.exit(0);
}

main();