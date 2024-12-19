import prisma from "../../prisma";

import { DocumentModel } from "../models";

class DocumentService {
    async createDocument(
        documentData: DocumentModel.CreateDocument
    ): Promise<DocumentModel.Document> {
        const { caseId, userId, type, content } = documentData;

        try {
            const newDocument = await prisma.document.create({
                data: {
                    caseId,
                    userId,
                    type,
                    content,
                },
            });

            return newDocument;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getDocumentsByCase(
        caseId: number
    ): Promise<DocumentModel.Document[]> {
        try {
            const documents = await prisma.document.findMany({
                where: { caseId },
                orderBy: { createdAt: "desc" },
            });

            return documents;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateDocument(
        documentId: number,
        content: any
    ): Promise<DocumentModel.Document> {
        try {
            const updatedDocument = await prisma.document.update({
                where: { id: documentId },
                data: { content },
            });

            return updatedDocument;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteDocument(documentId: number): Promise<DocumentModel.Document> {
        try {
            const deletedDocument = await prisma.document.delete({
                where: { id: documentId },
            });

            return deletedDocument;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default DocumentService;
