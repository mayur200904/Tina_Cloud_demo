// TinaCMS admin is served by the @tinacms/cli as a static SPA at /admin/index.html
// This page simply redirects browser requests at /admin → the static admin bundle.
// No framework component needed here — TinaCMS cli handles it.

import { redirect } from 'next/navigation';

export default function AdminPage() {
    redirect('/admin/index.html');
}
