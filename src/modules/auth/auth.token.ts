import jwt from "jsonwebtoken";
import type { UserRole } from "../users/user.types";
import "dotenv/config";

// * We want to store data with this shape inside the token:
interface AccessTokenPayload {
    userId: number;
    role: UserRole
}
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured")
}
export const generateAccessToken = (payload: AccessTokenPayload): string => {

    /**
     * * This function is taking Object as a input
     * * Output as a String
     */

    // * jwt.sign = jwt signature is help to create jwt token
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}