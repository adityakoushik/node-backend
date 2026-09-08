import sequelize from "../database/database";

import { userService } from "../modules/users/user.service";

const testUserService = async (): Promise<void> => {

    try {

        await sequelize.authenticate();

        console.log("Database connected");

        // const email = `service-${Date.now()}@example.com`;
        const email = `duplicate@example.com`;

        const user = await userService.registerUser({
            name: "Service Test User",
            email,
            password: "secret123"
        });

        console.log("Registered User:", user.toJSON());

    } catch (error) {

        console.error("Service test failed:",error);

    } finally {

        await sequelize.close();
    }
};

testUserService();