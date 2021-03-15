const express = require('express');

const SessionsController = require('../controllers/SessionsController');

const sessionsRouter = express.Router();

sessionsRouter.post('/', SessionsController.create);

module.exports = sessionsRouter;
