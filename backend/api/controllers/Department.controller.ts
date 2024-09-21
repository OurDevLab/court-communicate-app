import * as core from "express-serve-static-core";

import { DepartmentService } from "../services";
const departmentActions = new DepartmentService();

// 5. CRUD dla modelu Department (Departament)

class DepartmentController {
    // a) Tworzenie departamentu:

    async addNewDepartment(req: core.Request, res: core.Response) {
        const { name, court_id } = req.body;
        try {
            const newDepartment = await departmentActions.createDepartment({
                name,
                court_id,
            });

            res.status(201).json(newDepartment);
        } catch (error) {
            res.status(500).json({
                error: "Nie udało się utworzyć departamentu",
            });
        }
    }

    // b) Odczyt wszystkich departamentów:

    async getAllDepartments(req: core.Request, res: core.Response) {
        try {
            const departments = await departmentActions.findManyDepartments();

            if (departments) {
                res.status(200).json(departments);
            } else {
                res.status(404).json({
                    error: "Nie znaleziono żadnych departamentów",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Nie udało się pobrać listy departamentów",
            });
        }
    }

    // c) Odczyt konkretnego departamentu:

    async getSelectedDepartment(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const department = await departmentActions.findDepartmentByID(
                Number(id)
            );
            if (department) {
                res.status(200).json(department);
            } else {
                res.status(404).json({
                    error: "Departament nie został znaleziony",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Błąd podczas pobierania danych departamentu",
            });
        }
    }

    // d) Aktualizacja departamentu:

    async updateDepartment(req: core.Request, res: core.Response) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const updatedDepartment = await departmentActions.updateDepartment(
                Number(id),
                {
                    name,
                }
            );

            if (updatedDepartment) {
                res.status(200).json({
                    message:
                        "Dane wybranego departamentu zostały zaktualizowane",
                });
            } else {
                res.status(404).json({
                    error: "Nie znaleziono departamentu przeznaczonego do aktualizacji danych",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Aktualizacja departamentu nie powiodła się",
            });
        }
    }

    // e) Usunięcie departamentu:

    async removeDepartment(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const removedDepartment = await departmentActions.deleteDepartment(
                Number(id)
            );

            if (removedDepartment) {
                res.status(200).json({
                    message: "Departament został usunięty",
                });
            } else {
                res.status(404).json({
                    error: "Nie znaleziono departamentu przeznaczonego do usunięcia",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Nie udało się usunąć departamentu",
            });
        }
    }
}

export default DepartmentController;
