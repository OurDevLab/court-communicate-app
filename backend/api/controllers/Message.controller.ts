import * as core from "express-serve-static-core";

import { ServerStatuses } from "../../config";
import { MessageService } from "../services";

const { OK, CREATED, INTERNAL_ERROR, NO_CONTENT } = ServerStatuses;
const messageActions = new MessageService();

class MessageController {
    async createMessage(req: core.Request, res: core.Response) {
        const { caseId, recipientId, text, file } = req.body;
        const senderId = req.user.id;

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
                error: "Nie udało się utworzyć wiadomości",
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
                error: "Nie udało się pobrać wiadomości",
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
                error: "Nie udało się zaktualizować wiadomości",
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
                error: "Nie udało się usunąć wiadomości",
            });
        }
    }
}

export default MessageController;
