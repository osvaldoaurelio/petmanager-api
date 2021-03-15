const { hash } = require("bcryptjs");

const User = require("../models/User");

module.exports = {
  async list(req, res) {
    const { user: { is_admin } } = req;

    if (!is_admin) {
      return res.status(403).json({ error: "Forbidden!" });
    }

    const users = await User.findAll({
      where: { is_admin: false }
    });

    return res.json({ users });
  },

  async store(req, res) {
    const { user: { is_admin } } = req;

    if (!is_admin) {
      return res.status(403).json({ error: "Forbidden!" });
    }

    const { name, username, password } = req.body.user;

    if (name && username && password) {
      const existUsername = await User.findOne({ where: { username } });
      if (existUsername) {
        return res.status(400).json({ error: "Este Usuário já existe!" });
      }

      const user = await User.create({
        name,
        username,
        password: await hash(password, 8),
      });

      return res.status(201).json({ user });
    } else {
      return res.status(400).json({ error: "Bad request" });
    }
  },

  async show(req, res) {
    const { params: { id }, user: { is_admin } } = req;

    if (!is_admin) {
      return res.status(403).json({ error: "Forbidden!" });
    }

    const user = await User.findByPk(id);

    if (user) {
      return res.json({ user });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },

  async edit(req, res) {
    const { params: { id }, user: { is_admin } } = req;

    if (!is_admin) {
      return res.status(403).json({ error: "Forbidden!" });
    }

    let user = await User.findByPk(id);

    if (user) {
      const { name } = req.body.user;

      user.name = name ?? user.name;

      user = await user.save();

      return res.json({ user });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },

  async resetPass(req, res) {
    const { params: { id }, user: { is_admin } } = req;

    if (!is_admin) {
      return res.status(403).json({ error: "Forbidden!" });
    }

    let user = await User.findByPk(id);

    if (user) {
      const { password } = req.body.user;

      if (!password) {
        return res.status(400).json({ error: "Bad request" });
      }

      user.password = await hash(password, 8);

      user = await user.save();

      return res.json({ user });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },

  async destroy(req, res) {
    const { params: { id }, user: { is_admin } } = req;

    if (!is_admin) {
      return res.status(403).json({ error: "Forbidden!" });
    }

    const user = await User.findByPk(id);

    if (user) {
      await user.destroy();

      return res.status(204).json();
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  },
};
