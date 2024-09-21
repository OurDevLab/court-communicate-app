import express from "express";

import CourtController from "../controllers/Court.controller";

const courtController = new CourtController();

const courtRouter = express();

// 4. CRUD dla modelu Court (Sąd)
// a) Tworzenie sądu:

courtRouter.post("/courts", courtController.addNewCourt);

// b) Odczyt wszystkich sądów:

courtRouter.get("/courts", courtController.getAllCourts);

// c) Odczyt konkretnego sądu:

courtRouter.get("/courts/:id", courtController.getSelectedCourt);

// d) Aktualizacja sądu:

courtRouter.put("/courts/:id", courtController.updateCourt);

// e) Usunięcie sądu:

courtRouter.delete("/courts/:id", courtController.removeCourt);

export default courtRouter;
