export type UserRole = "ADMIN" | "STAFF" | "CUSTOMER";
export type UserStatus = "ACTIVE" | "INACTIVE";

// Now, let's create another type for the repository input in the same file.
/**
 * Here interface is a new type of TypeScript Concept
 * How the object of CreateUserInput should look like when creating a new user in the repository.
 * Its define the shape of data that will be passed to the repository when creating a new user.
 */
export interface CreateUserInput {
    name: string;
    email: string;
    passwordHash: string;
    role?: UserRole; // Optional, defaults to "CUSTOMER"
    status?: UserStatus; // Optional, defaults to "ACTIVE"
}

// export interface RegisterUserInput {
//     name: string;
//     email: string;
//     password: string;
// }

/**
 * * We dont want to show the whole response object to the user, 
 * * so we will create a new type for the response object.
 * * This type will be used to define the shape of the response object that will be sent to the user.
 * * This type will only include the properties that we want to show to the user.
 * * This is a good practice to avoid exposing sensitive information to the user.
 * * For example, we don't want to show the passwordHash property to the user.
 */
export interface UserResponse {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}
