import * as core from "express-serve-static-core";

import { ServerStatuses, ServerMessages } from "../../config";
import { UserService } from "../services";

const { OK, CREATED, INTERNAL_ERROR, NOT_FOUND } = ServerStatuses;
const { UserMessages } = ServerMessages;

const userActions = new UserService();

class UserController {
    async addNewUser(req: core.Request, res: core.Response) {
        const { login, password, name, surname, role } = req.body;

        try {
            const newUser = await userActions.createUser({
                data: {
                    login,
                    password,
                    name,
                    surname,
                    role,
                },
            });

            res.status(CREATED).json(newUser);
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: UserMessages.CREATE_USER_ERROR,
            });
        }
    }

    async getAllUsers(req: core.Request, res: core.Response) {
        try {
            const users = await userActions.findManyUsers();

            if (users) {
                res.status(OK).json(users);
            } else {
                res.status(NOT_FOUND).json({
                    error: UserMessages.NONE_USER_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: UserMessages.GET_USERS_ERROR,
            });
        }
    }

    async getSelectedUser(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const user = await userActions.findUserByID(Number(id));

            if (user) {
                res.status(OK).json(user);
            } else {
                res.status(NOT_FOUND).json({
                    error: UserMessages.SELECTED_USER_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: UserMessages.GET_SELECTED_USER_ERROR,
            });
        }
    }

    async updateUser(req: core.Request, res: core.Response) {
        const { id } = req.params;
        const { name, surname, role } = req.body;
        try {
            const updatedUser = await userActions.updateUser(Number(id), {
                name,
                surname,
                role,
            });

            if (updatedUser) {
                res.status(OK).json({
                    message: UserMessages.UPDATE_USER_SUCCESS,
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: UserMessages.USER_TO_UPDATE_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: UserMessages.UPDATE_USER_ERROR,
            });
        }
    }

    async removeUser(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const removedUser = await userActions.deleteUser(Number(id));

            if (removedUser) {
                res.status(OK).json({
                    message: UserMessages.DELETE_USER_SUCCES,
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: UserMessages.USER_TO_DELETE_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: UserMessages.DELETE_USER_ERROR,
            });
        }
    }
}

export default UserController;
