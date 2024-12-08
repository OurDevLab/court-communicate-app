import * as core from "express-serve-static-core";

import { ServerStatuses, ServerMessages } from "../../config";
import { MessageService } from "../services";

const { OK, CREATED, INTERNAL_ERROR, NO_CONTENT } = ServerStatuses;
const { MessageMessages } = ServerMessages;

const messageActions = new MessageService();

class MessageController {
    async createMessage(req: core.Request, res: core.Response) {
        const { caseId, recipientId, senderId, text, file } = req.body;
        // const senderId = req.user.id;

        try {
            const newMessage = await messageActions.createMessage({
                messageData: {
                    caseId,
                    recipientId,
                    senderId,
                    text,
                    file,
                },
            });
            res.status(CREATED).json(newMessage);
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: MessageMessages.CREATE_MESSAGE_ERROR,
            });
        }
    }

    async getMessagesByCase(req: core.Request, res: core.Response) {
        const { caseId } = req.params;

        try {
            const messages = await messageActions.findMessagesByCase(
                Number(caseId)
            );
            res.status(OK).json(messages);
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: MessageMessages.GET_CASE_MESSAGES_ERROR,
            });
        }
    }

    async updateMessage(req: core.Request, res: core.Response) {
        const { id } = req.params;
        const { text, file } = req.body;

        try {
            const updatedMessage = await messageActions.updateMessage({
                messageID: Number(id),
                messageData: { text, file },
            });
            res.status(OK).json(updatedMessage);
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: MessageMessages.UPDATE_MESSAGE_ERROR,
            });
        }
    }

    async deleteMessage(req: core.Request, res: core.Response) {
        const { id } = req.params;

        try {
            await messageActions.deleteMessage(Number(id));
            res.status(NO_CONTENT).send();
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: MessageMessages.DELETE_MESSAGE_ERROR,
            });
        }
    }
}

export default MessageController;
