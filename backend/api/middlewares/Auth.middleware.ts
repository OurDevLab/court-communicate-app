// import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { ConfigVariables } from "../../config";
const { jwtSecret } = ConfigVariables;

// export interface AuthenticatedRequest extends Request {
//     user?: {
//         userId: number;
//         role: string;
//     };
// }

const authenticateToken = (
    // req: AuthenticatedRequest,
    // res: Response,
    // next: NextFunction
    req,
    res,
    next
) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Brak tokenu" });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Nieprawidłowy token" });
        }

        req.user = user as { userId: number; role: string };
        next();
    });
};

export default authenticateToken;
