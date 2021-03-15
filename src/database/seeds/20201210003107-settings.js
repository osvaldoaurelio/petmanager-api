"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "settings",
      [
        {
          appointment_halftime: true,
          appointment_price: 50.0,
          max_service_dayly: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("settings", null, {});
  },
};
