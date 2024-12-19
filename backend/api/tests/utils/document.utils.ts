import { DocumentModel } from "../../models";

export const mockDocument: DocumentModel.Document = {
    id: 1,
    caseId: 1,
    userId: 2,
    type: "cassation",
    content: {
        plea: "Nieprawidłowe orzeczenie",
        justification: "Zasadność skargi",
    },
    createdAt: new Date("2024-12-18T10:00:00Z"),
    updatedAt: new Date("2024-12-18T10:00:00Z"),
};

export const mockDocumentCreateInput: DocumentModel.CreateDocument = {
    caseId: 1,
    userId: 2,
    type: "cassation",
    content: {
        plea: "Nieprawidłowe orzeczenie",
        justification: "Zasadność skargi",
    },
};

export const mockDocumentUpdateContent = {
    plea: "Zmodyfikowana skarga",
    justification: "Dodatkowe uzasadnienie",
};
