import { Request, Response } from "express";
import { applicationIdSchema, jobIdSchema, updateStatusSchema } from "../validation/applicationSchema";
import { Application } from "../models/applicationModel";
import { Job } from "../models/jobModel";
import {z} from 'zod'



export const applyJob = async (req: Request , res: Response) => {
    try {
        const { id: jobId } = jobIdSchema.parse(req.params)
        const userId = req.id

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId})
        if(existingApplication) {
             res.status(400).json({
                message: "YOu have already applied for this job",
                success: false
            })
        }

        const job  = await Job.findById(jobId)
        if(!job) {
             res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        })

        job!.applications.push(newApplication._id)
        await job!.save()

         res.status(201).json({
            message: "Job applied Successfully",
            success: true
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
       console.error(`Error in applyjobs: ${err.message}`)
       res.status(500).json({
        message: 'Internal Server Error',
        success: false 
       })
    }
}


export const getAppliedJobs = async (req: Request, res: Response) => {
    try {
        const userId = req.id;
    
         const applications = await Application.find({ applicant: userId})
                .sort({ createdAt: -1})
                .populate({
                    path: "job",
                    options: { sort: { createdAt: -1}},
                    populate: {
                        path: "company",
                        options: { sort: {createdAt: -1}},
                    },
                })

                if(!applications || applications.length === 0) {
                     res.status(404).json({
                        message: "No Applications Found.",
                        success: false,
                    })
                }

                 res.status(200).json({
                    applications,
                    success: true
                })
        } catch (err) {
            console.error(`Error in getAppliedJobs: ${err.message}`)
            res.status(500).json({
                message: "Internal Server error",
                success: false
            })
    }
}

export const getApplicants = async (req: Request, res: Response) => {
    try {
        // Validate job ID parameter
        const { id: jobId } = jobIdSchema.parse(req.params);

        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
            },
        });

        if (!job) {
             res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

         res.status(200).json({
            job,
            success: true,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
             res.status(400).json({
                message: "Validation error.",
                errors: error.errors,
                success: false,
            });
        }
        console.error(`Error in getApplicants: ${error.message}`);
        res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const { status } = updateStatusSchema.parse(req.body);
        const { id: applicationId } = applicationIdSchema.parse(req.params);

        const application = await Application.findById(applicationId);
        if (!application) {
             res.status(404).json({
                message: "Application not found.",
                success: false,
            });
        }

        application.status = status.toLowerCase();
        await application.save();

         res.status(200).json({
            message: "Status updated successfully.",
            success: true,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
             res.status(400).json({
                message: "Validation error.",
                errors: error.errors,
                success: false,
            });
        }
        console.error(`Error in updateStatus: ${error.message}`);
        res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};