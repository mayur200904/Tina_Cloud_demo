// HOME PAGE — EMPTY SHELL
// -----------------------------------------------------------------------
// Agent: replace this file entirely with your custom home page sections.
// Read the Design Spec before writing. Do not reuse code from other projects.
//
// BEFORE WRITING TSX:
// 1. Define your schema fields in a comment block here
// 2. Write TSX that reads from those exact field names
// 3. Add matching collection to tina/config.ts
// 4. Write content/pages/index.md with matching frontmatter
// -----------------------------------------------------------------------

import client from "../../tina/__generated__/client";
import BaseLayout from "@/components/BaseLayout";

export default async function HomePage() {
  const settingsRes = await client.queries.settings({
    relativePath: "global.json",
  });

  return (
    <BaseLayout settings={settingsRes.data.settings}>
      {/* Agent writes custom sections here */}
      <main>
        <div style={{ padding: "8rem 2rem", textAlign: "center", color: "#999" }}>
          <p>Home page — agent will write this</p>
        </div>
      </main>
    </BaseLayout>
  );
}
