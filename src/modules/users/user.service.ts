import bcrypt from 'bcryptjs';

import { userRepository } from './user.repository';

import type { RegisterUserInput } from './user.validation';

import type { UserResponse } from './user.types';
import AppError from '../../shared/errors/app-error';
import { mapUserToResponse } from './user.mapper';

// We created a class that will contain user-related business logic methods.
class UserService {
    
    
    async registerUser(input: RegisterUserInput): Promise<UserResponse> {

        // * Sanitize Email: Convert the email to lowercase and trim any whitespace.
        const sanitizedEmail = input.email.trim().toLowerCase();

        // * Check if the email is already in use by querying the database.
        const existingUser = await userRepository.findByEmail(sanitizedEmail);

        // Here I am using TypeScript truthyness narrowing.
        if (existingUser) {
            // throw new Error("A user with this email already exists");
            throw new AppError("A user with this email already exists", 409, "USER_EMAIL_EXISTS")
        }

        // Hash the password before saving it to the database.
        const passwordHash = await bcrypt.hash(input.password, 10);

        // Create a new user in the database with the sanitized email and hashed password.
        const newUser = await userRepository.create({
            name: input.name,
            email: sanitizedEmail,
            passwordHash: passwordHash,
            role: "CUSTOMER", // Default role for new users
            status: "ACTIVE" // Default status for new users
        })

        // return newUser;
        return mapUserToResponse(newUser);

    }
}

export const userService = new UserService();