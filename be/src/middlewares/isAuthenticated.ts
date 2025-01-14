import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { UserPayload } from "../types/express";


const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication token is missing or Invalid."
            })
        }
        const token = authHeader.split(" ")[1];
        const secretKey = process.env.JWT_SECRET as string;
        if(!secretKey) {
            throw new Error("Jwt secret key is not configured")
        }
        const decoded = jwt.verify(token, secretKey) as UserPayload;

        req.user = decoded;
        next()
    } catch (err) {
        console.error("Error is authentication middleware::", err);
        return res.status(401).json({
            message: "Authentication failed."
        })
    }
}

export default isAuthenticated