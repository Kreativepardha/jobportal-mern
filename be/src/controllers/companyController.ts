import { Request, Response } from "express";
import { CompanyShcema } from "../validation/companySchema";
import { Company } from "../models/companySchema";
import logger from "../utils/logger";







export const registerCompany = async(req:Request, res: Response) => {
    try {
        const validatedData = CompanyShcema.parse(req.body);

        let existingCompany = await Company.findOne({ name: validatedData.name })

        if(existingCompany) {
             res.status(400).json({message: "You can't register the sam ecompany again", success: false})
        }

        const newCompany = await Company.create({
            name: validatedData.name,
            description: validatedData.description,
            website: validatedData.website,
            location: validatedData.location,
            logo: validatedData.logo,
            userId: validatedData.userId
        })

         res.status(201).json({
            message: "Company registered succesfuully",
            company: newCompany,
            success: true
        })


    } catch (err) {
        logger.error(`Error in register Company:: ${err.message}`)
   
        if (err.name === "ZodError") {
             res.status(400).json({
                message: "Validation failed.",
                errors: err.errors, // Include Zod validation errors
                success: false,
            });
        }
   
         res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
   
   
   
   
   
    }
}


export const getCompany = async (req:Request, res: Response) => {
    try {
        const userId = req.isPaused;
        const companies = await Company.find({ userId })

        if(!companies || companies.length === 0) {
             res.status(404).json({
                message: "No companies found",
                success: false
            })
        }
         res.status(200).json({
            companies,
            success: true,
        });

    } catch (err) {
        logger.error(`Error in getCompany: ${err.message}`);
         res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
}

export const getCompanyById = async (req:Request, res: Response) => {
    try {
        const { id } = req.params
        const company = await Company.findById(id)

        if(!company) {
             res.status(404).json({
                message: "Company Not Found",
                success: false
            })
        }

         res.status(200).json({
            company,
            succesS: true
        })
    } catch (err) {
        logger.error(`Error in getCompanyById: ${error.message}`);
         res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
}


export const updateCompany = async(req: Request, res: Response) => {
    try {
        const { name, description, website, location } = req.body;
        let logo;
        if (req.file) {
            const uploadPath = path.join(__dirname, "../uploads", req.file.filename);
            logo = uploadPath; 
        }
        const updateData: any = { name, description, website, location };
        if (logo) {
            updateData.logo = logo;
        }
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
             res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

         res.status(200).json({
            message: "Company information updated.",
            company,
            success: true,
        });

    } catch (err) {
        logger.error(`Error in updateCompany: ${err.message}`);
         res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
}