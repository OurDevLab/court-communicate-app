import prisma from "../../prisma";

import { DepartmentModel, MessageModel } from "../models";

// 2. CRUD dla modelu Message (Wiadomość)

class MessageService {
    // a) Tworzenie wiadomości:

    async createMessage(
        messageData: MessageModel.CreateMessage
    ): Promise<MessageModel.Message> {
        const { case_id, content, sender_user_id } = messageData;
        try {
            const newMessage = await prisma.message.create({
                data: {
                    case_id,
                    content,
                    sender_user_id,
                },
            });

            return newMessage;
        } catch (error) {
            throw new Error(error);
        }
    }

    // b) Odczyt wszystkich wiadomości:

    async findManyMessages(
        messageSelector?: MessageModel.MessageSelector
    ): Promise<MessageModel.Message[]> {
        try {
            let messages;
            if (messageSelector) {
                messages = await prisma.message.findMany({
                    where: messageSelector,
                });
            } else {
                messages = await prisma.message.findMany();
            }
            return messages;
        } catch (error) {
            throw new Error(error);
        }
    }

    // c) Odczyt wiadomości konkretnej sprawy:

    async findMessageByCaseID(
        messageID: number
    ): Promise<MessageModel.Message[] | Boolean> {
        try {
            const messageData = await prisma.message.findMany({
                where: { case_id: Number(messageID) },
            });
            if (messageData) {
                return messageData;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    // d) Aktualizacja wiadomości:

    async updateMessage(
        messageID: number,
        messageData: MessageModel.UpdateMessage
    ): Promise<MessageModel.Message> {
        const { content } = messageData;
        try {
            const updatedMessage = await prisma.message.update({
                where: { id: Number(messageID) },
                data: { content },
            });
            return updatedMessage;
        } catch (error) {
            throw new Error(error);
        }
    }

    // e) Usunięcie wiadomości:

    async deleteMessage(
        departmentID: number
    ): Promise<DepartmentModel.Department> {
        try {
            const deletedMessage = await prisma.message.delete({
                where: { id: Number(departmentID) },
            });

            return deletedMessage;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default MessageService;
