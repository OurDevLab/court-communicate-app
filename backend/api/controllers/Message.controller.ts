import * as core from "express-serve-static-core";

import { MessageService } from "../services";
const messageActions = new MessageService();

// 3. CRUD dla modelu Message (Wiadomość)

class MessageController {
    // a) Tworzenie wiadomości:

    async addNewMessage(req: core.Request, res: core.Response) {
        const { case_id, content, sender_user_id } = req.body;
        try {
            const newMessage = await messageActions.createMessage({
                case_id,
                content,
                sender_user_id,
            });
            res.status(201).json(newMessage);
        } catch (error) {
            res.status(500).json({ error: "Nie udało się wysłać wiadomości" });
        }
    }

    // b) Odczyt wszystkich wiadomości:

    async getAllMessages(req: core.Request, res: core.Response) {
        try {
            const messages = await messageActions.findManyMessages();

            if (messages) {
                res.status(200).json(messages);
            } else {
                res.status(404).json({
                    error: "Nie znaleziono żadnych wiadomości",
                });
            }
        } catch (error) {
            res.status(500).json({ error: "Nie udało się pobrać wiadomości" });
        }
    }

    // c) Odczyt wiadomości konkretnej sprawy:

    async getSelectedCaseMessages(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const caseMessages = await messageActions.findMessageByCaseID(
                Number(id)
            );

            if (caseMessages) {
                res.status(200).json(caseMessages);
            } else {
                res.status(404).json({
                    error: "Nie znaleziono wiadomości przypisanych do sprawy",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Błąd podczas pobierania wiadomości",
            });
        }
    }

    // d) Aktualizacja wiadomości:

    async updateMessage(req: core.Request, res: core.Response) {
        const { id } = req.params;
        const { content } = req.body;
        try {
            const updatedMessage = await messageActions.updateMessage(
                Number(id),
                { content }
            );

            if (updatedMessage) {
                res.status(200).json({
                    message: "Wybrana wiadomość została zaktualizowana",
                });
            } else {
                res.status(404).json({
                    error: "Nie znaleziono wiadomości przeznaczonej do aktualizacji",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Aktualizacja wiadomości nie powiodła się",
            });
        }
    }

    // e) Usunięcie wiadomości:

    async removeMessage(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const removedMessage = messageActions.deleteMessage(Number(id));

            if (removedMessage) {
                res.status(200).json({
                    message: "Wybrana wiadomość została usunięta",
                });
            } else {
                res.status(404).json({
                    error: "Nie znaleziono wiadomości przeznaczonej do usunięcia",
                });
            }
        } catch (error) {
            res.status(500).json({ error: "Nie udało się usunąć wiadomości" });
        }
    }
}

export default MessageController;
