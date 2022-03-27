const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    correo: String,
    clave: String,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
userSchema.methods.ValidatePassword = function (password) {
  return bcrypt.compare(password, this.clave);
};

userSchema.method("toJSON", function () {
  const { _id, clave, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("user", userSchema);
