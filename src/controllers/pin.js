const Pin = require("../models/Pin");

//Crear pin
const crearPin = async (req, res) => {
  const { clave } = req.body;
  try {
    if (clave.length > 4 || clave.length < 4) {
      return res.json({
        ok: false,
        mensaje: "La cantidad de caractes es mayor o menor",
      });
    }

    const pin = new Pin({ clave });
    await pin.save();
    return res.json({
      ok: true,
      mensaje: "Pin registrado con exito",
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      mensaje: "Algo salio mal",
    });
  }
};

//login pin
const loginPin = async (req, res) => {
  const { clave } = req.body;

  let pin = await Pin.findOne({ clave });
  if (!pin)
    return res.json({
      ok: false,
      mensaje: "Pin incorrecto",
      pin,
    });

  return res.json({
    ok: true,
    mensaje: "Todo bien",
    pin,
  });
};

module.exports = { crearPin, loginPin };
