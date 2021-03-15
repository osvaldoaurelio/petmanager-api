const Pet = require("../models/Pet");

module.exports = {
  async list(req, res) {
    try {
      const pets = await Pet.findAll({
        include: [{ association: "owner" }],
        // order: [['$owner.name$', 'ASC']]
      });

      return res.json({ pets });
    } catch (err) {
      console.log(err);
      return res.status(400).json();
    }
  },

  async store(req, res) {
    const {
      name,
      species,
      breed,
      description,
      gender,
      client_id,
    } = req.body.pet;

    if (name && species && gender && client_id) {
      const pet = await Pet.create({
        name,
        species,
        breed,
        description,
        gender,
        client_id,
      });

      return res.status(201).json({ pet });
    } else {
      return res.status(400).json({ error: "Bad request" });
    }
  },

  async show(req, res) {
    const { params: { id } } = req;

    const pet = await Pet.findOne({
      where: { id },
      include: [{ association: "owner" }],
    });

    if (pet) {
      return res.json({ pet });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },

  async edit(req, res) {
    const { params: { id } } = req;

    let pet = await Pet.findByPk(id);

    if (pet) {
      const {
        name,
        species,
        breed,
        description,
        gender,
        client_id,
      } = req.body.pet;

      pet.name = name ?? pet.name;
      pet.species = species ?? pet.species;
      pet.breed = breed ?? pet.breed;
      pet.description = description ?? pet.description;
      pet.gender = gender ?? pet.gender;
      pet.client_id = client_id ?? pet.client_id;

      pet = await pet.save();

      return res.json({ pet });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },

  async destroy(req, res) {
    const { params: { id }, user: { is_admin } } = req;

    if (!is_admin) {
      return res.status(403).json({ error: "Forbidden!" });
    }

    const pet = await Pet.findByPk(id);

    if (pet) {
      await pet.destroy();

      return res.status(204).json();
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },
};
