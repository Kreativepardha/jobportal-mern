import { Request, Response } from "express";
import { jobIdSchema, JobSchema, querySchema } from "../validation/jobSchema";
import { Job } from "../models/jobModel";
import logger from "../utils/logger";
import {z, ZodError} from 'zod'


const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10;



export const postJob = async (req: Request, res: Response) => {
    try {
        const parsedBody = JobSchema.parse(req.body)
        const userId = req.id;


        let requirements: string[]

        if(Array.isArray(parsedBody.requirements)) {
            requirements = parsedBody.requirements;
        } else {
            requirements = parsedBody.requirements!.split(",")
        }


        const job = await Job.create({
            ...parsedBody,
            requirements,
            created_by: userId
        })

        logger.info(`New job created by admin ${userId}: ${job._id}`)
        
        return res.status(201).json({
            message: "New job created Successfully",
            job,
            success: true
        })
        } catch (err) {
        if(err instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation Error.",
                errors: err.errors,
                success: false
            })
        }
        logger.error("Error creating job: ", err);
        return res.status(500).json({
            message: "An error occurred while creating the job",
            success: false
        })
    }
}


export const getAllJobs = async (req: Request, res: Response) => {
    try {
        const parsedQuery = querySchema.parse(req.query);
        const {
            keyword = "",
            requirements,
            sortBy = "createdAt",
            sortOrder = "desc",
            page = DEFAULT_PAGE,
            limit = DEFAULT_LIMIT,
            location,
            company,
        } = parsedQuery;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {
            $or: [
                { title: { $regex: keyword, $options: "i"}},
                { description: {$regex: keyword , $options: "i"}},
            ]
        };

        if(requirements) {
            const requirementsArray = requirements.split(',').map(req => req.trim())
            query.requirements = { $all: requirementsArray}
        }

        if(location) {
            query.location = { $regex: location, $options: "i"}
        }
        if(company) {
            query.company = { $regex: company, $options: "i"}
        }

        const sortOptions: Record<string, 1 | -1> = {
            [sortBy]: sortOrder === "asc" ? 1 : -1,
        }

        const skip = (Number(page) - 1) * Number(limit)

        const jobs = await Job.find(query)
        .populate({ path: 'company'})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

        if(!jobs.length) {
            return res.status(404).json({
                message: "No jobs found matching the criteria",
                success: false 
            });
        }

        logger.info(`Jobs retrieved with keyword:: "${keyword}", page::${page}, limit::${limit}`);

        return res.status(200).json({
            jobs,
            pagination: {
                currentPage: page,
                totalJobs: await Job.countDocuments(query),
                totalPages: Math.ceil((await Job.countDocuments(query)) / limit),
            },
            success: true
        });
    } catch (err) {
        if(err instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation Errors",
                errors: err.errors,
                success: false
            })
        }
        logger.error(`Error in getAllJobs: ${err.message}`)
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}


export const getJobById = async (req: Request, res: Response) => {
    try {
        const parsedParams = jobIdSchema.parse(req.params)

        const job = await Job.findById(parsedParams.id)
        .populate({ path: "applications"})

        if(!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        logger.info(`Job retrieved by ID::${parsedParams.id}`)
        return res.status(200).json({
            job, 
            success: true
        })
    } catch (err) {
        if(err instanceOf z.ZodError) {
            return res.status(400).json({
                message: "Validation Errors",
                errors: err.errors,
                success: false
            })
        }
        logger.error(`Error in getJobById::${err.message}`)
        res.status(500).json({
            message: "Internal Sever Erro",
            success: false
        })
        
    }
}


export const getAdminJobs = async(req: Request, res: Response) =>{
    try {
    const adminId =req.id;
    
    const jobs =await Job.find({ created_by: adminId})
    .populate({ path: "company"})
    .sort({ createdAt: -1 });

    if(!jobs || jobs.length === 0) {
        return res.status(404).json({
            message: "Jobs not found",
            success: false
        })
    }
    logger.info(`Jobs retrieved for admin:: ${adminId}`)
    return res.status(200).json({
        jobs,
        success: true
    })
    } catch (err) {
    logger.error(`Error in getAdminJobs:: ${err.message}`)
    res.status(500).json({
        message: "Internal Sevrer error",
        success: false
    })        
    }
}