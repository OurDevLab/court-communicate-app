import prisma from "./prisma";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

import {
    AuthRouter,
    CaseRouter,
    CourtRouter,
    DepartmentRouter,
    MessageRouter,
    TestRouter,
    UserRouter,
} from "./api/routes";

import { initializeWebSocket } from "./api/handlers/websocket.handler";
import { ConfigVariables, ServerPaths } from "./config";

const { clientURL, jwtSecret, portNumber } = ConfigVariables;
const { ROOT, UPLOADS } = ServerPaths;

// const __dirname = path.dirname(__filename);

const PORT = Number(portNumber);
const app = express();

app.use(UPLOADS, express.static(`${__dirname}${UPLOADS}`));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: clientURL,
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(ROOT, AuthRouter);
app.use(ROOT, CaseRouter);
app.use(ROOT, CourtRouter);
app.use(ROOT, DepartmentRouter);
app.use(ROOT, MessageRouter);
app.use(ROOT, TestRouter);
app.use(ROOT, UserRouter);

const finishPrismaService = async () => await prisma.$disconnect();

finishPrismaService();

const server = app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

initializeWebSocket(server, jwtSecret);
