const { Schema, model } = require("mongoose");

const pinSchema = new Schema(
  {
    clave: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("pin", pinSchema);
