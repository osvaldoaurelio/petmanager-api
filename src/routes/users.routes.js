const express = require("express");

const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRouter = express.Router();

usersRouter.use(ensureAuthenticated);

usersRouter.get("/", UsersController.list);
usersRouter.post("/", UsersController.store);
usersRouter.get("/:id", UsersController.show);
usersRouter.put("/:id", UsersController.edit);
usersRouter.put("/:id/pass", UsersController.resetPass);
usersRouter.delete("/:id", UsersController.destroy);

module.exports = usersRouter;
