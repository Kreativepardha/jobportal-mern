import { z } from 'zod'




export const CompanyShcema = z.object({
    name: z.string().trim().nonempty("Company name is required"),
    description: z.string().trim().max(500, "Description should not exceed 500 characters").optional(),
    website: z.string().trim().url("Invalid URL").optional(),
    location: z.string().trim().optional(),
    logo: z.string().url("Invalid url fomrat").optional(),
    userId: z.string().nonempty("User id is required")
})