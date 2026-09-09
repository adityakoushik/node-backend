import { RegisterUserSchema } from "../modules/users/user.validation";

const result =
    RegisterUserSchema.safeParse({
        name: "K",
        email: "not-an-email",
        password: "123"
    });

console.log(result);