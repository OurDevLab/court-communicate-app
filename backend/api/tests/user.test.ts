import prisma from "../../prisma";
import bcrypt from "bcryptjs";

import { UserService } from "../services";
import {
    mockUser,
    mockUserCreateInput,
    mockUserUpdateInput,
} from "./utils/user.utils";

jest.mock("../../prisma", () => ({
    user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));

jest.mock("bcryptjs", () => ({
    hash: jest.fn(),
}));

describe("UserService", () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
        jest.clearAllMocks();
    });

    describe("createUser", () => {
        it("should create a new user", async () => {
            const prismaMock = prisma.user.create as jest.Mock;
            const bcryptMock = bcrypt.hash as jest.Mock;

            bcryptMock.mockResolvedValue("hashedpassword123");
            prismaMock.mockResolvedValue(mockUser);

            const result = await userService.createUser(mockUserCreateInput);

            expect(bcryptMock).toHaveBeenCalledWith(
                mockUserCreateInput.password,
                10
            );
            expect(prismaMock).toHaveBeenCalledWith({
                data: {
                    ...mockUserCreateInput,
                    password: "hashedpassword123",
                },
            });
            expect(result).toEqual(mockUser);
        });

        it("should throw an error when creation fails", async () => {
            const prismaMock = prisma.user.create as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                userService.createUser(mockUserCreateInput)
            ).rejects.toThrow("Database error");
        });
    });

    describe("findManyUsers", () => {
        it("should return a list of users", async () => {
            const prismaMock = prisma.user.findMany as jest.Mock;
            prismaMock.mockResolvedValue([mockUser]);

            const result = await userService.findManyUsers();
            expect(prismaMock).toHaveBeenCalled();
            expect(result).toEqual([mockUser]);
        });

        it("should handle errors when fetching users", async () => {
            const prismaMock = prisma.user.findMany as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(userService.findManyUsers()).rejects.toThrow(
                "Database error"
            );
        });
    });

    describe("findUserByID", () => {
        it("should return a user by ID", async () => {
            const prismaMock = prisma.user.findUnique as jest.Mock;
            prismaMock.mockResolvedValue(mockUser);

            const result = await userService.findUserByID(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { user_id: 1 },
            });
            expect(result).toEqual(mockUser);
        });

        it("should return false if user not found", async () => {
            const prismaMock = prisma.user.findUnique as jest.Mock;
            prismaMock.mockResolvedValue(null);

            const result = await userService.findUserByID(1);
            expect(result).toBe(false);
        });

        it("should handle errors when fetching user by ID", async () => {
            const prismaMock = prisma.user.findUnique as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(userService.findUserByID(1)).rejects.toThrow(
                "Database error"
            );
        });
    });

    describe("updateUser", () => {
        it("should update a user", async () => {
            const prismaMock = prisma.user.update as jest.Mock;
            prismaMock.mockResolvedValue(mockUser);

            const result = await userService.updateUser(1, mockUserUpdateInput);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { user_id: 1 },
                data: mockUserUpdateInput,
            });
            expect(result).toEqual(mockUser);
        });

        it("should handle errors when updating user", async () => {
            const prismaMock = prisma.user.update as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                userService.updateUser(1, mockUserUpdateInput)
            ).rejects.toThrow("Database error");
        });
    });

    describe("deleteUser", () => {
        it("should delete a user", async () => {
            const prismaMock = prisma.user.delete as jest.Mock;
            prismaMock.mockResolvedValue(mockUser);

            const result = await userService.deleteUser(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { user_id: 1 },
            });
            expect(result).toEqual(mockUser);
        });

        it("should handle errors when deleting user", async () => {
            const prismaMock = prisma.user.delete as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(userService.deleteUser(1)).rejects.toThrow(
                "Database error"
            );
        });
    });
});
