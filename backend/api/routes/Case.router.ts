import express from "express";

import CaseController from "../controllers/Case.controller";

const caseController = new CaseController();

const caseRouter = express();

// 2. CRUD dla modelu Case (Sprawa)
// a) Tworzenie sprawy:

caseRouter.post("/cases", caseController.addNewCase);

// b) Odczyt wszystkich spraw:

caseRouter.get("/cases", caseController.getAllCases);

// c) Odczyt konkretnej sprawy:

caseRouter.get("/cases/:id", caseController.getSelectedCase);

// d) Aktualizacja sprawy:

caseRouter.put("/cases/:id", caseController.updateCase);

// e) Usunięcie sprawy:

caseRouter.delete("/cases/:id", caseController.removeCase);

export default caseRouter;
