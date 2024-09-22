import * as core from "express-serve-static-core";

import * as dotenv from "dotenv";
dotenv.config();

import { AuthService } from "../services";
const authActions = new AuthService();

// Sekret do generowania JWT (powinien być bezpiecznie przechowywany)
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const TOKEN_EXPIRATION = process.env.JWT_TOKEN_EXPIRES || "1h";

class AuthController {
    async registerUser(req: core.Request, res: core.Response) {
        const { login, password, name, surname, role } = req.body;

        try {
            // Haszowanie hasła
            const hashedPassword = authActions.hashPassword(password);

            // Tworzenie użytkownika w bazie danych
            const newUser = await authActions.createUser({
                login,
                password: hashedPassword,
                name,
                surname,
                role,
            });

            if (newUser) {
                res.status(201).json({
                    message: "Rejestracja zakończona sukcesem",
                    user: newUser,
                });
            } else {
                res.status(400).json({
                    error: "Podane dane są nieprawidłowe, rejestracja nie powiodła się",
                });
            }
        } catch (error) {
            res.status(500).json({ error: "Błąd podczas rejestracji" });
        }
    }

    async loginUser(req: core.Request, res: core.Response) {
        const { login, password } = req.body;

        try {
            // Znalezienie użytkownika w bazie danych
            const user = await authActions.findUserByLogin(login);

            if (!user) {
                return res
                    .status(404)
                    .json({ error: "Nie znaleziono użytkownika" });
            }

            // Weryfikacja hasła
            const isPasswordValid = await authActions.verifyPassword(
                password,
                user.password
            );

            if (!isPasswordValid) {
                return res.status(401).json({ error: "Nieprawidłowe hasło" });
            }

            // Generowanie tokenu JWT
            const token = authActions.generateToken({
                id: user.user_id,
                role: user.role,
                key: SECRET_KEY,
                expiresIn: TOKEN_EXPIRATION,
            });

            if (token) {
                res.status(200).json({
                    message: "Zalogowano pomyślnie",
                    token,
                });
            } else {
                res.status(401).json({
                    error: "Nieprawidłowe dane do uwierzytelnienia przez token",
                });
            }
        } catch (error) {
            res.status(500).json({ error: "Błąd podczas logowania" });
        }
    }

    verifyUserAuthorization = (req: core.Request, res: core.Response) => {
        res.json({ message: "Masz dostęp do chronionego zasobu" });
    };
}

export default AuthController;
