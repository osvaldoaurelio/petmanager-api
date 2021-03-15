"use strict";

require("../../database");

const Client = require("../../models/Client");

const { sample_id } = require("../../utils");

const select_id = { attributes: ["id"] };

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "pets",
      [
        {
          client_id: sample_id(await Client.findAll(select_id)),
          name: "Gatinho",
          species: "Cachorro",
          breed: "Basse",
          description: "Morde",
          gender: "male",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          client_id: sample_id(await Client.findAll(select_id)),
          name: "Cachorrinho",
          species: "Peixe",
          breed: "Dourado",
          description: "Agressivo",
          gender: "male",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          client_id: sample_id(await Client.findAll(select_id)),
          name: "Peixinha",
          species: "Gato",
          breed: "Persa",
          description: "Bem calmo e tranquilo",
          gender: "female",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pets", null, {});
  },
};
