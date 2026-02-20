import { notFound } from 'next/navigation';
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

    // Ignore requests for common static assets that might have leaked into this route
    const lastSegment = slug && slug.length > 0 ? slug[slug.length - 1] : '';
    if (lastSegment.includes('.')) {
        return notFound();
    }

    const relativePath = (slug && slug.length > 0 ? slug.join('/') : 'index') + '.md';

    const [pageRes, settingsRes] = await Promise.all([
        client.queries.page({ relativePath }).catch(() => null),
        client.queries.settings({ relativePath: 'global.json' }).catch(() => null),
    ]);

    // Safely 404 if the page doesn't exist in TinaCMS
    if (!pageRes || !pageRes.data || !pageRes.data.page) {
        return notFound();
    }

    return (
        <PageClient
            data={pageRes.data}
            query={pageRes.query}
            variables={pageRes.variables}
            settings={settingsRes?.data?.settings ?? null}
        />
    );
}
