import "dotenv/config";

import app from "./app";

// The database module is JavaScript and currently has no TypeScript declarations.
import database from "./database/database";


// console.log({database: database.config});

// Here below : number is type annotation for the PORT variable, ensuring it is treated as a number.
const PORT : number = Number(process.env.PORT ?? 5003);

const startServer = async (): Promise<void> => {
    try {
        // Test the database connection
        await database.authenticate();
        console.log("Database connection has been established successfully.");

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
        })
    }catch (error) {
        console.error("Unable to connect to the database:", error);

        // If Database connection fails, exit the process with a failure code
        process.exit(1); 
    }
}

startServer();