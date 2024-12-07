import express from "express";

import { ServerPaths } from "../../config";
import { DepartmentController } from "../controllers";

const { DEPARTMENTS } = ServerPaths;
const departmentController = new DepartmentController();

const departmentRouter = express();

departmentRouter.post(DEPARTMENTS, departmentController.addNewDepartment);
departmentRouter.get(DEPARTMENTS, departmentController.getAllDepartments);
departmentRouter.get(
    `${DEPARTMENTS}/:id`,
    departmentController.getSelectedDepartment
);
departmentRouter.put(
    `${DEPARTMENTS}/:id`,
    departmentController.updateDepartment
);
departmentRouter.delete(
    `${DEPARTMENTS}/:id`,
    departmentController.removeDepartment
);

export default departmentRouter;
