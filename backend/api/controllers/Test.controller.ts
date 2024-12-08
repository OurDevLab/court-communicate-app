import * as core from "express-serve-static-core";

import { ServerMessages } from "../../config";
const { TestMessage } = ServerMessages;

class TestController {
    getTestMessage(req: core.Request, res: core.Response) {
        res.send({ message: TestMessage });
    }
}

export default TestController;
