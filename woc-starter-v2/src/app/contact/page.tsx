// CONTACT PAGE — EMPTY SHELL
// Agent: replace this file entirely with custom contact page sections.

import client from "../../../tina/__generated__/client";
import BaseLayout from "@/components/BaseLayout";

export default async function ContactPage() {
  const settingsRes = await client.queries.settings({
    relativePath: "global.json",
  });

  return (
    <BaseLayout settings={settingsRes.data.settings}>
      <main>
        <div style={{ padding: "8rem 2rem", textAlign: "center", color: "#999" }}>
          <p>Contact page — agent will write this</p>
        </div>
      </main>
    </BaseLayout>
  );
}
