import type { UserResponse } from "../users/user.types";

/**
 * * This is how the successful login result will be -
 * {
     user: {...},
     accessToken: "..."
   }
 */
export interface LoginResult {
    user: UserResponse;
    accessToken: string;
}