import client from "../../tina/__generated__/client";
import BaseLayout from "@/components/BaseLayout";
import { notFound } from "next/navigation";
import HomePageClient from "./page.client";

export default async function HomePage() {
  try {
    const [settingsRes, homeRes] = await Promise.all([
      client.queries.settings({ relativePath: "global.json" }),
      client.queries.home({ relativePath: "index.md" }),
    ]);

    return (
      <BaseLayout settings={settingsRes.data.settings}>
        <HomePageClient query={homeRes.query} variables={homeRes.variables} data={homeRes.data} />
      </BaseLayout>
    );
  } catch {
    notFound();
  }
}
