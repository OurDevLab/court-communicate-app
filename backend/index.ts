import prisma from "./prisma";
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';

import * as core from "express-serve-static-core";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/test', (req: core.Request, res: core.Response) => {
    res.send({ message: "Hello World "});
});

app.post('/test/:id', async (req: core.Request, res: core.Response) => {
    const { id } = req.params;

    console.log(id);

    res.status(201).send({ id: id });
});

const finishPrismaService = async () => await prisma.$disconnect();

finishPrismaService();

app.listen(5000, () => {
    console.log('Listening on 5000');
});
