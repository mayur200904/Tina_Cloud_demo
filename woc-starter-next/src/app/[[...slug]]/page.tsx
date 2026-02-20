import client from '../../../tina/__generated__/client';
import { PageClient } from './page.client';

export const dynamic = 'auto';
export const revalidate = false;

interface PageProps {
    params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
    const pages = await client.queries.pageConnection();
    return (pages.data.pageConnection.edges ?? []).map((edge) => ({
        slug:
            edge?.node?._sys.filename === 'index'
                ? []
                : [edge?.node?._sys.filename ?? ''],
    }));
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const relativePath = (slug && slug.length > 0 ? slug.join('/') : 'index') + '.md';

    const [pageRes, settingsRes] = await Promise.all([
        client.queries.page({ relativePath }),
        client.queries.settings({ relativePath: 'global.json' }).catch(() => null),
    ]);

    return (
        <PageClient
            data={pageRes.data}
            query={pageRes.query}
            variables={pageRes.variables}
            settings={settingsRes?.data?.settings ?? null}
        />
    );
}
