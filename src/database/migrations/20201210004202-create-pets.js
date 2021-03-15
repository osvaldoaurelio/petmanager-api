"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pets", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: { model: "clients", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      species: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      breed: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["female", "male"],
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pets");
  },
};
