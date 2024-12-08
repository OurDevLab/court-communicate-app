import * as core from "express-serve-static-core";

import { ConfigVariables, ServerStatuses, ServerMessages } from "../../config";
import { AuthService } from "../services";

const { jwtSecret, jwtExpiration } = ConfigVariables;
const { OK, CREATED, BAD_REQUEST, INTERNAL_ERROR, NOT_FOUND, UNAUTHORIZED } =
    ServerStatuses;
const { AuthMessages } = ServerMessages;

const authActions = new AuthService();

class AuthController {
    async registerUser(req: core.Request, res: core.Response) {
        const { login, password, name, surname, role } = req.body;

        try {
            const hashedPassword = authActions.hashPassword(password);

            const newUser = await authActions.createUser({
                login,
                password: hashedPassword,
                name,
                surname,
                role,
            });

            if (newUser) {
                res.status(CREATED).json({
                    message: AuthMessages.REGISTER_SUCCESS,
                    user: newUser,
                });
            } else {
                res.status(BAD_REQUEST).json({
                    error: AuthMessages.REGISTER_BAD_DATA,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: AuthMessages.REGISTER_ERROR,
            });
        }
    }

    async loginUser(req: core.Request, res: core.Response) {
        const { login, password } = req.body;

        try {
            const user = await authActions.findUserByLogin(login);

            if (!user) {
                return res
                    .status(NOT_FOUND)
                    .json({ error: AuthMessages.LOGIN_NOT_FOUND });
            }

            const isPasswordValid = await authActions.verifyPassword(
                password,
                user.password
            );

            if (!isPasswordValid) {
                return res
                    .status(UNAUTHORIZED)
                    .json({ error: AuthMessages.LOGIN_BAD_PASSWORD });
            }

            const token = authActions.generateToken({
                id: user.user_id,
                role: user.role,
                key: jwtSecret,
                expiresIn: jwtExpiration,
            });

            if (token) {
                res.status(OK).json({
                    message: AuthMessages.LOGIN_SUCCESS,
                    token,
                });
            } else {
                res.status(UNAUTHORIZED).json({
                    error: AuthMessages.LOGIN_AUTHORIZATION_FAIL,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: AuthMessages.LOGIN_ERROR,
            });
        }
    }

    verifyUserAuthorization = (req: core.Request, res: core.Response) => {
        res.json({ message: AuthMessages.AUTHORIZATION_VERIFICATION });
    };
}

export default AuthController;
