import { z } from "zod";

export const RegisterUserSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters long"),
    email: z.string().trim().toLowerCase().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(20, "Password cannot exceed 20 characters")
})


/**
 * * z.infer<typeof RegisterUserSchema>; means 
 * * typeof saying that give me the type of RegisterUserSchema variable type which is zod schema
 * * Next z.infer saying that give me the type of the schema and convert it to a TypeScript type
 * * So, Automatically, the RegisterUserInput type will have the same shape as the RegisterUserSchema, with the same properties and types. Which we have written in src\modules\users\user.types.ts file manually. 
 * * So, we don't have to write the same type again and again. We can just use the zod schema to infer the type.
 * ? export interface RegisterUserInput {
      name: string;
      email: string;
      password: string;
    }
 */
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;