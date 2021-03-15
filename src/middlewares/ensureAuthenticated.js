const { verify } = require("jsonwebtoken");

const { jwt } = require("../config/app");

const ensureAuthenticated = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({ error: "JWT token is missing" });
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub } = verify(token, jwt.secret);
    const [id, is_admin] = sub.split(" ");

    req.user = { id, is_admin: is_admin === 'true' };

    return next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid JWT token" });
  }
};

module.exports = ensureAuthenticated;
