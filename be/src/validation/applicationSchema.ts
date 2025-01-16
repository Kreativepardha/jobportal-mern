import {z} from 'zod'

export const applicationSchema = z.object({
    job: z.string().nonempty("Job ID is required"),
    applicant: z.string().nonempty("Applicant ID is required"),
    status: z.enum(["pending", "accepted", "rejected"]).optional()
})


export const updateStatusSchema = z.object({
    status: z.enum(["pending", "accepted", "rejected", "Invalid Status"])

})


export const jobIdSchema = z.object({
    id: z.string().nonempty("Job Id is required")
})

export const applicationIdSchema = z.object({
    id: z.string().nonempty("Application ID is required."),
});