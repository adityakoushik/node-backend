import User from "./user.model";
import type { CreateUserInput } from "./user.types";


// We created a class that will contain user-related database methods.
class UserRepository {
    // This method will create a new user in the database.
    async create(data: CreateUserInput) : Promise<User> {
        const user = await User.create(data);
        return user;
    }

    // <User | null> - Its called truthful type and Union type, which means the method can return either a User object or null if no user is found with the given id.
    async findById(id: number): Promise<User | null> {
        const user = await User.findByPk(id);
        return user;
    }

    // This method will find a user by their email address.
    async findByEmail(email: string): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        return user;
    }

    // This method will get all users from the database.
    async findAll(): Promise<User[]> {
        const users = await User.findAll();
        return users;
    }
}

// Now creating the instance of the UserRepository class to be used in other parts of the application.
export const userRepository = new UserRepository();

