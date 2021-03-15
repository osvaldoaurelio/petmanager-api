const { DataTypes, Model } = require("sequelize");

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        cpf: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "clients",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Pet, { foreignKey: "client_id", as: "owned" });
  }
}

module.exports = Client;
