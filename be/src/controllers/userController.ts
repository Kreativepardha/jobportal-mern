import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/userSchema";
import { User } from "../models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'






export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fullname, email, phoneNumber, password, role} = registerSchema.parse(req.body)
        
        const existingUser = await User.findOne({ email })
        if(existingUser) { 
            return res.status(400).json({ message :" email already registered", success: false})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        
        let profilePhotoUrl = null;
        if(req.file) {
            profilePhotoUrl = `/uploads/${req.file.filename}`
        }

      const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            // profile: {
            //     profilePhoto: profilePhotoUrl,
            // }
        });

        return res.status(201).json({
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
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
        if(role !== user.role) {
            return res.status(403).json({
                message: "Role Mismatch",
                success: false
            })
        }

       const token = jwt.sign({
        userId: user._id
       }, JWT_SECRET) 

       return res.status(200).json({
        message: `Welcome back, ${user.fullname}`,
        user,
        success: true
       })
    } catch (err) {
        next(err);
    }
}

export const logout = (req: Request,res: Response) => {
    return
}