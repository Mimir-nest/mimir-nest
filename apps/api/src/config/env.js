import path from "node:path";
import { fileURLToPath } from "node:url";
const moduleDir = path.dirname(fileURLToPath(import.meta.url));
export const env = {
    port: Number(process.env.PORT ?? 4000),
    // Allow any origin by default in local development (Vite dev at 8080, preview at 5173)
    corsOrigin: process.env.CORS_ORIGIN ?? "*",
    contentDir: process.env.CONTENT_DIR ?? path.resolve(moduleDir, "../../content"),
};
