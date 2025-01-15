import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";







export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Save Error",
    })
}