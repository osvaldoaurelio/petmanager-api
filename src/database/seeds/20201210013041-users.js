"use strict";

const { hash } = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Osvaldo Aurélio",
          username: "admin",
          password: await hash("admin", 8),
          is_admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Aurélio Ribeiro",
          username: "funcionario1",
          password: await hash("123456", 8),
          is_admin: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Ribeiro Silva",
          username: "funcionario2",
          password: await hash("123456", 8),
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
