import prisma from "./prisma";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import {
    CaseRouter,
    CourtRouter,
    DepartmentRouter,
    MessageRouter,
    TestRouter,
    UserRouter,
} from "./api/routes";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", CaseRouter);
app.use("/", CourtRouter);
app.use("/", DepartmentRouter);
app.use("/", MessageRouter);
app.use("/", TestRouter);
app.use("/", UserRouter);

const finishPrismaService = async () => await prisma.$disconnect();

finishPrismaService();

app.listen(5000, () => {
    console.log("Listening on 5000");
});
