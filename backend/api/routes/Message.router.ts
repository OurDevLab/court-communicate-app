import express from "express";

import { ServerPaths } from "../../config";
import { MessageController } from "../controllers";

const { MESSAGES } = ServerPaths;
const messageController = new MessageController();

const messageRouter = express();

messageRouter.post(MESSAGES, messageController.createMessage);
messageRouter.get(
    `${MESSAGES}/case/:caseId`,
    messageController.getMessagesByCase
);
messageRouter.put(`${MESSAGES}/:id`, messageController.updateMessage);
messageRouter.delete(`${MESSAGES}/:id`, messageController.deleteMessage);

export default messageRouter;
