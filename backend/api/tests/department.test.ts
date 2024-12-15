import prisma from "../../prisma";
import { DepartmentService } from "../services";

import {
    mockDepartment,
    mockDepartmentCreateInput,
    mockDepartmentUpdateInput,
    mockDepartmentSelector,
} from "./utils/department.utils";

jest.mock("../../prisma", () => ({
    department: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));

describe("DepartmentService", () => {
    let departmentService: DepartmentService;

    beforeEach(() => {
        departmentService = new DepartmentService();
        jest.clearAllMocks();
    });

    describe("createDepartment", () => {
        it("should create a new department", async () => {
            const prismaMock = prisma.department.create as jest.Mock;
            prismaMock.mockResolvedValue(mockDepartment);

            const result = await departmentService.createDepartment(
                mockDepartmentCreateInput
            );
            expect(prismaMock).toHaveBeenCalledWith({
                data: mockDepartmentCreateInput,
            });
            expect(result).toEqual(mockDepartment);
        });

        it("should throw an error when department creation fails", async () => {
            const prismaMock = prisma.department.create as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                departmentService.createDepartment(mockDepartmentCreateInput)
            ).rejects.toThrow("Database error");
        });
    });

    describe("findManyDepartments", () => {
        it("should return all departments", async () => {
            const prismaMock = prisma.department.findMany as jest.Mock;
            prismaMock.mockResolvedValue([mockDepartment]);

            const result = await departmentService.findManyDepartments();
            expect(prismaMock).toHaveBeenCalledWith();
            expect(result).toEqual([mockDepartment]);
        });

        it("should filter departments by selector", async () => {
            const prismaMock = prisma.department.findMany as jest.Mock;
            prismaMock.mockResolvedValue([mockDepartment]);

            const result = await departmentService.findManyDepartments(
                mockDepartmentSelector
            );
            expect(prismaMock).toHaveBeenCalledWith({
                where: mockDepartmentSelector,
            });
            expect(result).toEqual([mockDepartment]);
        });

        it("should throw an error when fetching departments fails", async () => {
            const prismaMock = prisma.department.findMany as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                departmentService.findManyDepartments()
            ).rejects.toThrow("Database error");
        });
    });

    describe("findDepartmentsByCourtID", () => {
        it("should return departments by court ID", async () => {
            const prismaMock = prisma.department.findMany as jest.Mock;
            prismaMock.mockResolvedValue([mockDepartment]);

            const result = await departmentService.findDepartmentsByCourtID(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { court_id: 1 },
            });
            expect(result).toEqual([mockDepartment]);
        });

        it("should throw an error when fetching departments fails", async () => {
            const prismaMock = prisma.department.findMany as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                departmentService.findDepartmentsByCourtID(1)
            ).rejects.toThrow("Database error");
        });
    });

    describe("findDepartmentByID", () => {
        it("should return a department by ID", async () => {
            const prismaMock = prisma.department.findUnique as jest.Mock;
            prismaMock.mockResolvedValue(mockDepartment);

            const result = await departmentService.findDepartmentByID(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockDepartment);
        });

        it("should return false if no department is found", async () => {
            const prismaMock = prisma.department.findUnique as jest.Mock;
            prismaMock.mockResolvedValue(null);

            const result = await departmentService.findDepartmentByID(1);
            expect(result).toBe(false);
        });

        it("should throw an error when finding a department fails", async () => {
            const prismaMock = prisma.department.findUnique as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                departmentService.findDepartmentByID(1)
            ).rejects.toThrow("Database error");
        });
    });

    describe("updateDepartment", () => {
        it("should update a department", async () => {
            const prismaMock = prisma.department.update as jest.Mock;
            prismaMock.mockResolvedValue(mockDepartment);

            const result = await departmentService.updateDepartment(
                1,
                mockDepartmentUpdateInput
            );
            expect(prismaMock).toHaveBeenCalledWith({
                where: { id: 1 },
                data: mockDepartmentUpdateInput,
            });
            expect(result).toEqual(mockDepartment);
        });

        it("should throw an error when updating a department fails", async () => {
            const prismaMock = prisma.department.update as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                departmentService.updateDepartment(1, mockDepartmentUpdateInput)
            ).rejects.toThrow("Database error");
        });
    });

    describe("deleteDepartment", () => {
        it("should delete a department by ID", async () => {
            const prismaMock = prisma.department.delete as jest.Mock;
            prismaMock.mockResolvedValue(mockDepartment);

            const result = await departmentService.deleteDepartment(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockDepartment);
        });

        it("should throw an error when deleting a department fails", async () => {
            const prismaMock = prisma.department.delete as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(departmentService.deleteDepartment(1)).rejects.toThrow(
                "Database error"
            );
        });
    });
});
