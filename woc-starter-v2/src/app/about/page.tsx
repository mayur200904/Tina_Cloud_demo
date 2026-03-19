// ABOUT PAGE — EMPTY SHELL
// Agent: replace this file entirely with custom about page sections.

import client from "../../../tina/__generated__/client";
import BaseLayout from "@/components/BaseLayout";
import StarterPageShell from "@/components/StarterPageShell";

export default async function AboutPage() {
  const settingsRes = await client.queries.settings({
    relativePath: "global.json",
  });

  return (
    <BaseLayout settings={settingsRes.data.settings}>
      <StarterPageShell pageName="About" />
    </BaseLayout>
  );
}
