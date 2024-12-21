import express from "express";
import { DocumentController } from "../controllers";

import { ServerPaths } from "../../config";

const { DOCUMENTS } = ServerPaths;

const documentController = new DocumentController();
const documentRouter = express.Router();

documentRouter.post(DOCUMENTS, documentController.addDocument);
documentRouter.get(`${DOCUMENTS}/:caseId`, documentController.getDocuments);
documentRouter.put(`${DOCUMENTS}/:id`, documentController.updateDocument);
documentRouter.delete(`${DOCUMENTS}/:id`, documentController.deleteDocument);

export default documentRouter;
