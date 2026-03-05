'use client';

import { useTina } from 'tinacms/dist/react';
import BaseLayout from '../../components/BaseLayout';
import Blocks from '../../components/Blocks';
import type { PageQuery, PageQueryVariables, SettingsQuery } from '../../../tina/__generated__/types';

interface PageClientProps {
    data: PageQuery;
    query: string;
    variables: PageQueryVariables;
    settings: SettingsQuery['settings'] | null;
}

export function PageClient({ data, query, variables, settings }: PageClientProps) {
    const { data: liveData } = useTina<PageQuery>({
        query,
        variables,
        data,
    });

    const page = liveData.page;

    return (
        <BaseLayout
            settings={settings}
            title={page.title}
            description={page.seoDescription ?? undefined}
        >
            <Blocks blocks={(page.blocks ?? []) as any} />
        </BaseLayout>
    );
}
