import { z } from 'zod'





export const JobSchema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required."),
    requirements: z.array(z.string()).optional(),
    salary: z.number().positive("Salary must be positive number"),
    experienceLevel: z.number().min(0, "Experince level must atleast be 0"),
    location: z.string().nonempty("Location is required"),
    jobType: z.string().nonempty("Job Type is required."),
    position: z.number().positive("Position must be a positive number"),
    company: z.string().nonempty("Company ID Sis required"),
    created_by: z.string().nonempty("Created by User Id is required"),
    applications: z.array(z.string()).optional()
})

export type JobType = z.infer<typeof JobSchema>

export const querySchema = z.object({
    keyword: z.string().optional(),
    requirements: z.string().optional(),
    sortBy: z.enum(["createdAt", "title"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional()
})

export const jobIdSchema = z.object({
    id: z.string().nonempty("Job ID is required.")
})