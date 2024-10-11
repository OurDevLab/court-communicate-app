import express from "express";

import MessageController from "../controllers/Message.controller";

const messageController = new MessageController();

const messageRouter = express();

// 3. CRUD dla modelu Message (Wiadomość)
// a) Tworzenie wiadomości:

messageRouter.post("/messages", messageController.addNewMessage);

// b) Odczyt wszystkich wiadomości:

messageRouter.get("/messages", messageController.getAllMessages);

// c) Odczyt wiadomości konkretnej sprawy:

messageRouter.get(
    "/cases/:id/messages",
    messageController.getSelectedCaseMessages
);

// d) Aktualizacja wiadomości:

messageRouter.put("/messages/:id", messageController.updateMessage);

// e) Usunięcie wiadomości:

messageRouter.delete("/messages/:id", messageController.removeMessage);

export default messageRouter;
