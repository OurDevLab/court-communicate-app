import express from "express";

import TestController from "../controllers/Test.controller";

const testController = new TestController();

const testRouter = express();

// 0. Endpoint testowy

testRouter.get("/test", testController.getTestMessage);

export default testRouter;
