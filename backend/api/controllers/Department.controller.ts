import * as core from "express-serve-static-core";

import { DepartmentService } from "../services";
import { ServerStatuses } from "../../config";

const { OK, CREATED, INTERNAL_ERROR, NOT_FOUND } = ServerStatuses;
const departmentActions = new DepartmentService();

class DepartmentController {
    async addNewDepartment(req: core.Request, res: core.Response) {
        const { name, court_id } = req.body;
        try {
            const newDepartment = await departmentActions.createDepartment({
                name,
                court_id,
            });

            res.status(CREATED).json(newDepartment);
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Nie udało się utworzyć departamentu",
            });
        }
    }

    async getAllDepartments(req: core.Request, res: core.Response) {
        try {
            const departments = await departmentActions.findManyDepartments();

            if (departments) {
                res.status(OK).json(departments);
            } else {
                res.status(NOT_FOUND).json({
                    error: "Nie znaleziono żadnych departamentów",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Nie udało się pobrać listy departamentów",
            });
        }
    }

    async getSelectedDepartment(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const department = await departmentActions.findDepartmentByID(
                Number(id)
            );
            if (department) {
                res.status(OK).json(department);
            } else {
                res.status(NOT_FOUND).json({
                    error: "Departament nie został znaleziony",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Błąd podczas pobierania danych departamentu",
            });
        }
    }

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
                res.status(OK).json({
                    message:
                        "Dane wybranego departamentu zostały zaktualizowane",
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: "Nie znaleziono departamentu przeznaczonego do aktualizacji danych",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Aktualizacja departamentu nie powiodła się",
            });
        }
    }

    async removeDepartment(req: core.Request, res: core.Response) {
        const { id } = req.params;
        try {
            const removedDepartment = await departmentActions.deleteDepartment(
                Number(id)
            );

            if (removedDepartment) {
                res.status(OK).json({
                    message: "Departament został usunięty",
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: "Nie znaleziono departamentu przeznaczonego do usunięcia",
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: "Nie udało się usunąć departamentu",
            });
        }
    }
}

export default DepartmentController;
