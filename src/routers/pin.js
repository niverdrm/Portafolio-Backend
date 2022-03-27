const { Router } = require("express");
const { login } = require("../controllers/auth");
const router = Router();
const { crearPin, loginPin } = require("../controllers/pin");

router.post("/crearPin", crearPin);
router.post("/loginPin", loginPin);

module.exports = router;
