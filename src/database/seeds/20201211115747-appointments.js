"use strict";

require("../../database");

const Pet = require("../../models/Pet");

const { sample_id } = require("../../utils");

const select_id = { attributes: ["id"] };

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "appointments",
      [
        {
          pet_id: sample_id(await Pet.findAll(select_id)),
          description: "Serviço de exemplo preenchida no seed 1",
          date: new Date(2021, 2, 15, 12),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: sample_id(await Pet.findAll(select_id)),
          description: "Serviço de exemplo preenchida no seed 2",
          date: new Date(2021, 2, 15, 13),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("appointments", null, {});
  },
};
