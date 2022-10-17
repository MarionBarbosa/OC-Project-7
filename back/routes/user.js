const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/signUp", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:userId", userCtrl.getOneUser);
module.exports = router;
