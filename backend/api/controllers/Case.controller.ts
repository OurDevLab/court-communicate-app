import * as core from "express-serve-static-core";

import { ServerStatuses, ServerMessages } from "../../config";
import { CaseService } from "../services";

const { OK, CREATED, INTERNAL_ERROR, NOT_FOUND } = ServerStatuses;
const { CaseMessages } = ServerMessages;

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
                error: CaseMessages.CREATE_CASE_ERROR,
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
                    error: CaseMessages.NONE_CASE_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: CaseMessages.GET_CASE_LIST_ERROR,
            });
        }
    }

    async getUserCases(req: core.Request, res: core.Response) {
        const { id } = req.user;

        try {
            const cases = await caseActions.findUserCases(Number(id));
            res.status(OK).json(cases);
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: CaseMessages.GET_CASE_LIST_ERROR,
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
                    error: CaseMessages.SELECTED_CASE_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: CaseMessages.GET_SELECTED_CASE_ERROR,
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
                    message: CaseMessages.UPDATE_CASE_SUCCESS,
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: CaseMessages.CASE_TO_UPDATE_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: CaseMessages.UPDATE_CASE_ERROR,
            });
        }
    }

    async removeCase(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const removedCase = caseActions.deleteCase(Number(id));

            if (removedCase) {
                res.status(OK).json({
                    message: CaseMessages.CASE_DELETE_SUCCES,
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: CaseMessages.CASE_TO_DELETE_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: CaseMessages.CASE_DELETE_ERROR,
            });
        }
    }
}

export default CaseController;
