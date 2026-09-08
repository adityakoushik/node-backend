import bcrypt from "bcryptjs";

import sequelize from "../database/database";

import { userRepository } from "../modules/users/user.repository";

const testUserRepository =
    async (): Promise<void> => {

        try {
            await sequelize.authenticate();

            console.log("Database connected");

            const passwordHash =
                await bcrypt.hash(
                    "secret123",
                    10
                );

            // Using Date.now() to generate a unique email for testing purposes.
            const email =
                `test-${Date.now()}@example.com`;

            const createdUser =
                await userRepository.create({
                    name: "Repository Test User",
                    email,
                    passwordHash
                });

            console.log(
                "Created User:",
                createdUser.toJSON()
            );

            const userById =
                await userRepository.findById(
                    createdUser.id
                );

            console.log(
                "Find By ID:",
                userById?.toJSON()
            );

            const userByEmail =
                await userRepository.findByEmail(
                    email
                );

            console.log(
                "Find By Email:",
                userByEmail?.toJSON()
            );

            const users =
                await userRepository.findAll();

            console.log(
                "Total Users:",
                users.length
            );

        } catch (error) {

            console.error(
                "Repository test failed:",
                error
            );

        } finally {

            await sequelize.close();
        }
    };

testUserRepository();