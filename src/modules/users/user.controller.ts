import type { NextFunction, Request, Response } from "express";
import type { RegisterUserInput } from "./user.validation";
import { userService } from "./user.service";
import { success } from "zod";

export const registerUser = async (
    req: Request<{}, {}, RegisterUserInput>,
    res: Response,
    next: NextFunction
): Promise<void> => {

    try {

        const user = await userService.registerUser(req.body)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: { user }
        })

    } catch (error) {
        next(error)
    }

}