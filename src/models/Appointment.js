const { DataTypes, Model } = require("sequelize");

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
        date: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "appointments",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Pet, { foreignKey: "pet_id", as: "appointment_pet" });
  }
}

module.exports = Appointment;
