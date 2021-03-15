"use strict";

require("../../database");

const Pet = require("../../models/Pet");

const { sample_id } = require("../../utils");

const select_id = { attributes: ["id"] };

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "services",
      [
        {
          pet_id: sample_id(await Pet.findAll(select_id)),
          description: "Serviço de exemplo preenchida no seed 1",
          initial_date: new Date(2021, 1, 1, 12),
          final_date: new Date(2021, 2, 1, 12),
          price: 50,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: sample_id(await Pet.findAll(select_id)),
          description: "Serviço de exemplo preenchida no seed 2",
          initial_date: new Date(2021, 2, 2, 13),
          final_date: new Date(2021, 3, 2, 13),
          price: 100,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: sample_id(await Pet.findAll(select_id)),
          description: "Serviço de exemplo preenchida no seed 3",
          initial_date: new Date(2021, 3, 3, 11),
          final_date: new Date(2021, 4, 3, 11),
          price: 250,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: sample_id(await Pet.findAll(select_id)),
          description: "Serviço de exemplo preenchida no seed 4",
          initial_date: new Date(2021, 4, 4, 10),
          final_date: new Date(2021, 5, 4, 10),
          price: 150,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("services", null, {});
  },
};
