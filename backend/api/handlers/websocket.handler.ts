import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";

import { MessageService } from "../services";
const messageActions = new MessageService();

export function initializeWebSocket(server: any, jwtSecret: string) {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (connection, req) => {
        handleConnection(connection, req, jwtSecret, wss);
    });
}

function handleConnection(
    connection: any,
    req: any,
    jwtSecret: string,
    wss: WebSocketServer
) {
    connection.isAlive = true;

    connection.on("pong", () => {
        connection.isAlive = true;
    });

    const cookies = req.headers.cookie;
    if (cookies) {
        const tokenCookie = cookies
            .split(";")
            .find((c) => c.trim().startsWith("token="));
        if (tokenCookie) {
            const token = tokenCookie.split("=")[1];
            jwt.verify(token, jwtSecret, (err: any, userData: any) => {
                if (!err) {
                    connection.userId = userData.userId;
                    connection.username = userData.username;
                }
            });
        }
    }

    connection.on("message", async (data: string) => {
        const messageData = JSON.parse(data);
        await handleMessage(messageData, connection, wss);
    });
}

async function handleMessage(
    messageData: any,
    connection: any,
    wss: WebSocketServer
) {
    const { senderId, caseId, recipientId, text, file } = messageData;

    const newMessage = await messageActions.createMessage({
        messageData: {
            senderId,
            recipientId,
            caseId,
            text,
            file,
        },
    });

    [...wss.clients]
        .filter((client) => client.userId === recipientId)
        .forEach((client) => {
            client.send(
                JSON.stringify({
                    id: newMessage.id,
                    text: newMessage.text,
                    senderId: newMessage.senderId,
                    recipientId: newMessage.recipientId,
                    file: newMessage.file,
                    caseId: newMessage.caseId,
                    timestamp: newMessage.timestamp,
                })
            );
        });
}
