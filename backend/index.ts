import prisma from "./prisma";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

import {
    AuthRouter,
    CaseRouter,
    CourtRouter,
    DepartmentRouter,
    MessageRouter,
    TestRouter,
    UserRouter,
} from "./api/routes";

dotenv.config();
const PORT = Number(process.env.BACKEND_PORT) || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", AuthRouter);
app.use("/", CaseRouter);
app.use("/", CourtRouter);
app.use("/", DepartmentRouter);
app.use("/", MessageRouter);
app.use("/", TestRouter);
app.use("/", UserRouter);

const finishPrismaService = async () => await prisma.$disconnect();

finishPrismaService();

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
