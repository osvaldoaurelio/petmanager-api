const { DataTypes, Model } = require("sequelize");

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
        initial_date: DataTypes.DATE,
        final_date: DataTypes.DATE,
        price: DataTypes.FLOAT,
      },
      {
        sequelize,
        tableName: "services",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Pet, { foreignKey: "pet_id", as: "service_pet" });
  }
}

module.exports = Service;
