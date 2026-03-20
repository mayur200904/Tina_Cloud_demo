import client from "../../../tina/__generated__/client";
import BaseLayout from "@/components/BaseLayout";
import { notFound } from "next/navigation";
import ServicesPageClient from "./page.client";

export default async function ServicesPage() {
  try {
    const [settingsRes, servicesRes] = await Promise.all([
      client.queries.settings({ relativePath: "global.json" }),
      client.queries.services({ relativePath: "services.md" }),
    ]);

    return (
      <BaseLayout settings={settingsRes.data.settings}>
        <ServicesPageClient query={servicesRes.query} variables={servicesRes.variables} data={servicesRes.data} />
      </BaseLayout>
    );
  } catch {
    notFound();
  }
}
