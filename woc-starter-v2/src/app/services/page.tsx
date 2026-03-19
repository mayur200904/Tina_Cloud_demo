// SERVICES PAGE — EMPTY SHELL
// Agent: replace this file entirely with custom services page sections.

import client from "../../../tina/__generated__/client";
import BaseLayout from "@/components/BaseLayout";
import StarterPageShell from "@/components/StarterPageShell";

export default async function ServicesPage() {
  const settingsRes = await client.queries.settings({
    relativePath: "global.json",
  });

  return (
    <BaseLayout settings={settingsRes.data.settings}>
      <StarterPageShell pageName="Services" />
    </BaseLayout>
  );
}
