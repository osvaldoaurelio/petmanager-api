const { DataTypes, Model } = require("sequelize");

class Pet extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        species: DataTypes.STRING,
        breed: DataTypes.STRING,
        description: DataTypes.STRING,
        gender: DataTypes.ENUM("female", "male"),
      },
      {
        sequelize,
        tableName: "pets",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: "client_id", as: "owner" });
    this.hasMany(models.Service, { foreignKey: "pet_id", as: "pet_service" });
    this.hasMany(models.Appointment, { foreignKey: "pet_id", as: "pet_appointment" });
  }
}

module.exports = Pet;
