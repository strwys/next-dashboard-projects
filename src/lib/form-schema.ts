import { z } from "zod";

export const signInFormSchema = z.object({
	userid: z 
    .string({required_error: "Please input your user id"}),
	password: z
	.string({required_error:"Please input your password"})
})