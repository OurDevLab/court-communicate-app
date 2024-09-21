import * as core from "express-serve-static-core";

import { CourtService } from "../services";
const courtActions = new CourtService();

// 4. CRUD dla modelu Court (Sąd)

class CourtController {
    // a) Tworzenie sądu:

    async addNewCourt(req: core.Request, res: core.Response) {
        const { name, seat, court_type } = req.body;
        try {
            const newCourt = await courtActions.createCourt({
                name,
                seat,
                court_type,
            });

            res.status(201).json(newCourt);
        } catch (error) {
            res.status(500).json({ error: "Nie udało się utworzyć sądu" });
        }
    }

    // b) Odczyt wszystkich sądów:

    async getAllCourts(req: core.Request, res: core.Response) {
        try {
            const courts = await courtActions.findManyCourts();

            if (courts) {
                res.status(200).json(courts);
            } else {
                res.status(404).json({ error: "Nie znaleziono żadnych spraw" });
            }
        } catch (error) {
            res.status(500).json({ error: "Nie udało się pobrać listy sądów" });
        }
    }

    // c) Odczyt konkretnego sądu:

    async getSelectedCourt(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const courtData = await courtActions.findCourtByID(Number(id));

            if (courtData) {
                res.status(200).json(courtData);
            } else {
                res.status(404).json({
                    error: "Sąd nie został znaleziony",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Błąd podczas pobierania danych sądu",
            });
        }
    }

    // d) Aktualizacja sądu:

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
                res.status(200).json({
                    message: "Dane wybranego sądu zostały zaktualizowane",
                });
            } else {
                res.status(404).json({
                    error: "Nie znaleziono sądu przeznaczonego do aktualizacji danych",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Aktualizacja danych sądu nie powiodła się",
            });
        }
    }

    // e) Usunięcie sądu:

    async removeCourt(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const removedCourt = courtActions.removeCourt(Number(id));

            if (removedCourt) {
                res.status(200).json({
                    message: "Wybrany sąd został usunięty",
                });
            } else {
                res.status(404).json({
                    error: "Nie znaleziono sądu przeznaczonego do usunięcia",
                });
            }
        } catch (error) {
            res.status(500).json({ error: "Nie udało się usunąć sądu" });
        }
    }
}

export default CourtController;
