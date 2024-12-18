import prisma from "../../prisma";

import { DepartmentModel, MessageModel } from "../models";

class MessageService {
    async createMessage({
        messageData,
    }: {
        messageData: MessageModel.CreateMessage;
    }): Promise<MessageModel.Message> {
        const { caseId, recipientId, senderId, text, file } = messageData;
        try {

            const newMessage = await prisma.message.create({
                // @ts-ignore
                data: {
                    // caseId,
                    // recipientId,
                    // senderId,
                    text,
                    file,
                    case: {
                        connect: {
                            case_id: caseId,
                        }
                    },
                    sender: {
                        connect: { user_id: senderId }
                    },
                    recipient: {
                        connect: {
                            user_id: 1 // temp solution
                        }
                    }
                },
            });

            return newMessage;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findMessagesByCase(caseID: number): Promise<MessageModel.Message[]> {
        try {
            const foundMessages = await prisma.message.findMany({
                where: { caseId: caseID },
                orderBy: { timestamp: "asc" },
            });

            return foundMessages;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateMessage({
        messageID,
        messageData,
    }: {
        messageID: number;
        messageData: MessageModel.UpdateMessage;
    }): Promise<MessageModel.Message> {
        const { text, file } = messageData;
        try {
            const updatedMessage = await prisma.message.update({
                where: { id: messageID },
                data: { text, file },
            });
            return updatedMessage;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteMessage(
        messageID: number
    ): Promise<DepartmentModel.Department> {
        try {
            const deletedMessage = await prisma.message.delete({
                where: { id: Number(messageID) },
            });

            return deletedMessage;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default MessageService;
