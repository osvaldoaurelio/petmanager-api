const express = require("express");

const PetsController = require("../controllers/PetsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const petsRouter = express.Router();

petsRouter.use(ensureAuthenticated);

petsRouter.get("/", PetsController.list);
petsRouter.post("/", PetsController.store);
petsRouter.get("/:id", PetsController.show);
petsRouter.put("/:id", PetsController.edit);
petsRouter.delete("/:id", PetsController.destroy);

module.exports = petsRouter;
