import type { NextFunction, Request, Response } from "express";
import type { LoginInput } from "./auth.validation";
import { authService } from "./auth.service";

export const login = async (req: Request<{},{}, LoginInput>, res: Response, next: NextFunction): Promise<void> => {
    
    try {
        
        const result = await authService.login(req.body)

        res.status(200).json({
            success: true,
            message: "Login Successful",
            data: result
        })

    } catch (error) {
        next(error)
    }

}