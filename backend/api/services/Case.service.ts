import prisma from "../../prisma";

import { CaseModel } from "../models";

// 2. CRUD dla modelu Case (Sprawa)

class CaseService {
    // a) Tworzenie sprawy:

    async createCase(caseData: CaseModel.CreateCase): Promise<CaseModel.Case> {
        const {
            case_identifier,
            case_type,
            case_description,
            judge_user_id,
            respondent_user_id,
            clerk_user_id,
        } = caseData;

        try {
            const newCase = await prisma.case.create({
                data: {
                    case_identifier,
                    case_type,
                    case_description,
                    judge_user_id,
                    respondent_user_id,
                    clerk_user_id,
                },
            });

            return newCase;
        } catch (error) {
            throw new Error(error);
        }
    }

    // b) Odczyt wszystkich spraw:

    async findManyCases(
        caseSelector?: CaseModel.CaseSelector
    ): Promise<CaseModel.Case[]> {
        try {
            let cases;
            if (caseSelector) {
                cases = await prisma.case.findMany({
                    where: caseSelector,
                });
            } else {
                cases = await prisma.case.findMany();
            }
            return cases;
        } catch (error) {
            throw new Error(error);
        }
    }

    // c) Odczyt konkretnej sprawy:

    async findCaseByID(caseID: number): Promise<CaseModel.Case | Boolean> {
        try {
            const caseData = await prisma.case.findUnique({
                where: { case_id: Number(caseID) },
            });
            if (caseData) {
                return caseData;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    // d) Aktualizacja sprawy:

    async updateCase(
        caseID: number,
        caseData: CaseModel.UpdateCase
    ): Promise<CaseModel.Case> {
        const {
            case_type,
            case_description,
            judge_user_id,
            respondent_user_id,
            clerk_user_id,
        } = caseData;

        try {
            const updatedCase = await prisma.case.update({
                where: { case_id: Number(caseID) },
                data: {
                    case_type,
                    case_description,
                    judge_user_id,
                    respondent_user_id,
                    clerk_user_id,
                },
            });
            return updatedCase;
        } catch (error) {
            throw new Error(error);
        }
    }

    // e) Usunięcie sprawy:

    async deleteCase(caseID: number): Promise<CaseModel.Case> {
        try {
            const deletedCase = await prisma.case.delete({
                where: { case_id: Number(caseID) },
            });
            return deletedCase;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default CaseService;
