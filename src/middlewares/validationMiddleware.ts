import { Request, Response, NextFunction } from "express";
import { FieldError } from "../types";

export const validationMiddleware = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction): any => {
        const errors: FieldError[] = [];

        if (schema.body) {
            for (const field in schema) {
                const rules = schema[field];
                const value = req.body[field];

                if (rules.required && (value === null || value === undefined)) {
                    errors.push({ message: 'Field is required', field });
                }

                // If the field is not required and missing, skip further checks
                if (value === undefined || value === null) continue;

                if (rules.type === 'array') {
                    if (!Array.isArray(value)) {
                        errors.push({ message: 'Field must be an array', field });
                        break;
                    }

                    if (rules.minItems && value.length < rules.minItems) {
                        errors.push({ message: `Field must have at least ${rules.minItems} item(s)`, field });
                    }

                    if (rules.allowedValues && rules.allowedValues.length > 0) {
                        for (const item of value) {
                            if (!rules.allowedValues.includes(item)) {
                                errors.push({ field, message: `${item} is not an allowed value in ${field}.` });
                            }
                        }
                    }

                    continue;
                }

                if (rules.type !== typeof value) {
                    errors.push({ message: `Field must be a ${rules.type} type`, field });
                }

                if (rules.type === 'number' && (value < rules.min || value > rules.max) ) {
                    errors.push({ message: `Field must be between ${rules.min} and ${rules.max}`, field });
                }

                if (rules.type === 'string' && (value.length > rules.maxLength)) {
                    errors.push({ message: `Field must be not longer than ${rules.maxLength}`, field });
                }
            }
        }

        if (schema.query) {
            for (const field in schema) {
                const rules = schema[field];
                const value = req.params[field];

                if (rules.type === 'number' && Number.isNaN(Number(value))) {
                    errors.push({ message: `Query param must be a number`, field });
                }
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errorsMessages: errors });
        }

        next();
    }
}