import * as core from "express-serve-static-core";

import { CaseService } from "../services";
const caseActions = new CaseService();

// 2. CRUD dla modelu Case (Sprawa)

class CaseController {
    // a) Tworzenie sprawy:

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

            res.status(201).json(newCase);
        } catch (error) {
            res.status(500).json({ error: "Nie udało się utworzyć sprawy" });
        }
    }

    // b) Odczyt wszystkich spraw:

    async getAllCases(req: core.Request, res: core.Response) {
        try {
            const cases = await caseActions.findManyCases();

            if (cases) {
                res.status(200).json(cases);
            } else {
                res.status(404).json({ error: "Nie znaleziono żadnych spraw" });
            }
        } catch (error) {
            res.status(500).json({ error: "Nie udało się pobrać listy spraw" });
        }
    }

    // c) Odczyt konkretnej sprawy:

    async getSelectedCase(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const caseData = await caseActions.findCaseByID(Number(id));

            if (caseData) {
                res.status(200).json(caseData);
            } else {
                res.status(404).json({
                    error: "Sprawa nie została znaleziona",
                });
            }
        } catch (error) {
            res.status(500).json({ error: "Błąd podczas pobierania sprawy" });
        }
    }

    // d) Aktualizacja sprawy:

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
                res.status(200).json({
                    message: "Wybrana sprawa została zaktualizowana",
                });
            } else {
                res.status(404).json({
                    error: "Nie znaleziono sprawy przeznaczonej do aktualizacji",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Aktualizacja sprawy nie powiodła się",
            });
        }
    }

    // e) Usunięcie sprawy:

    async removeCase(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const removedCase = caseActions.deleteCase(Number(id));

            if (removedCase) {
                res.status(200).json({
                    message: "Wybrana sprawa została usunięta",
                });
            } else {
                res.status(404).json({
                    error: "Nie znaleziono sprawy przeznaczonej do usunięcia",
                });
            }
        } catch (error) {
            res.status(500).json({ error: "Nie udało się usunąć sprawy" });
        }
    }
}

export default CaseController;
