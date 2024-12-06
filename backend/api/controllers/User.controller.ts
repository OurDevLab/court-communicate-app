import * as core from "express-serve-static-core";

import { ServerStatuses } from "../../config";
import { UserService } from "../services";

const { OK, CREATED, INTERNAL_ERROR, NOT_FOUND } = ServerStatuses;
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
                error: "Nie udało się utworzyć użytkownika",
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
                    error: "Nie znaleziono żadnych użytkowników",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Nie udało się pobrać listy użytkowników",
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
                    error: "Użytkownik nie został znaleziony",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Błąd podczas pobierania danych użytkownika",
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
                    message: "Wybrany użytkownik został zaktualizowany",
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: "Nie znaleziono użytkownika przeznaczonego do aktualizacji",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Aktualizacja użytkownika nie powiodła się",
            });
        }
    }

    async removeUser(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const removedUser = await userActions.deleteUser(Number(id));

            if (removedUser) {
                res.status(OK).json({ message: "Użytkownik został usunięty" });
            } else {
                res.status(NOT_FOUND).json({
                    error: "Nie znaleziono użytkownika przeznaczonego do usunięcia",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Nie udało się usunąć użytkownika",
            });
        }
    }
}

export default UserController;
