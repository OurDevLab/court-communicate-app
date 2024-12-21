import prisma from "../../prisma";
import { MessageService } from "../services";

import {
    mockMessage,
    mockMessageCreateInput,
    mockMessageUpdateInput,
} from "./utils/message.utils";

jest.mock("../../prisma", () => ({
    message: {
        create: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));

describe("MessageService", () => {
    let messageService: MessageService;

    beforeEach(() => {
        messageService = new MessageService();
        jest.clearAllMocks();
    });

    describe("createMessage", () => {
        it("should create a new message", async () => {
            const prismaMock = prisma.message.create as jest.Mock;
            prismaMock.mockResolvedValue(mockMessage);

            const result = await messageService.createMessage({
                messageData: mockMessageCreateInput,
            });

            expect(prismaMock).toHaveBeenCalledWith({
                data: {
                    text: mockMessageCreateInput.text,
                    file: mockMessageCreateInput.file,
                    case: {
                        connect: { case_id: mockMessageCreateInput.caseId },
                    },
                    sender: {
                        connect: { user_id: mockMessageCreateInput.senderId },
                    },
                    recipient: {
                        connect: {
                            user_id: mockMessageCreateInput.recipientId,
                        },
                    },
                },
            });
            expect(result).toEqual(mockMessage);
        });

        it("should throw an error when message creation fails", async () => {
            const prismaMock = prisma.message.create as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                messageService.createMessage({
                    messageData: mockMessageCreateInput,
                })
            ).rejects.toThrow("Database error");
        });
    });

    describe("findMessagesByCase", () => {
        it("should return messages for a specific case ID", async () => {
            const prismaMock = prisma.message.findMany as jest.Mock;
            prismaMock.mockResolvedValue([mockMessage]);

            const result = await messageService.findMessagesByCase(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { caseId: 1 },
                orderBy: { timestamp: "asc" },
            });
            expect(result).toEqual([mockMessage]);
        });

        it("should throw an error when fetching messages fails", async () => {
            const prismaMock = prisma.message.findMany as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(messageService.findMessagesByCase(1)).rejects.toThrow(
                "Database error"
            );
        });
    });

    describe("updateMessage", () => {
        it("should update a message", async () => {
            const prismaMock = prisma.message.update as jest.Mock;
            prismaMock.mockResolvedValue(mockMessage);

            const result = await messageService.updateMessage({
                messageID: 1,
                messageData: mockMessageUpdateInput,
            });
            expect(prismaMock).toHaveBeenCalledWith({
                where: { id: 1 },
                data: mockMessageUpdateInput,
            });
            expect(result).toEqual(mockMessage);
        });

        it("should throw an error when updating a message fails", async () => {
            const prismaMock = prisma.message.update as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(
                messageService.updateMessage({
                    messageID: 1,
                    messageData: mockMessageUpdateInput,
                })
            ).rejects.toThrow("Database error");
        });
    });

    describe("deleteMessage", () => {
        it("should delete a message by ID", async () => {
            const prismaMock = prisma.message.delete as jest.Mock;
            prismaMock.mockResolvedValue(mockMessage);

            const result = await messageService.deleteMessage(1);
            expect(prismaMock).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockMessage);
        });

        it("should throw an error when deleting a message fails", async () => {
            const prismaMock = prisma.message.delete as jest.Mock;
            prismaMock.mockRejectedValue(new Error("Database error"));

            await expect(messageService.deleteMessage(1)).rejects.toThrow(
                "Database error"
            );
        });
    });
});
