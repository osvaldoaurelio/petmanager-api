const { DataTypes, Model } = require("sequelize");

class Setting extends Model {
  static init(sequelize) {
    super.init(
      {
        appointmentHalftime: DataTypes.BOOLEAN,
        appointmentPrice: DataTypes.FLOAT,
        maxServiceDayly: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: "settings",
      }
    );
  }
}

module.exports = Setting;
