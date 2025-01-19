import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const validateDto = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToClass(dtoClass, req.body);
        const errors = await validate(dtoObject);
        
        if (errors.length > 0) {
            return res.status(400).json({
                status: 'error',
                errors: errors.map((error: ValidationError) => ({
                    property: error.property,
                    constraints: error.constraints
                }))
            });
        }
        
        next();
    };
};
