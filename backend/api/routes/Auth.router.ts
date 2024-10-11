import express from "express";
import * as dotenv from "dotenv";

import { authenticateToken } from "../middlewares/Auth.middleware";

import AuthController from "../controllers/Auth.controller";

const authController = new AuthController();

const authRouter = express();
dotenv.config();

authRouter.post("/register", authController.registerUser);

authRouter.post("/login", authController.loginUser);

authRouter.get(
    "/protected",
    authenticateToken,
    authController.verifyUserAuthorization
);

export default authRouter;
