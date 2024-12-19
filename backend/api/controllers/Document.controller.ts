import * as core from "express-serve-static-core";
import { DocumentService } from "../services";
import { ServerStatuses, ServerMessages } from "../../config";

const { OK, CREATED, INTERNAL_ERROR } = ServerStatuses;
const { DocumentMessages } = ServerMessages;

const documentActions = new DocumentService();

class DocumentController {
    async addDocument(req: core.Request, res: core.Response) {
        const { caseId, userId, type, content } = req.body;

        try {
            const newDocument = await documentActions.createDocument({
                caseId,
                userId,
                type,
                content,
            });

            res.status(CREATED).json(newDocument);
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: DocumentMessages.ADD_DOCUMENT_ERROR,
            });
        }
    }

    async getDocuments(req: core.Request, res: core.Response) {
        const { caseId } = req.params;

        try {
            const documents = await documentActions.getDocumentsByCase(
                Number(caseId)
            );

            res.status(OK).json(documents);
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: DocumentMessages.GET_DOCUMENTS_ERROR,
            });
        }
    }

    async updateDocument(req: core.Request, res: core.Response) {
        const { id } = req.params;
        const { content } = req.body;

        try {
            const updatedDocument = await documentActions.updateDocument(
                Number(id),
                content
            );

            res.status(OK).json(updatedDocument);
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: DocumentMessages.UPDATE_DOCUMENT_ERROR,
            });
        }
    }

    async deleteDocument(req: core.Request, res: core.Response) {
        const { id } = req.params;

        try {
            const deletedDocument = await documentActions.deleteDocument(
                Number(id)
            );

            res.status(OK).json(deletedDocument);
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: DocumentMessages.DELETE_DOCUMENT_ERROR,
            });
        }
    }
}

export default DocumentController;
