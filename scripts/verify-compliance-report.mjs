import fs from "node:fs";
import path from "node:path";

const templateReportPath = path.join(process.cwd(), "RULEBOOK-COMPLIANCE-REPORT.md");
const latestReportPath = path.join(process.cwd(), "COMPLIANCE-REPORT-LATEST.md");

const requiredSections = [
  "## A) Task Metadata",
  "## B) North-Star Alignment",
  "## B.1) Mandatory Skill Stack Evidence",
  "## C) Files + Schema Contract",
  "## D) Editability Coverage",
  "## E) Visual Editing Contract Evidence (Required)",
  "## F) Validation Evidence",
  "## G) Publishing Proof (Required if save/publish touched)",
  "## H) Design Quality Rubric (0–5 each)",
  "### H.1) High-End Design Gate Evidence (Required)",
  "## H.2) React/Next Best-Practice Evidence (Required)",
  "## I) Hard Gate Result",
  "## J) Final Declaration",
];

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function readRequiredFile(filePath, label) {
  if (!fs.existsSync(filePath)) {
    fail(`Missing required file: ${label}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function validateSections(content, label) {
  const missingSections = requiredSections.filter((section) => !content.includes(section));
  if (missingSections.length > 0) {
    console.error(`❌ ${label} is missing required section headings:`);
    for (const section of missingSections) {
      console.error(`- ${section}`);
    }
    process.exit(1);
  }
}

function validateLatestReportContent(content) {
  const unresolvedPlaceholderRegexes = [
    /^-\s+Date:\s*$/m,
    /^-\s+Agent:\s*$/m,
    /^-\s+Task summary:\s*$/m,
    /^-\s+Primary target path:\s*$/m,
    /^-\s+Tina mode used:\s*hosted\s*\/\s*self-hosted\s*$/mi,
    /yes\s*\/\s*no/i,
    /pass\s*\/\s*fail/i,
    /yes\s*\/\s*no\s*\/\s*n\/a/i,
    /\[path\]/i,
  ];

  const unresolved = unresolvedPlaceholderRegexes.filter((regex) => regex.test(content));

  if (unresolved.length > 0) {
    console.error("❌ COMPLIANCE-REPORT-LATEST.md contains unresolved placeholders:");
    for (const item of unresolved) {
      console.error(`- ${item}`);
    }
    process.exit(1);
  }

  const requiredValueChecks = [
    /^- Date:\s*.+$/m,
    /^- Agent:\s*.+$/m,
    /^- Task summary:\s*.+$/m,
    /^- Rulebook-compliant completion:\s*(yes|no)$/im,
    /^- Any hard gate failed\?\s*(yes|no)$/im,
    /^- visual-editing preflight:\s*(pass|fail)$/im,
    /^- mode check:\s*(pass|fail)$/im,
    /^- Tina build:\s*(pass|fail)$/im,
    /^- app build:\s*(pass|fail)$/im,
  ];

  const failedChecks = requiredValueChecks.filter((regex) => !regex.test(content));
  if (failedChecks.length > 0) {
    fail("COMPLIANCE-REPORT-LATEST.md is missing one or more required filled values.");
  }
}

const templateReportContent = readRequiredFile(templateReportPath, "RULEBOOK-COMPLIANCE-REPORT.md");
const latestReportContent = readRequiredFile(latestReportPath, "COMPLIANCE-REPORT-LATEST.md");

validateSections(templateReportContent, "RULEBOOK-COMPLIANCE-REPORT.md");
validateSections(latestReportContent, "COMPLIANCE-REPORT-LATEST.md");
validateLatestReportContent(latestReportContent);

console.log("✅ Compliance report gate passed. Template and latest report are structurally valid and filled.");
