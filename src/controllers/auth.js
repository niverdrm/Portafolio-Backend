const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Registrar-----
const registrar = async (req, res) => {
  const { correo, clave } = req.body;
  try {
    if (await User.findOne({ correo }))
      return res
        .status(400)
        .json({ ok: false, mensaje: "Correo ya esta registrado" });

    const newUser = new User({ correo, clave });
    newUser.clave = await newUser.encryptPassword(newUser.clave);
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.KEY_SECRET, {
      expiresIn: "3h",
    });
    res.json({
      ok: true,
      mensaje: "Usuario registrado con exito",
      usuario: newUser,
      toke: token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Algo salio mal",
    });
  }
};

//LOGIN--------
const login = async (req, res) => {
  const { correo, clave } = req.body;
  try {
    let user = await User.findOne({ correo });
    if (!user)
      return res.json({
        ok: false,
        mensaje: "Correo no registrado",
      });

    const validarClave = await user.ValidatePassword(clave);
    if (!validarClave)
      return res.json({ ok: false, mensaje: "Contraseña Incorrecta" });

    const token = jwt.sign({ id: user._id }, process.env.KEY_SECRET, {
      expiresIn: "2h",
    });

    res.json({
      ok: true,
      mensaje: "Todo bien",
      token,
    });
  } catch (error) {}
};

//prueba---
const prueba = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.json({
        ok: false,
        mensaje: "No se encontraron resultados",
      });
    }
    res.json({
      ok: true,
      mensaje: "todo bien",
      user: user,
    });
  } catch (error) {}
};

module.exports = { registrar, login, prueba };
