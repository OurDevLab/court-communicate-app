import { MessageModel } from "../../models";

export const mockMessage: MessageModel.Message = {
    id: 1,
    caseId: 1,
    recipientId: 2,
    senderId: 1,
    text: "Hello, this is a test message.",
    file: null,
    timestamp: new Date(),
};

export const mockMessageCreateInput: MessageModel.CreateMessage = {
    caseId: 1,
    recipientId: 2,
    senderId: 1,
    text: "New test message",
    file: null,
};

export const mockMessageUpdateInput: MessageModel.UpdateMessage = {
    text: "Updated message text",
    file: null,
};
