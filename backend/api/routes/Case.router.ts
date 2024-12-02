import express from "express";

import { ServerPaths } from "../../config";
import { CaseController } from "../controllers";

const { CASES } = ServerPaths;
const caseController = new CaseController();

const caseRouter = express();

caseRouter.post(CASES, caseController.addNewCase);
caseRouter.get(CASES, caseController.getAllCases);
caseRouter.get(`${CASES}/:id`, caseController.getSelectedCase);
caseRouter.put(`${CASES}/:id`, caseController.updateCase);
caseRouter.delete(`${CASES}/:id`, caseController.removeCase);

export default caseRouter;
