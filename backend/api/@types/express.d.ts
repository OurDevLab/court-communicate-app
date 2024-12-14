import * as core from "express-serve-static-core";

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            id: number;
            role: string;
            email: string;
        };
    }
}
