const { Op: { iLike, gte, lte } } = require('sequelize');

const Pet = require("../models/Pet");
const Service = require("../models/Service");

module.exports = {
  async list(req, res) {
    const { query: { search = '' } } = req;

    const services = await Service.findAll({
      order: [["created_at", "ASC"]],
      include: [{
        association: "service_pet",
        include: [{ association: "owner" }]
      }],
      where: {
        description: { [iLike]: `%${search}%` },
      },
    });

    return res.json({ services });
  },

  async daily(req, res) {
    const dailyServices = await Service.findAll({
      order: [["created_at", "ASC"]],
      include: [{
        association: "service_pet",
        include: [{ association: "owner" }]
      }],
      where: {
        initial_date: { [lte]: new Date().toISOString() },
        final_date: { [gte]: new Date().toISOString() },
      },
    });

    return res.json({ dailyServices });
  },

  async store(req, res) {
    const {
      pet_id,
      description,
      initial_date,
      final_date,
      price,
    } = req.body.service;

    if (pet_id && initial_date && final_date && price) {
      const pet = await Pet.findByPk(pet_id);
      if (!pet) {
        return res.status(404).json({ error: "Pet not found!" });
      }

      const service = await Service.create({
        pet_id,
        description,
        initial_date,
        final_date,
        price,
      });

      return res.status(201).json({ service });
    } else {
      return res.status(400).json({ error: "Bad request" });
    }
  },

  async show(req, res) {
    const { params: { id } } = req;

    const service = await Service.findOne({
      where: { id },
      include: [{
        association: "service_pet",
        include: [{ association: "owner" }]
      }],
    });

    if (service) {
      return res.json({ service });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },

  async edit(req, res) {
    const { params: { id } } = req;

    let service = await Service.findByPk(id);

    if (service) {
      const {
        pet_id,
        description,
        initial_date,
        final_date,
        price,
      } = req.body.service;

      service.pet_id = pet_id ?? service.pet_id;
      service.description = description ?? service.description;
      service.initial_date = initial_date ?? service.initial_date;
      service.final_date = final_date ?? service.final_date;
      service.price = price ?? service.price;

      service = await service.save();

      return res.json({ service });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },

  async destroy(req, res) {
    const { params: { id }, user: { is_admin } } = req;

    if (!is_admin) {
      return res.status(403).json({ error: "Forbidden!" });
    }

    const service = await Service.findByPk(id);

    if (service) {
      await service.destroy();

      return res.status(204).json();
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },
};
