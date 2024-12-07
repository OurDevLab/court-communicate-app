import * as core from "express-serve-static-core";

import { ServerStatuses } from "../../config";
import { CaseService } from "../services";

const { OK, CREATED, INTERNAL_ERROR, NOT_FOUND } = ServerStatuses;
const caseActions = new CaseService();

class CaseController {
    async addNewCase(req: core.Request, res: core.Response) {
        const {
            case_identifier,
            case_type,
            case_description,
            judge_user_id,
            respondent_user_id,
            clerk_user_id,
        } = req.body;

        try {
            const newCase = await caseActions.createCase({
                case_identifier,
                case_type,
                case_description,
                judge_user_id,
                respondent_user_id,
                clerk_user_id,
            });

            res.status(CREATED).json(newCase);
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Nie udało się utworzyć sprawy",
            });
        }
    }

    async getAllCases(req: core.Request, res: core.Response) {
        try {
            const cases = await caseActions.findManyCases();

            if (cases) {
                res.status(OK).json(cases);
            } else {
                res.status(NOT_FOUND).json({
                    error: "Nie znaleziono żadnych spraw",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Nie udało się pobrać listy spraw",
            });
        }
    }

    async getSelectedCase(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const caseData = await caseActions.findCaseByID(Number(id));

            if (caseData) {
                res.status(OK).json(caseData);
            } else {
                res.status(NOT_FOUND).json({
                    error: "Sprawa nie została znaleziona",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Błąd podczas pobierania sprawy",
            });
        }
    }

    async updateCase(req: core.Request, res: core.Response) {
        const { id } = req.params;
        const {
            case_type,
            case_description,
            judge_user_id,
            respondent_user_id,
            clerk_user_id,
        } = req.body;

        try {
            const updatedCase = await caseActions.updateCase(Number(id), {
                case_type,
                case_description,
                judge_user_id,
                respondent_user_id,
                clerk_user_id,
            });

            if (updatedCase) {
                res.status(OK).json({
                    message: "Wybrana sprawa została zaktualizowana",
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: "Nie znaleziono sprawy przeznaczonej do aktualizacji",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Aktualizacja sprawy nie powiodła się",
            });
        }
    }

    async removeCase(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const removedCase = caseActions.deleteCase(Number(id));

            if (removedCase) {
                res.status(OK).json({
                    message: "Wybrana sprawa została usunięta",
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: "Nie znaleziono sprawy przeznaczonej do usunięcia",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Nie udało się usunąć sprawy",
            });
        }
    }
}

export default CaseController;
