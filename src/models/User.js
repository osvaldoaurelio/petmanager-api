const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        is_admin: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: "users",
      }
    );
  }
}

module.exports = User;
