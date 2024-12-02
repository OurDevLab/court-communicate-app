import express from "express";

import { ServerPaths } from "../../config";
import { UserController } from "../controllers";

const { USERS } = ServerPaths;
const userController = new UserController();

const userRouter = express();

userRouter.post(USERS, userController.addNewUser);
userRouter.get(USERS, userController.getAllUsers);
userRouter.get(`${USERS}/:id`, userController.getSelectedUser);
userRouter.put(`${USERS}/:id`, userController.updateUser);
userRouter.delete(`${USERS}/:id`, userController.removeUser);

export default userRouter;
