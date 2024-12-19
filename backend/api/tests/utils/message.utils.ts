import { MessageModel } from "../../models";

export const mockMessage: MessageModel.Message = {
    id: 1,
    text: "New test message",
    file: null,
    timestamp: new Date(),
    case: { case_id: 1 },
    sender: { user_id: 1 },
    recipient: { user_id: 2 },
};

export const mockMessageCreateInput = {
    caseId: 1,
    senderId: 1,
    recipientId: 1,
    text: "New test message",
    file: null,
};

export const mockMessageUpdateInput: MessageModel.UpdateMessage = {
    text: "Updated message text",
    file: null,
};
