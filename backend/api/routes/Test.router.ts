import express from "express";

import { ServerPaths } from "../../config";
import { TestController } from "../controllers";

const { TEST } = ServerPaths;
const testController = new TestController();

const testRouter = express();

testRouter.get(TEST, testController.getTestMessage);

export default testRouter;
