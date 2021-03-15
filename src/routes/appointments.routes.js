const express = require("express");

const AppointmentsController = require("../controllers/AppointmentsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const appointmentsRouter = express.Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get("/", AppointmentsController.list);
appointmentsRouter.get("/daily", AppointmentsController.daily);
appointmentsRouter.post("/", AppointmentsController.store);
appointmentsRouter.get("/:id", AppointmentsController.show);
appointmentsRouter.put("/:id", AppointmentsController.edit);
appointmentsRouter.delete("/:id", AppointmentsController.destroy);

module.exports = appointmentsRouter;
