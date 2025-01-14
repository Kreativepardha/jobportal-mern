import { z } from 'zod'

// export const userSchema = z.object({
//     fullname: z.string().min(1, "Fullname is required"),
//     email: z.string().email("Invalid Email Address"),
//     phoneNumber: z.number().min(10, "Phone number must be atleast 10 digits."),
//     password: z.string().min(6, "Password must be atleast 6 chars long"),
//     role: z.enum(["student", "recruiter"], {
//         errorMap: () => ({ message: "Role must be 'student' or 'recruiter' ."})
//     }),
//     profile: z.object({
//         bio: z.string().optional(),
//         skills: z.string.url("Resume must be a valid URL.").optional(),
//         resumeOriginalName: z.string().optional(),
//         company: z.string().optional(),
//         profilePhoto: z.string().url().optional().default(""),
//     })
//     .optional(),
// })


// export const validateUser = (data: unknown) => {
//     return userSchema.safeParse(data)
// }


export const registerSchema = z.object({
    fullname: z.string().min(1, "Fullname is required."),
    email: z.string().email("Invalid email format."),
    phoneNumber: z
        .string()
        .regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    role: z.enum(["student", "recruiter"]),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email format."),
    password: z.string().min(1, "Password is required."),
    role: z.enum(["student", "recruiter"]),
});

export const updateProfileSchema = z.object({
    fullname: z.string().optional(),
    email: z.string().email("Invalid email format.").optional(),
    phoneNumber: z
        .string()
        .regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits.")
        .optional(),
    bio: z.string().optional(),
    skills: z.string().optional(), // Will be split later
});
