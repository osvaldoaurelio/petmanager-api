const express = require("express");

const clientsRouter = require("./clients.routes");
const petsRouter = require("./pets.routes");
const servicesRouter = require("./services.routes");
const sessionsRouter = require("./sessions.routes");
const appointmentsRouter = require("./appointments.routes");
const settingsRouter = require("./settings.routes");
const usersRouter = require("./users.routes");

const router = express.Router();

router.use("/clients", clientsRouter);
router.use("/pets", petsRouter);
router.use("/services", servicesRouter);
router.use("/sessions", sessionsRouter);
router.use("/appointments", appointmentsRouter);
router.use("/settings", settingsRouter);
router.use("/users", usersRouter);

module.exports = router;
