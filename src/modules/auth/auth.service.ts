import bcrypt from "bcryptjs";
import type { LoginInput } from "./auth.validation";
// import type { UserResponse } from "../users/user.types";
import { userRepository } from "../users/user.repository";
import AppError from "../../shared/errors/app-error";
import { mapUserToResponse } from "../users/user.mapper";
import type { LoginResult } from "./auth.types";
import { generateAccessToken } from "./auth.token";


class AuthService {

    async login(input: LoginInput): Promise<LoginResult> {

        const user = await userRepository.findByEmail(input.email)

        // 401 = Unauthorized User
        if (!user) {
            throw new AppError(
                "Invalid email or password",
                401,
                "INVALID_CREDENTIALS"
            )
        }

        const passwordMatches = await bcrypt.compare(input.password, user.passwordHash)

        if (!passwordMatches) {
            throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS")
        }

        // 403 = the credentials might be valid, but access is not being granted based on the account's current permissions or state.
        if (user.status !== 'ACTIVE') {
            throw new AppError("Your account is inactive", 403, "ACCOUNT_INACTIVE")
        }

        const accessToken = generateAccessToken({
            userId: user.id,
            role: user.role
        })

        return { user: mapUserToResponse(user), accessToken }

    }

}

export const authService = new AuthService();