import { Request, Response, NextFunction } from "express";
import { decodeJwtToken } from "../utils/helper.js";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const header = req.headers.authorization;

    if(!header){
        return res.status(401).json({
            message: "Token missing"
        })
    }

    const token = header.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: "Invalid token"
        });
    }

    const decoded = decodeJwtToken(token);

    if(!decoded){
        return res.status(401).json({
            message: "Token expired"
        });
    }

    req.user = {
        sub: decoded.sub as string,
        email: decoded.email as string,
        role: decoded.role as string,
    }
    next();
}