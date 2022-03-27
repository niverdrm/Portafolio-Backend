const { Router } = require("express");
const router = Router();
const validateToken = require("../middlewares/validate-token");
const { registrar, prueba, login } = require("../controllers/auth");

router.get("/prueba", validateToken, prueba);
router.post("/registrar-usuario", registrar);
router.post("/login", login);

module.exports = router;
