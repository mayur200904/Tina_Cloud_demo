import client from "../../../tina/__generated__/client";
import BaseLayout from "@/components/BaseLayout";
import { notFound } from "next/navigation";
import ContactPageClient from "./page.client";

export default async function ContactPage() {
  try {
    const [settingsRes, contactRes] = await Promise.all([
      client.queries.settings({ relativePath: "global.json" }),
      client.queries.contact({ relativePath: "contact.md" }),
    ]);

    return (
      <BaseLayout settings={settingsRes.data.settings}>
        <ContactPageClient query={contactRes.query} variables={contactRes.variables} data={contactRes.data} />
      </BaseLayout>
    );
  } catch {
    notFound();
  }
}
