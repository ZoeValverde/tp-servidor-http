import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validateSchema =
  (schema: ZodType, target: "body" | "params" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction): void => {

    const result = schema.safeParse(req[target]);
    

    if (!result.success) {
      res.status(400).json({
        success: false,
        errors: result.error.issues.map(issue => ({
          field: issue.path[0] ?? "unknown",
          message:
            issue.code === "invalid_type" && issue.input === undefined
              ? `El campo '${String(issue.path[0] ?? "desconocido")}' es obligatorio`
              : issue.message,
        })),
      });
      return;
    }

    req[target] = result.data;
    next();
  };