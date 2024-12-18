import prisma from "../../prisma";

import { CaseModel } from "../models";

class CaseService {
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

    async findUserCases(userID: number): Promise<CaseModel.Case | Boolean> {
        try {
            const caseData = await prisma.case.findMany({
                where: {
                    OR: [
                        { judge_user_id: userID },
                        { respondent_user_id: userID },
                        { clerk_user_id: userID },
                    ],
                },
                select: {
                    case_id: true,
                    case_identifier: true,
                    case_description: true,
                },
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
