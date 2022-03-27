const mongoose = require("mongoose");

const conexion = async () => {
  try {
    mongoose.connect("mongodb://localhost/portafolio", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("base de datos conectada");
  } catch (error) {
    console.log(error);
    console.log(" error en la base de datos");
  }
};

module.exports = conexion;
