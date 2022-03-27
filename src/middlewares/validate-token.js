const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.headers["x-token"];
  if (!token)
    return res.json({ ok: false, mensaje: "Accesos no permitido - token" });

  const decoded = jwt.verify(token, process.env.KEY_SECRET);
  req.userId = decoded.id;
  next();
};

module.exports = validateToken;
