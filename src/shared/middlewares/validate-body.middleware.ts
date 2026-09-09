import type { NextFunction, Request, Response } from "express";

// * ZodType is a generic/base schema type in Zod.
import type { ZodType } from "zod";
import AppError from "../errors/app-error";

export const validateBody = (schema: ZodType) => {

    // Void - This means the middleware function itself is not returning any meaningful value. Instead of it will return next() or next(error)
    return (
        req: Request,
        _res: Response,
        next: NextFunction
    ): void => {
        // schema.safeParse() - Check if this data is valid according to my schema rules.
        const result = schema.safeParse(req.body)
        if (!result.success) {

            /**
             * * Making clean errors from the Zod issues
             * ? because in zod there is result.error.issues array available
             */
            const details = result.error.issues.map(
                (issue) => ({
                    field: issue.path.join("."),
                    message: issue.message
                })
            );

            next(
                new AppError(
                    "Request validation failed",
                    400,
                    "VALIDATION_ERROR",
                    details
                )
            )

            return;
        }
        req.body = result.data;
        next()
    }
}