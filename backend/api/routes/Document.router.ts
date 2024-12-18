import express from "express";
import { DocumentController } from "../controllers";

const documentController = new DocumentController();
const documentRouter = express.Router();

documentRouter.post("/", documentController.addDocument);
documentRouter.get("/:caseId", documentController.getDocuments);
documentRouter.put("/:id", documentController.updateDocument);
documentRouter.delete("/:id", documentController.deleteDocument);

export default documentRouter;
