// SERVICES PAGE — EMPTY SHELL
// Agent: replace this file entirely with custom services page sections.

import client from "../../../tina/__generated__/client";
import BaseLayout from "@/components/BaseLayout";

export default async function ServicesPage() {
  const settingsRes = await client.queries.settings({
    relativePath: "global.json",
  });

  return (
    <BaseLayout settings={settingsRes.data.settings}>
      <main>
        <div style={{ padding: "8rem 2rem", textAlign: "center", color: "#999" }}>
          <p>Services page — agent will write this</p>
        </div>
      </main>
    </BaseLayout>
  );
}
