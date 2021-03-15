const Sequelize = require("sequelize");

const Setting = require("../models/Setting");
const User = require("../models/User");
const Client = require("../models/Client");
const Pet = require("../models/Pet");
const Service = require("../models/Service");
const Appointment = require("../models/Appointment");

const dbConfig = require("../config/database");

const connection = new Sequelize(dbConfig);

Setting.init(connection);
User.init(connection);
Client.init(connection);
Pet.init(connection);
Service.init(connection);
Appointment.init(connection);

Client.associate(connection.models);
Pet.associate(connection.models);
Service.associate(connection.models);
Appointment.associate(connection.models);

module.exports = connection;
