import prisma from "../../prisma";

import bcrypt from "bcryptjs";

import { UserModel } from "../models";

class UserService {
    async createUser(userData: UserModel.CreateUser): Promise<UserModel.User> {
        const { login, password, name, surname, role } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const newUser = await prisma.user.create({
                data: {
                    login,
                    password: hashedPassword,
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

    async findManyUsers(
        userSelector?: UserModel.UserSelector
    ): Promise<UserModel.User[]> {
        try {
            let users;
            if (userSelector) {
                users = await prisma.user.findMany({
                    where: userSelector,
                });
            } else {
                users = await prisma.user.findMany();
            }
            return users;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findUserByID(userID: number): Promise<UserModel.User | Boolean> {
        try {
            const user = await prisma.user.findUnique({
                where: { user_id: Number(userID) },
            });
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUser(
        userID: number,
        userData: UserModel.UpdateUser
    ): Promise<UserModel.User> {
        const { name, surname, role } = userData;

        try {
            const updatedUser = await prisma.user.update({
                where: { user_id: Number(userID) },
                data: { name, surname, role },
            });

            return updatedUser;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteUser(userID: number): Promise<UserModel.User> {
        try {
            const deletedUser = await prisma.user.delete({
                where: { user_id: Number(userID) },
            });
            return deletedUser;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default UserService;
