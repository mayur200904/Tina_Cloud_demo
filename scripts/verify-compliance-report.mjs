import fs from "node:fs";
import path from "node:path";

const reportPath = path.join(process.cwd(), "RULEBOOK-COMPLIANCE-REPORT.md");

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

if (!fs.existsSync(reportPath)) {
  console.error("❌ Missing required file: RULEBOOK-COMPLIANCE-REPORT.md");
  process.exit(1);
}

const reportContent = fs.readFileSync(reportPath, "utf8");
const missingSections = requiredSections.filter((section) => !reportContent.includes(section));

if (missingSections.length > 0) {
  console.error("❌ Compliance report gate failed. Missing required section headings:");
  for (const section of missingSections) {
    console.error(`- ${section}`);
  }
  process.exit(1);
}

console.log("✅ Compliance report gate passed. All required sections are present.");
