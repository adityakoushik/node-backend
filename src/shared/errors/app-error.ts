/**
 * * @class AppError
 * * @extends Error
 * * @description A custom error class that extends the built-in Error class. It can be used to create application-specific errors with additional properties or methods if needed. 
 */
class AppError extends Error {
    // * Properties Definations
    statusCode: number; // i.e. 400, 404, 500 etc.
    code: string; // "USER_EMAIL_EXISTS", "USER_NOT_FOUND", "INTERNAL_SERVER_ERROR" etc.
    /**
     * * ? = Its optional, Error Details can be or can not be,
     * * unknown = in TypeScript details?: any . means There will be something here, but not sure of the exact type right now.
     */
    details?: unknown 

    /**
     * 
     * @param message 
     * @param statusCode 
     * @param code 
     * * When we call AppError using new AppError("User not found", 404, "USER_NOT_FOUND"),
     * * Then the constructor will be executed, and the message, statusCode, and code properties will be set accordingly.
     */
    constructor(message: string, statusCode: number, code: string, details?: unknown) {

        /**
         * ? super(message) means
         * ! Call the parent class -> (Error) constructor with the message parameter.
         * * If this is not done, the standard error message won't be set.
         */
        super(message);

        /**
         * ? this.name = "AppError": 
         * * Default error name is "Error". We changed it to "AppError" so that anyone looking at the logs would realize it's our custom error.
         * * Setting the properties
         */
        this.name = "AppError";
        this.statusCode = statusCode;
        this.code = code;
        this.details = details

        /**
         * ? Capturing Stack Trace
         * * This is a specific function (captureStackTrace) of the V8 engine (Node.js).
         * * We pass `this.constructor` here so that the constructor itself does not appear in the stack trace. 
         * * Instead, the stack trace starts from the place where `new AppError` was actually called. 
         * * This keeps the logs cleaner and makes it easier to quickly find where the error came from.
    
            */
        Error.captureStackTrace(this, this.constructor)


    }
}

export default AppError;