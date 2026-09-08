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

export interface RegisterUserInput {
    name: string;
    email: string;
    password: string;
}
