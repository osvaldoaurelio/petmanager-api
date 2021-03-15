const { Op } = require("sequelize");

const Setting = require("../models/Setting");

module.exports = {
  async list(req, res) {
    const settings = await Setting.findAll();

    return res.json({ settings });
  },

  async store(req, res) {
    const { user: { is_admin } } = req;

    if (!is_admin) {
      return res.status(403).json({ error: "Forbidden!" });
    }

    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const start = new Date(`${today} 00:00:00`);
    const end = new Date(`${today} 23:59:59`);

    const {
      appointmentHalftime,
      appointmentPrice,
      maxServiceDayly,
    } = req.body.setting;

    if (appointmentPrice && maxServiceDayly) {
      let setting = await Setting.findOne({
        where: { created_at: { [Op.between]: [start, end] } },
      });

      if (setting) {
        setting.appointmentHalftime = appointmentHalftime ?? setting.appointmentHalftime;
        setting.appointmentPrice = appointmentPrice ?? setting.appointmentPrice;
        setting.maxServiceDayly = maxServiceDayly ?? setting.maxServiceDayly;

        setting = await setting.save();
      } else {
        setting = await Setting.create({
          appointmentHalftime,
          appointmentPrice,
          maxServiceDayly,
        });
      }

      return res.status(201).json({ setting });
    } else {
      return res.status(400).json({ error: "Bad request" });
    }
  },

  async show(req, res) {
    const { params: { date } } = req;

    const start = new Date(`${date} 00:00:00`);
    const end = new Date(`${date} 23:59:59`);
    
    const setting = await Setting.findOne({
      where: { created_at: { [Op.between]: [start, end] } },
    });

    if (setting) {
      return res.json({ setting });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },

  async last(req, res) {
    const setting = await Setting.findOne({
      order: [[ "created_at", "DESC" ]],
    });

    if (setting) {
      return res.json({ setting });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },
};
