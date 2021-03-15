'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('settings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      appointmentHalftime: {
        type: Sequelize.BOOLEAN,
        field: 'appointment_halftime',
        allowNull: true,
        defaultValue: false,
      },
      appointmentPrice: {
        type: Sequelize.FLOAT,
        field: 'appointment_price',
        allowNull: true,
        defaultValue: 50.0,
      },
      maxServiceDayly: {
        type: Sequelize.INTEGER,
        field: 'max_service_dayly',
        allowNull: true,
        defaultValue: 10,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('settings');
  },
};
