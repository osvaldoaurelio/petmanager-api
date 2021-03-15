const express = require("express");

const ServicesController = require("../controllers/ServicesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const servicesRouter = express.Router();

servicesRouter.use(ensureAuthenticated);

servicesRouter.get("/", ServicesController.list);
servicesRouter.get("/daily", ServicesController.daily);
servicesRouter.post("/", ServicesController.store);
servicesRouter.get("/:id", ServicesController.show);
servicesRouter.put("/:id", ServicesController.edit);
servicesRouter.delete("/:id", ServicesController.destroy);

module.exports = servicesRouter;
