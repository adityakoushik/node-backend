import "dotenv/config";

import app from "./app";

// The database module is JavaScript and currently has no TypeScript declarations.
import sequelize from "./database/database";


// console.log({database: sequelize.config});

// Here below : number is type annotation for the PORT variable, ensuring it is treated as a number.
const PORT: number = Number(process.env.PORT ?? 5003);

/**
 * startServer is an asynchronous function that initializes the server. 
 * It returns a Promise that resolves to void, 
 * indicating that it does not return any value.
 */
const startServer = async (): Promise<void> => {
    try {
        /**
         * authenticate() method is used to test if the connection to the database is successful.
         * authenticate() is a part of Sequelize's API that checks if the database connection is established successfully.
         * authenticate() returns a promise, so we use await to wait for the promise to resolve or reject.
         */
        await sequelize.authenticate();
        console.log("Database connection has been established successfully.");

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
        })
    }catch (error) {
        console.error("Unable to connect to the database:", error);

        // ! If Database connection fails, exit the process with a failure code
        process.exit(1); 
    }
}

startServer();