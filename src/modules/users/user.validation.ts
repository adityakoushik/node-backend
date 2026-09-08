import { z } from "zod";

export const RegisteUserSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters long"),
    email: z.string().trim().toLowerCase().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(20, "Password cannot exceed 20 characters")
})


/**
 * * z.infer<typeof RegisteUserSchema>; means 
 * * This is not the standard JavaScript `typeof`; it is the TypeScript `typeof` operator.
 * ? Its Job is I am giving you a JavaScript variable, and you extract the TypeScript type from it. 
 * * In this case, I am giving you the RegisteUserSchema variable, and you extract the TypeScript type from it.
 * * `registerUserSchema` is a runtime object (value). However, to derive a type from Zod, one first needs to know the object's specific TypeScript type.
 * ! What is z.infer<...> doing?
 * * Function: This is a special Type Utility of Zod.
 * * Its means "I am giving you a Zod schema type. You figure out what kind of TypeScript object type would be generated if this schema successfully passes."
 * ! Why is it needed?
 * * It eliminates the need for you to manually write out TypeScript interfaces or types. Zod automatically generates the types based on your schema.
 */
export type RegisterUserInput = z.infer<typeof RegisteUserSchema>;