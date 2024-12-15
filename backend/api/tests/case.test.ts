import prisma from "../../prisma";
import { CaseService } from "../services";

import {
    mockCase,
    mockCaseCreateInput,
    mockCaseUpdateInput,
    mockUserCases,
} from "./utils/case.utils";

jest.mock("../../prisma", () => ({
    case: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));

describe("CaseService", () => {
    let caseService: CaseService;

    beforeEach(() => {
        caseService = new CaseService();
        jest.clearAllMocks();
    });

    describe("createCase", () => {
        it("should create a new case", async () => {
            const prismaMock = prisma.case.create as jest.Mock;
            prismaMock.mockResolvedValue(mockCase);

            const result = await caseService.createCase(mockCaseCreateInput);
            expect(prismaMock).toHaveBeenCalledWith({
                data: mockCaseCreateInput,
            });
            expect(result).toEqual(mockCase);
        });

        it("should throw an error when case creation fails", async () => {
            const prismaMock = prisma.case.create as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                caseService.createCase(mockCaseCreateInput)
            ).rejects.toThrow("Database error");
        });
    });

    describe("findManyCases", () => {
        it("should return all cases", async () => {
            const prismaMock = prisma.case.findMany as jest.Mock;
            prismaMock.mockResolvedValue([mockCase]);

            const result = await caseService.findManyCases();
            expect(prismaMock).toHaveBeenCalledWith();
            expect(result).toEqual([mockCase]);
        });

        it("should filter cases by selector", async () => {
            const prismaMock = prisma.case.findMany as jest.Mock;
            prismaMock.mockResolvedValue([mockCase]);

            const caseSelector = { case_type: "Civil" };
            const result = await caseService.findManyCases(caseSelector);
            expect(prismaMock).toHaveBeenCalledWith({ where: caseSelector });
            expect(result).toEqual([mockCase]);
        });

        it("should throw an error when fetching cases fails", async () => {
            const prismaMock = prisma.case.findMany as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(caseService.findManyCases()).rejects.toThrow(
                "Database error"
            );
        });
    });

    describe("findUserCases", () => {
        it("should return cases for a specific user", async () => {
            const prismaMock = prisma.case.findMany as jest.Mock;
            prismaMock.mockResolvedValue(mockUserCases);

            const result = await caseService.findUserCases(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: {
                    OR: [
                        { judge_user_id: 1 },
                        { respondent_user_id: 1 },
                        { clerk_user_id: 1 },
                    ],
                },
                select: {
                    case_id: true,
                    case_identifier: true,
                    case_description: true,
                },
            });
            expect(result).toEqual(mockUserCases);
        });
    });

    describe("findCaseByID", () => {
        it("should return a case by ID", async () => {
            const prismaMock = prisma.case.findUnique as jest.Mock;
            prismaMock.mockResolvedValue(mockCase);

            const result = await caseService.findCaseByID(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { case_id: 1 },
            });
            expect(result).toEqual(mockCase);
        });

        it("should return false if no case is found", async () => {
            const prismaMock = prisma.case.findUnique as jest.Mock;
            prismaMock.mockResolvedValue(null);

            const result = await caseService.findCaseByID(1);
            expect(result).toBe(false);
        });
    });

    describe("updateCase", () => {
        it("should update a case", async () => {
            const prismaMock = prisma.case.update as jest.Mock;
            prismaMock.mockResolvedValue(mockCase);

            const result = await caseService.updateCase(1, mockCaseUpdateInput);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { case_id: 1 },
                data: mockCaseUpdateInput,
            });
            expect(result).toEqual(mockCase);
        });
    });

    describe("deleteCase", () => {
        it("should delete a case by ID", async () => {
            const prismaMock = prisma.case.delete as jest.Mock;
            prismaMock.mockResolvedValue(mockCase);

            const result = await caseService.deleteCase(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { case_id: 1 },
            });
            expect(result).toEqual(mockCase);
        });
    });
});
