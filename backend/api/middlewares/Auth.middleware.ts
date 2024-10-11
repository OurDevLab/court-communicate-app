import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const authenticateToken = (
    // req: Request,
    // res: Response,
    // next: NextFunction
    req,
    res,
    next
) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Brak tokenu" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Nieprawidłowy token" });
        }

        // Przechowujemy dane użytkownika w obiekcie request
        req.user = user;
        next();
    });
};
