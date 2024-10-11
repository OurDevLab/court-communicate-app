import * as core from "express-serve-static-core";

import { UserService } from "../services";
const userActions = new UserService();

// 1. CRUD dla modelu User (Użytkownik)

class UserController {
    // a) Tworzenie użytkownika:

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

            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({
                error: "Nie udało się utworzyć użytkownika",
            });
        }
    }

    // b) Odczyt wszystkich użytkowników:

    async getAllUsers(req: core.Request, res: core.Response) {
        try {
            const users = await userActions.findManyUsers();

            if (users) {
                res.status(200).json(users);
            } else {
                res.status(404).json({
                    error: "Nie znaleziono żadnych użytkowników",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Nie udało się pobrać listy użytkowników",
            });
        }
    }

    // c) Odczyt konkretnego użytkownika:

    async getSelectedUser(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const user = await userActions.findUserByID(Number(id));

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    error: "Użytkownik nie został znaleziony",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Błąd podczas pobierania danych użytkownika",
            });
        }
    }

    // d) Aktualizacja użytkownika:

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
                res.status(200).json({
                    message: "Wybrany użytkownik został zaktualizowany",
                });
            } else {
                res.status(404).json({
                    error: "Nie znaleziono użytkownika przeznaczonego do aktualizacji",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Aktualizacja użytkownika nie powiodła się",
            });
        }
    }

    // e) Usunięcie użytkownika:

    async removeUser(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const removedUser = await userActions.deleteUser(Number(id));

            if (removedUser) {
                res.status(200).json({ message: "Użytkownik został usunięty" });
            } else {
                res.status(404).json({
                    error: "Nie znaleziono użytkownika przeznaczonego do usunięcia",
                });
            }
        } catch (error) {
            res.status(500).json({ error: "Nie udało się usunąć użytkownika" });
        }
    }
}

export default UserController;
