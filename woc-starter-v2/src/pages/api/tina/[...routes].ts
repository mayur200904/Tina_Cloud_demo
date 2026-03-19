import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { LocalBackendAuthProvider, TinaNodeBackend } from '@tinacms/datalayer';
import { TinaCloudBackendAuthProvider } from '@tinacms/auth';

const isSelfHostedTinaAuth = process.env.TINA_SELF_HOSTED_AUTH === 'true';
const useLocalAuth = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

let cachedHandler: NextApiHandler | null = null;

async function getTinaHandler(): Promise<NextApiHandler> {
  if (cachedHandler) {
    return cachedHandler;
  }

  const databaseClientImportPath = '../../../../../tina/__generated__/databaseClient';
  const databaseClientModule = await import(databaseClientImportPath);
  const databaseClient = databaseClientModule.default;

  cachedHandler = TinaNodeBackend({
    authProvider: useLocalAuth ? LocalBackendAuthProvider() : TinaCloudBackendAuthProvider(),
    databaseClient,
  });

  return cachedHandler;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isSelfHostedTinaAuth) {
    res.status(404).json({
      message:
        'Self-hosted Tina auth route is disabled. Set TINA_SELF_HOSTED_AUTH=true to enable /api/tina/gql.',
    });
    return;
  }

  try {
    const tinaHandler = await getTinaHandler();
    return tinaHandler(req, res);
  } catch {
    res.status(500).json({
      message:
        'Tina self-hosted backend is enabled but database client was not found. Run Tina build/codegen and verify tina/__generated__/databaseClient exists.',
    });
  }
};

export default handler;
