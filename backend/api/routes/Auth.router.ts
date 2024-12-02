import express from "express";

import { ServerPaths } from "../../config";
import { AuthMiddleware } from "../middlewares";
import { AuthController } from "../controllers";

const { LOGIN, REGISTER, PROTECTED } = ServerPaths;
const authController = new AuthController();

const authRouter = express();

authRouter.post(REGISTER, authController.registerUser);
authRouter.post(LOGIN, authController.loginUser);
authRouter.get(
    PROTECTED,
    AuthMiddleware,
    authController.verifyUserAuthorization
);

export default authRouter;
