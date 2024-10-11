import prisma from "../../prisma";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AuthModel } from "../models";

class AuthService {
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async verifyPassword(
        sentPassword: string,
        sourcePassword: string
    ): Promise<Boolean> {
        return await bcrypt.compare(sentPassword, sourcePassword);
    }

    async createUser(
        userData: AuthModel.RegisterData
    ): Promise<AuthModel.UserAuthData> {
        const { login, password, name, surname, role } = userData;

        try {
            const newUser = await prisma.user.create({
                data: {
                    login,
                    password,
                    name,
                    surname,
                    role,
                },
            });

            return newUser;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findUserByLogin(login: string): Promise<AuthModel.UserAuthData> {
        return await prisma.user.findUnique({ where: { login } });
    }

    async generateToken({
        id,
        role,
        key,
        expiresIn,
    }: AuthModel.GenerateTokenData): Promise<AuthModel.Token> {
        return jwt.sign({ id, role }, key, { expiresIn });
    }
}

export default AuthService;
