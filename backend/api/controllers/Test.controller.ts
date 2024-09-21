import prisma from "../../prisma";

import * as core from "express-serve-static-core";

class TestController {
    getTestMessage(req: core.Request, res: core.Response) {
        res.send({ message: "Hello World!" });
    }
}

export default TestController;
