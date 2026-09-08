import bcrypt from 'bcryptjs';

import { userRepository } from './user.repository';

import type { RegisterUserInput } from './user.types';
import User from './user.model';

// We created a class that will contain user-related business logic methods.
class UserService {
    async registerUser(input: RegisterUserInput): Promise<User> {

        // Sanitize Email: Convert the email to lowercase and trim any whitespace.
        const sanitizedEmail = input.email.trim().toLowerCase();

        // Check if the email is already in use by querying the database.
        const existingUser = await userRepository.findByEmail(sanitizedEmail);
        // Here I am using TypeScript truthyness narrowing.
        if (existingUser) {
            throw new Error("A user with this email already exists");
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

        return newUser;

    }
}

export const userService = new UserService();