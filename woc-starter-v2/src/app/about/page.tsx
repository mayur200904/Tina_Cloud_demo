import client from "../../../tina/__generated__/client";
import BaseLayout from "@/components/BaseLayout";
import { notFound } from "next/navigation";
import AboutPageClient from "./page.client";

export default async function AboutPage() {
  try {
    const [settingsRes, aboutRes] = await Promise.all([
      client.queries.settings({ relativePath: "global.json" }),
      client.queries.about({ relativePath: "about.md" }),
    ]);

    return (
      <BaseLayout settings={settingsRes.data.settings}>
        <AboutPageClient query={aboutRes.query} variables={aboutRes.variables} data={aboutRes.data} />
      </BaseLayout>
    );
  } catch {
    notFound();
  }
}
