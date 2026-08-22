import { HttpError } from "../utils/httpError.js";
import { ZodError } from "zod";
export const notFoundHandler = (_req, _res, next) => {
    next(new HttpError(404, "Route not found"));
};
export const errorHandler = (error, _req, res, _next) => {
    const statusCode = error instanceof HttpError
        ? error.statusCode
        : error instanceof ZodError
            ? 400
            : 500;
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(statusCode).json({
        error: {
            message,
            ...(error instanceof HttpError && error.details
                ? { details: error.details }
                : error instanceof ZodError
                    ? { details: error.issues }
                    : {}),
        },
    });
};
