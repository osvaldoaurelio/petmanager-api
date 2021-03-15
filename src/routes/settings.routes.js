const express = require("express");

const SettingsController = require("../controllers/SettingsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const settingsRouter = express.Router();

settingsRouter.use(ensureAuthenticated);

settingsRouter.get("/", SettingsController.list);
settingsRouter.post("/", SettingsController.store);
settingsRouter.get("/last", SettingsController.last);
settingsRouter.get("/:date", SettingsController.show);

module.exports = settingsRouter;
