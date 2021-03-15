const { Op: { or, like } } = require('sequelize');

const Client = require("../models/Client");

module.exports = {
  async list(req, res) {
    const { query: { search = '', pet = '' } } = req;

    const clients = await Client.findAll({
      where: {
        [or]: [
          { name: { [like]: `%${search}%` } },
          { cpf: { [like]: `%${search}%` } },
          { '$owned.species$': { [like]: `%${pet}%` } },
        ],
      },
      include: [{ 
        association: 'owned',
      }],
    });

    return res.json({ clients });
  },

  async store(req, res) {
    const { name, cpf, address = "", phone = "" } = req.body.client;

    if (name && cpf) {
      const client = await Client.create({ name, cpf, address, phone });

      return res.status(201).json({ client });
    } else {
      return res.status(400).json({ error: "Bad request" });
    }
  },

  async show(req, res) {
    const { id } = req.params;

    const client = await Client.findByPk(id);

    if (client) {
      return res.json({ client });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },

  async edit(req, res) {
    const { params: { id } } = req;

    let client = await Client.findByPk(id);

    if (client) {
      const { name, cpf, address, phone } = req.body.client;

      client.name = name ?? client.name;
      client.cpf = cpf ?? client.cpf;
      client.address = address ?? client.address;
      client.phone = phone ?? client.phone;

      client = await client.save();

      return res.json({ client });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },

  async destroy(req, res) {
    const { params: { id }, user: { is_admin } } = req;

    if (!is_admin) {
      return res.status(403).json({ error: "Forbidden!" });
    }

    const client = await Client.findByPk(id);

    if (client) {
      await client.destroy();

      return res.status(204).json();
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },
};
