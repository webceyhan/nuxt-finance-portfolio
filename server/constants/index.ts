import { dirname } from 'path';
import { fileURLToPath } from 'url';

// current file path in dev server
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// paths
export const ROOT_DIR = dirname(dirname(__dirname));
export const MOCKS_DIR = `${ROOT_DIR}/server/mocks`;

// environment
export const IS_DEV = process.env.NODE_ENV === 'development';

// CollectAPI
export const COLLECT_API_KEY = process.env.VITE_API_KEY;
export const COLLECT_API_URL = 'https://api.collectapi.com/economy';
