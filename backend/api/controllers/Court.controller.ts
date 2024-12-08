import * as core from "express-serve-static-core";

import { ServerStatuses, ServerMessages } from "../../config";
import { CourtService } from "../services";

const { OK, CREATED, INTERNAL_ERROR, NOT_FOUND } = ServerStatuses;
const { CourtMessages } = ServerMessages;

const courtActions = new CourtService();

class CourtController {
    async addNewCourt(req: core.Request, res: core.Response) {
        const { name, seat, court_type } = req.body;
        try {
            const newCourt = await courtActions.createCourt({
                name,
                seat,
                court_type,
            });

            res.status(CREATED).json(newCourt);
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: CourtMessages.CREATE_COURT_ERROR,
            });
        }
    }

    async getAllCourts(req: core.Request, res: core.Response) {
        try {
            const courts = await courtActions.findManyCourts();

            if (courts) {
                res.status(OK).json(courts);
            } else {
                res.status(NOT_FOUND).json({
                    error: CourtMessages.NONE_COURT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: CourtMessages.GET_COURTS_ERROR,
            });
        }
    }

    async getSelectedCourt(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const courtData = await courtActions.findCourtByID(Number(id));

            if (courtData) {
                res.status(OK).json(courtData);
            } else {
                res.status(NOT_FOUND).json({
                    error: CourtMessages.SELECTED_COURT_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: CourtMessages.GET_SELECTED_COURT_ERROR,
            });
        }
    }

    async updateCourt(req: core.Request, res: core.Response) {
        const { id } = req.params;
        const { name, seat, court_type } = req.body;
        try {
            const updatedCourt = await courtActions.updateCourt(Number(id), {
                name,
                seat,
                court_type,
            });

            if (updatedCourt) {
                res.status(OK).json({
                    message: CourtMessages.UPDATE_COURT_SUCCESS,
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: CourtMessages.COURT_TO_UPDATE_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: CourtMessages.UPDATE_COURT_ERROR,
            });
        }
    }

    async removeCourt(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const removedCourt = courtActions.removeCourt(Number(id));

            if (removedCourt) {
                res.status(OK).json({
                    message: CourtMessages.DELETE_COURT_SUCCES,
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: CourtMessages.COURT_TO_DELETE_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: CourtMessages.DELETE_COURT_ERROR,
            });
        }
    }
}

export default CourtController;
