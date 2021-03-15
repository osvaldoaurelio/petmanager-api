const express = require("express");

const ClientsController = require("../controllers/ClientsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const clientsRouter = express.Router();

clientsRouter.use(ensureAuthenticated);

clientsRouter.get("/", ClientsController.list);
clientsRouter.post("/", ClientsController.store);
clientsRouter.get("/:id", ClientsController.show);
clientsRouter.put("/:id", ClientsController.edit);
clientsRouter.delete("/:id", ClientsController.destroy);

module.exports = clientsRouter;
