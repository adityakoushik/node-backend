/**
 * * we are not using User as run time value, we are using it as a type only. 
 * * It clearly tells the TypeScript compiler that `User` is being used solely to check the shape (or type) of the data. 
 * * This will help us to reduce the bundle size and improve the performance of the application.
 */
import type User from "./user.model";

import type { UserResponse } from "./user.types";

// This function takes a User object and returns a UserResponse object.
export const mapUserToResponse = (user: User): UserResponse => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}
