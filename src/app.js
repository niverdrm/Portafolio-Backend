const express = require("express");
const app = express();
const baseDatos = require("./database/config");
const cors = require("cors");

// libreria
app.use(express.json());

// base de datos
baseDatos();

// Cors
app.use(cors());

// Rutas auth
app.use("/api", require("./routers/auth"));

//Rutas pin
app.use("/api/pin", require("./routers/pin"));

module.exports = app;
