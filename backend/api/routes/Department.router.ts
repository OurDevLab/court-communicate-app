import express from "express";

import DepartmentController from "../controllers/Department.controller";

const departmentController = new DepartmentController();

const departmentRouter = express();

// 5. CRUD dla modelu Department (Departament)
// a) Tworzenie departamentu:

departmentRouter.post("/departments", departmentController.addNewDepartment);

// b) Odczyt wszystkich departamentów:

departmentRouter.get("/departments", departmentController.getAllDepartments);

// c) Odczyt konkretnego departamentu:

departmentRouter.get(
    "/departments/:id",
    departmentController.getSelectedDepartment
);

// d) Aktualizacja departamentu:

departmentRouter.put("/departments/:id", departmentController.updateDepartment);

// e) Usunięcie departamentu:

departmentRouter.delete(
    "/departments/:id",
    departmentController.removeDepartment
);

export default departmentRouter;
