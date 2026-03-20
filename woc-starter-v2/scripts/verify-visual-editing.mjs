import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const tinaConfigPath = path.join(cwd, "tina/config.ts");

const routes = [
  {
    route: "/",
    include: "index",
    serverFile: "src/app/page.tsx",
    clientFile: "src/app/page.client.tsx",
    importPath: "./page.client",
  },
  {
    route: "/about",
    include: "about",
    serverFile: "src/app/about/page.tsx",
    clientFile: "src/app/about/page.client.tsx",
    importPath: "./page.client",
  },
  {
    route: "/services",
    include: "services",
    serverFile: "src/app/services/page.tsx",
    clientFile: "src/app/services/page.client.tsx",
    importPath: "./page.client",
  },
  {
    route: "/contact",
    include: "contact",
    serverFile: "src/app/contact/page.tsx",
    clientFile: "src/app/contact/page.client.tsx",
    importPath: "./page.client",
  },
];

function readIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, "utf8");
}

function ensure(condition, errors, message) {
  if (!condition) {
    errors.push(message);
  }
}

function getConfiguredEditableIncludes() {
  const configSource = readIfExists(tinaConfigPath);
  if (!configSource) {
    return new Set();
  }

  const sourceWithoutBlockComments = configSource.replace(/\/\*[\s\S]*?\*\//g, "");
  const sourceWithoutComments = sourceWithoutBlockComments.replace(/^\s*\/\/.*$/gm, "");

  const includes = new Set();
  const includeRegex = /match\s*:\s*\{\s*include\s*:\s*["']([a-z0-9_-]+)["']\s*\}/gi;

  for (const match of sourceWithoutComments.matchAll(includeRegex)) {
    const includeValue = match[1]?.trim();
    if (!includeValue || includeValue === "global") {
      continue;
    }
    includes.add(includeValue);
  }

  return includes;
}

function checkServerFile(route, serverSource, expectedImportPath, errors) {
  ensure(
    new RegExp(`from\\s+["']${expectedImportPath}["']`).test(serverSource),
    errors,
    `${route}: server page must import its client page component from ${expectedImportPath}`,
  );

  ensure(
    /query\s*=\{[^}]*\.query\}/.test(serverSource),
    errors,
    `${route}: server page must pass query={...query} to client component`,
  );

  ensure(
    /variables\s*=\{[^}]*\.variables\}/.test(serverSource),
    errors,
    `${route}: server page must pass variables={...variables} to client component`,
  );

  ensure(
    /data\s*=\{[^}]*\.data\}/.test(serverSource),
    errors,
    `${route}: server page must pass data={...data} to client component`,
  );
}

function checkClientFile(route, clientSource, errors) {
  ensure(
    /^\s*["']use client["'];?/m.test(clientSource),
    errors,
    `${route}: client page must declare "use client"`,
  );

  ensure(
    /from\s+["']tinacms\/dist\/react["']/.test(clientSource),
    errors,
    `${route}: client page must import useTina from tinacms/dist/react`,
  );

  ensure(
    /useTina\s*\(/.test(clientSource),
    errors,
    `${route}: client page must call useTina(...)`,
  );

  ensure(
    /query\s*:\s*props\.query/.test(clientSource),
    errors,
    `${route}: useTina must receive query: props.query`,
  );

  ensure(
    /variables\s*:\s*props\.variables/.test(clientSource),
    errors,
    `${route}: useTina must receive variables: props.variables`,
  );

  ensure(
    /data\s*:\s*props\.data/.test(clientSource),
    errors,
    `${route}: useTina must receive data: props.data`,
  );

  ensure(
    /const\s*\{\s*data\s*\}\s*=\s*useTina\s*\(/.test(clientSource),
    errors,
    `${route}: client page must destructure data from useTina`,
  );

  ensure(
    /experimental___selectFormByFormId\s*\(/.test(clientSource),
    errors,
    `${route}: client page must include experimental___selectFormByFormId() for stable form selection`,
  );

  ensure(
    /content\/pages\/\$\{props\.variables\.relativePath\}/.test(clientSource),
    errors,
    `${route}: selectFormByFormId must return content/pages/${"${props.variables.relativePath}"}`,
  );
}

const errors = [];
const configuredIncludes = getConfiguredEditableIncludes();
const editableRoutes = routes.filter((route) => configuredIncludes.has(route.include));

if (editableRoutes.length === 0) {
  console.log("ℹ️ No editable page collections detected in tina/config.ts. Skipping route-level visual editing checks.");
  process.exit(0);
}

for (const config of editableRoutes) {
  const serverPath = path.join(cwd, config.serverFile);
  const clientPath = path.join(cwd, config.clientFile);

  const serverSource = readIfExists(serverPath);
  const clientSource = readIfExists(clientPath);

  ensure(!!serverSource, errors, `${config.route}: missing server file ${config.serverFile}`);
  ensure(!!clientSource, errors, `${config.route}: missing client file ${config.clientFile}`);

  if (!serverSource || !clientSource) {
    continue;
  }

  checkServerFile(config.route, serverSource, config.importPath, errors);
  checkClientFile(config.route, clientSource, errors);
}

if (errors.length > 0) {
  console.error("❌ Visual editing preflight failed.");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("✅ Visual editing preflight passed for configured editable routes.");