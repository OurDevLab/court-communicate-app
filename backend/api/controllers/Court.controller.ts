import * as core from "express-serve-static-core";

import { ServerStatuses } from "../../config";
import { CourtService } from "../services";

const { OK, CREATED, INTERNAL_ERROR, NOT_FOUND } = ServerStatuses;
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
                error: "Nie udało się utworzyć sądu",
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
                    error: "Nie znaleziono żadnych spraw",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Nie udało się pobrać listy sądów",
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
                    error: "Sąd nie został znaleziony",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Błąd podczas pobierania danych sądu",
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
                    message: "Dane wybranego sądu zostały zaktualizowane",
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: "Nie znaleziono sądu przeznaczonego do aktualizacji danych",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Aktualizacja danych sądu nie powiodła się",
            });
        }
    }

    async removeCourt(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const removedCourt = courtActions.removeCourt(Number(id));

            if (removedCourt) {
                res.status(OK).json({
                    message: "Wybrany sąd został usunięty",
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: "Nie znaleziono sądu przeznaczonego do usunięcia",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Nie udało się usunąć sądu",
            });
        }
    }
}

export default CourtController;
