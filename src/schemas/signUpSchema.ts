import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(25, "Username should not contain more than 25 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special characters");


  export const signUpSchema =z.object({
    username:usernameValidation,
    email:z.string().email({message:"invalid email adress"}),
    password:z.string().min(6,  {message:"password should  contain at least 6 characters"})

  })
