import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../prisma";
import { AuthService } from "../services";

import {
    mockUser,
    mockRegisterData,
    mockToken,
    mockTokenPayload,
} from "./utils/auth.utils";

jest.mock("../../prisma", () => ({
    user: {
        create: jest.fn(),
        findUnique: jest.fn(),
    },
}));

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("AuthService", () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
        jest.clearAllMocks();
    });

    describe("hashPassword", () => {
        it("should hash the password using bcrypt", async () => {
            const bcryptHashMock = bcrypt.hash as jest.Mock;
            bcryptHashMock.mockResolvedValue("$2a$10$saltrandomhash");

            const hashedPassword = await authService.hashPassword(
                "password123"
            );
            expect(bcryptHashMock).toHaveBeenCalledWith("password123", 10);
            expect(hashedPassword).toBe("$2a$10$saltrandomhash");
        });
    });

    describe("verifyPassword", () => {
        it("should verify the password using bcrypt", async () => {
            const bcryptCompareMock = bcrypt.compare as jest.Mock;
            bcryptCompareMock.mockResolvedValue(true);

            const isValid = await authService.verifyPassword(
                "password123",
                mockUser.password
            );
            expect(bcryptCompareMock).toHaveBeenCalledWith(
                "password123",
                mockUser.password
            );
            expect(isValid).toBe(true);
        });

        it("should return false for invalid password", async () => {
            const bcryptCompareMock = bcrypt.compare as jest.Mock;
            bcryptCompareMock.mockResolvedValue(false);

            const isValid = await authService.verifyPassword(
                "wrongpassword",
                mockUser.password
            );
            expect(bcryptCompareMock).toHaveBeenCalledWith(
                "wrongpassword",
                mockUser.password
            );
            expect(isValid).toBe(false);
        });
    });

    describe("createUser", () => {
        it("should create a new user in the database", async () => {
            const prismaMock = prisma.user.create as jest.Mock;
            prismaMock.mockResolvedValue(mockUser);

            const newUser = await authService.createUser(mockRegisterData);
            expect(prismaMock).toHaveBeenCalledWith({
                data: mockRegisterData,
            });
            expect(newUser).toEqual(mockUser);
        });

        it("should throw an error when user creation fails", async () => {
            const prismaMock = prisma.user.create as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                authService.createUser(mockRegisterData)
            ).rejects.toThrow("Database error");
        });
    });

    describe("findUserByLogin", () => {
        it("should find a user by login", async () => {
            const prismaMock = prisma.user.findUnique as jest.Mock;
            prismaMock.mockResolvedValue(mockUser);

            const foundUser = await authService.findUserByLogin("testuser");
            expect(prismaMock).toHaveBeenCalledWith({
                where: { login: "testuser" },
            });
            expect(foundUser).toEqual(mockUser);
        });

        it("should return null if no user is found", async () => {
            const prismaMock = prisma.user.findUnique as jest.Mock;
            prismaMock.mockResolvedValue(null);

            const foundUser = await authService.findUserByLogin(
                "nonexistentuser"
            );
            expect(prismaMock).toHaveBeenCalledWith({
                where: { login: "nonexistentuser" },
            });
            expect(foundUser).toBeNull();
        });
    });

    describe("generateToken", () => {
        it("should generate a JWT token", () => {
            const jwtSignMock = jwt.sign as jest.Mock;
            jwtSignMock.mockReturnValue(mockToken);

            const token = authService.generateToken(mockTokenPayload);
            expect(jwtSignMock).toHaveBeenCalledWith(
                { id: mockTokenPayload.id, role: mockTokenPayload.role },
                mockTokenPayload.key,
                { expiresIn: mockTokenPayload.expiresIn }
            );
            expect(token).toBe(mockToken);
        });
    });
});
