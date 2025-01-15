import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { UserPayload } from "../types/express";
import { JWT_SECRET } from "..";


const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication token is missing or Invalid."
            })
        }
        const token = authHeader.split(" ")[1];
        if(!JWT_SECRET) {
            throw new Error("Jwt secret key is not configured")
        }
        const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;

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