import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(5),
    email : z.string().email(),
    password: z.string().min(5,{message: "String must contain at least 5 character(s)"})
})

export const signInSchema = signUpSchema.omit({name: true})