import z from "zod";

export const userLoginZodSchema=z.object({
    email:z.string(),
    password:z.string()
})