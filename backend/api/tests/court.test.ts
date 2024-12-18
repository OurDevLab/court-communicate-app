import prisma from "../../prisma";
import { CourtService } from "../services";

import {
    mockCourt,
    mockCourtCreateInput,
    mockCourtUpdateInput,
} from "./utils/court.utils";

jest.mock("../../prisma", () => ({
    court: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));

describe("CourtService", () => {
    let courtService: CourtService;

    beforeEach(() => {
        courtService = new CourtService();
        jest.clearAllMocks();
    });

    describe("createCourt", () => {
        it("should create a new court", async () => {
            const prismaMock = prisma.court.create as jest.Mock;
            prismaMock.mockResolvedValue(mockCourt);

            const result = await courtService.createCourt(mockCourtCreateInput);
            expect(prismaMock).toHaveBeenCalledWith({
                data: mockCourtCreateInput,
            });
            expect(result).toEqual(mockCourt);
        });

        it("should throw an error when court creation fails", async () => {
            const prismaMock = prisma.court.create as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                courtService.createCourt(mockCourtCreateInput)
            ).rejects.toThrow("Database error");
        });
    });

    describe("findManyCourts", () => {
        it("should return all courts", async () => {
            const prismaMock = prisma.court.findMany as jest.Mock;
            prismaMock.mockResolvedValue([mockCourt]);

            const result = await courtService.findManyCourts();
            expect(prismaMock).toHaveBeenCalledWith();
            expect(result).toEqual([mockCourt]);
        });

        it("should filter courts by selector", async () => {
            const prismaMock = prisma.court.findMany as jest.Mock;
            prismaMock.mockResolvedValue([mockCourt]);

            const courtSelector = { court_type: "Rejonowy" };
            const result = await courtService.findManyCourts(courtSelector);
            expect(prismaMock).toHaveBeenCalledWith({ where: courtSelector });
            expect(result).toEqual([mockCourt]);
        });

        it("should throw an error when fetching courts fails", async () => {
            const prismaMock = prisma.court.findMany as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(courtService.findManyCourts()).rejects.toThrow(
                "Database error"
            );
        });
    });

    describe("findCourtByID", () => {
        it("should return a court by ID", async () => {
            const prismaMock = prisma.court.findUnique as jest.Mock;
            prismaMock.mockResolvedValue(mockCourt);

            const result = await courtService.findCourtByID(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockCourt);
        });

        it("should return false if no court is found", async () => {
            const prismaMock = prisma.court.findUnique as jest.Mock;
            prismaMock.mockResolvedValue(null);

            const result = await courtService.findCourtByID(1);
            expect(result).toBe(false);
        });

        it("should throw an error when finding a court fails", async () => {
            const prismaMock = prisma.court.findUnique as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(courtService.findCourtByID(1)).rejects.toThrow(
                "Database error"
            );
        });
    });

    describe("updateCourt", () => {
        it("should update a court", async () => {
            const prismaMock = prisma.court.update as jest.Mock;
            prismaMock.mockResolvedValue(mockCourt);

            const result = await courtService.updateCourt(
                1,
                mockCourtUpdateInput
            );
            expect(prismaMock).toHaveBeenCalledWith({
                where: { id: 1 },
                data: mockCourtUpdateInput,
            });
            expect(result).toEqual(mockCourt);
        });

        it("should throw an error when updating a court fails", async () => {
            const prismaMock = prisma.court.update as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                courtService.updateCourt(1, mockCourtUpdateInput)
            ).rejects.toThrow("Database error");
        });
    });

    describe("removeCourt", () => {
        it("should delete a court by ID", async () => {
            const prismaMock = prisma.court.delete as jest.Mock;
            prismaMock.mockResolvedValue(mockCourt);

            const result = await courtService.removeCourt(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockCourt);
        });

        it("should throw an error when deleting a court fails", async () => {
            const prismaMock = prisma.court.delete as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(courtService.removeCourt(1)).rejects.toThrow(
                "Database error"
            );
        });
    });
});
