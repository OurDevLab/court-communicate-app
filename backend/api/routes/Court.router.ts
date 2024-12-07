import express from "express";

import { ServerPaths } from "../../config";
import { CourtController } from "../controllers";

const { COURTS } = ServerPaths;
const courtController = new CourtController();

const courtRouter = express();

courtRouter.post(COURTS, courtController.addNewCourt);
courtRouter.get(COURTS, courtController.getAllCourts);
courtRouter.get(`${COURTS}/:id`, courtController.getSelectedCourt);
courtRouter.put(`${COURTS}/:id`, courtController.updateCourt);
courtRouter.delete(`${COURTS}/:id`, courtController.removeCourt);

export default courtRouter;
