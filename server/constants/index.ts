import { dirname } from "path";
import { fileURLToPath } from "url";

export * from "./collect-api";

// current file path in dev server
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// paths
export const ROOT_DIR = dirname(dirname(__dirname));
export const MOCKS_DIR = `${ROOT_DIR}/server/mocks`;

// environment
export const IS_DEV = process.env.NODE_ENV === "development";
