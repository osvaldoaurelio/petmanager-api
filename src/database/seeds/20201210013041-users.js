"use strict";

const { hash } = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          username: "admin",
          password: await hash("admin", 8),
          is_admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Carlos Henrique",
          username: "funcionario1",
          password: await hash("funcionario1", 8),
          is_admin: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Henrique Carlos",
          username: "funcionario2",
          password: await hash("funcionario2", 8),
          is_admin: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
