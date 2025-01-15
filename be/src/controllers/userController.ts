import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/userSchema";
import { User } from "../models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "..";
import { generateFilePath } from "../utils/helper";
import logger from "../utils/logger";






export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fullname, email, phoneNumber, password, role} = registerSchema.parse(req.body)
        
        const existingUser = await User.findOne({ email })
        if(existingUser) { 
            res.status(400).json({ message :" email already registered", success: false})
            return;
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        // from helper function
        const profilePhotoUrl = generateFilePath(req.file)

      const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhotoUrl,
            }
        });

        logger.info(`New User regsitered: ${newUser.email}`)
        
         res.status(201).json({
            newUser,
            message: "Accound created successuflly",
            success: true,
        })
    
    } catch (err) {
        next(err)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, role } = loginSchema.parse(req.body);

        const user = await User.findOne({ email })
        if(!user || !(await bcrypt.compare(password, user.password))) {
         res.status(401).json({
                message: "Invalid email or password",
                success: false
            })
            return;
        }
        if(role !== user.role) {
          res.status(403).json({
                message: "Role Mismatch",
                success: false
            })
            return 
        }

       const token = jwt.sign({
        userId: user._id
       }, JWT_SECRET) 

    res.status(200).json({
        message: `Welcome back, ${user.fullname}`,
        user,
        token,
        success: true
       })
    } catch (err) {
        next(err);
    }
}

export const logout = (req: Request,res: Response) => {
    res.status(200).json({
        message: "Logged out successfully",
        success: true
    })
}


export const updateProfile = async (req: Request, res: Response) =>  {
    try {
        const { fullname, bio, skills} = req.body;
        const userId = req.user?.id;

        const user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        if(req.file) {
            user.profile.profilePhoto = generateFilePath(req.file)
        }

        user.fullname = fullname || user.fullname
        user.profile!.bio = bio || user.profile!.bio
        user.profile!.skills = skills ? skills.split(",") : user.profile!.skills

        await user.save();

        res.status(200).json({ message: "Profile updated successfully.", success: true });
    } catch (err) {
        console.error(err);
         res.status(500).json({ message: "Internal Server Error", success: false });
    }
}