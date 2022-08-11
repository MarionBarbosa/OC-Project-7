const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/signUp", userCtrl.signup);
//router.post("/signIn", userCtrl.signIn);

module.exports = router;
