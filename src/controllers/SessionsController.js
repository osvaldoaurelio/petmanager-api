const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const User = require('../models/User');

const { jwt } = require('../config/app');

module.exports = {
  async create(req, res) {
    const { username, password } = req.body.session;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário e/ou Senha estão incorretos' });
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ error: 'Usuário e/ou Senha estão incorretos' });
    }

    const token = sign({}, jwt.secret, {
      subject: `${user.id} ${user.is_admin}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({ user, token });
  },
}
