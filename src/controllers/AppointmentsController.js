const { Op: { between, iLike } } = require('sequelize');

const Pet = require("../models/Pet");
const Appointment = require("../models/Appointment");

module.exports = {
  async list(req, res) {
    const { query: { search = '' } } = req;

    const appointments = await Appointment.findAll({
      order: [["created_at", "ASC"]],
      include: [{
        association: "appointment_pet",
        include: [{ association: "owner" }],
      }],
      where: {
        description: { [iLike]: `%${search}%` }
      },
    });

    return res.json({ appointments });
  },

  async daily(req, res) {
    const startOfDay = new Date().toISOString().replace(/T.*/, 'T00:00:00.000Z');
    const endOfDay = new Date().toISOString().replace(/T.*/, 'T23:59:59.999Z');

    const dailyAppointments = await Appointment.findAll({
      order: [["created_at", "ASC"]],
      include: [{
        association: "appointment_pet",
        include: [{ association: "owner" }]
      }],
      where: {
        date: { [between]: [startOfDay, endOfDay] },
      },
    });

    return res.json({ dailyAppointments });
  },

  async store(req, res) {
    const {
      pet_id,
      description,
      date,
    } = req.body.appointment;

    if (pet_id && date) {
      const pet = await Pet.findByPk(pet_id);
      if (!pet) {
        return res.status(404).json({ error: "Pet not found!" });
      }

      const appointment = await Appointment.create({
        pet_id,
        description,
        date,
      });

      return res.status(201).json({ appointment });
    } else {
      return res.status(400).json({ error: "Bad request" });
    }
  },

  async show(req, res) {
    const { params: { id } } = req;

    const appointment = await Appointment.findOne({
      where: { id },
      include: [{
        association: "appointment_pet",
        include: [{ association: "owner" }]
      }],
    });

    if (appointment) {
      return res.json({ appointment });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },

  async edit(req, res) {
    const { params: { id } } = req;

    let appointment = await Appointment.findByPk(id);

    if (appointment) {
      const { pet_id, description, date } = req.body.appointment;

      appointment.pet_id = pet_id ?? appointment.pet_id;
      appointment.description = description ?? appointment.description;
      appointment.date = date ?? appointment.date;

      appointment = await appointment.save();

      return res.json({ appointment });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },

  async destroy(req, res) {
    const { params: { id }, user: { is_admin } } = req;

    if (!is_admin) {
      return res.status(403).json({ error: "Forbidden!" });
    }

    const appointment = await Appointment.findByPk(id);

    if (appointment) {
      await appointment.destroy();

      return res.status(204).json();
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },
};
