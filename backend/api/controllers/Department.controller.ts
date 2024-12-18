import * as core from "express-serve-static-core";

import { DepartmentService } from "../services";
import { ServerStatuses, ServerMessages } from "../../config";

const { OK, CREATED, INTERNAL_ERROR, NOT_FOUND } = ServerStatuses;
const { DepartmentMessages } = ServerMessages;

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
                error: DepartmentMessages.CREATE_DEPARTMENT_ERROR,
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
                    error: DepartmentMessages.NONE_DEPARTMENT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: DepartmentMessages.GET_DEPARTMENTS_ERROR,
            });
        }
    }

    async getDepartmentsByCourtID(req: core.Request, res: core.Response) {
        const { court_id } = req.params;

        try {
            const departments =
                await departmentActions.findDepartmentsByCourtID(
                    Number(court_id)
                );

            if (departments.length > 0) {
                res.status(OK).json(departments);
            } else {
                res.status(NOT_FOUND).json({
                    error: DepartmentMessages.NONE_DEPARTMENT_FOUND_FOR_COURT,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: DepartmentMessages.GET_DEPARTMENTS_ERROR,
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
                    error: DepartmentMessages.SELECTED_DEPARTMENT_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: DepartmentMessages.GET_SELECTED_DEPARTMENT_ERROR,
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
                    message: DepartmentMessages.UPDATE_DEPARTMENT_SUCCESS,
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: DepartmentMessages.DEPARTMENT_TO_UPDATE_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: DepartmentMessages.UPDATE_DEPARTMENT_ERROR,
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
                    message: DepartmentMessages.DELETE_DEPARTMENT_SUCCES,
                });
            } else {
                res.status(NOT_FOUND).json({
                    error: DepartmentMessages.DEPARTMENT_TO_DELETE_NOT_FOUND,
                });
            }
        } catch (error) {
            res.status(INTERNAL_ERROR).json({
                error: DepartmentMessages.DELETE_DEPARTMENT_ERROR,
            });
        }
    }
}

export default DepartmentController;
