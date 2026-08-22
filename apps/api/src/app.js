import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { contentRoutes } from "./routes/contentRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
export const createApp = () => {
    const app = express();
    app.use(cors({ origin: env.corsOrigin }));
    app.use(express.json());
    app.get("/health", (_req, res) => {
        res.json({ ok: true });
    });
    app.use("/api", contentRoutes);
    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
};
