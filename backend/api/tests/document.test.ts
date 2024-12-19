import prisma from "../../prisma";
import DocumentService from "../services/Document.service";

import {
    mockDocument,
    mockDocumentCreateInput,
    mockDocumentUpdateContent,
} from "./utils/document.utils";

jest.mock("../../prisma", () => ({
    document: {
        create: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));

describe("DocumentService", () => {
    let documentService: DocumentService;

    beforeEach(() => {
        documentService = new DocumentService();
        jest.clearAllMocks();
    });

    describe("createDocument", () => {
        it("should create a new document", async () => {
            const prismaMock = prisma.document.create as jest.Mock;
            prismaMock.mockResolvedValue(mockDocument);

            const result = await documentService.createDocument(
                mockDocumentCreateInput
            );
            expect(prismaMock).toHaveBeenCalledWith({
                data: mockDocumentCreateInput,
            });
            expect(result).toEqual(mockDocument);
        });

        it("should throw an error when document creation fails", async () => {
            const prismaMock = prisma.document.create as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                documentService.createDocument(mockDocumentCreateInput)
            ).rejects.toThrow("Database error");
        });
    });

    describe("getDocumentsByCase", () => {
        it("should return documents for a given case ID", async () => {
            const prismaMock = prisma.document.findMany as jest.Mock;
            prismaMock.mockResolvedValue([mockDocument]);

            const result = await documentService.getDocumentsByCase(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { caseId: 1 },
                orderBy: { createdAt: "desc" },
            });
            expect(result).toEqual([mockDocument]);
        });

        it("should throw an error when fetching documents fails", async () => {
            const prismaMock = prisma.document.findMany as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(documentService.getDocumentsByCase(1)).rejects.toThrow(
                "Database error"
            );
        });
    });

    describe("updateDocument", () => {
        it("should update a document's content", async () => {
            const updatedDocument = {
                ...mockDocument,
                content: mockDocumentUpdateContent,
            };
            const prismaMock = prisma.document.update as jest.Mock;
            prismaMock.mockResolvedValue(updatedDocument);

            const result = await documentService.updateDocument(
                1,
                mockDocumentUpdateContent
            );
            expect(prismaMock).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { content: mockDocumentUpdateContent },
            });
            expect(result).toEqual(updatedDocument);
        });

        it("should throw an error when updating a document fails", async () => {
            const prismaMock = prisma.document.update as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                documentService.updateDocument(1, mockDocumentUpdateContent)
            ).rejects.toThrow("Database error");
        });
    });

    describe("deleteDocument", () => {
        it("should delete a document by ID", async () => {
            const prismaMock = prisma.document.delete as jest.Mock;
            prismaMock.mockResolvedValue(mockDocument);

            const result = await documentService.deleteDocument(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockDocument);
        });

        it("should throw an error when deleting a document fails", async () => {
            const prismaMock = prisma.document.delete as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(documentService.deleteDocument(1)).rejects.toThrow(
                "Database error"
            );
        });
    });
});
