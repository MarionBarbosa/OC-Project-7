const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const likeCtrl = require("../controllers/comment");

router.post("/:id/comment", auth, commentCtrl.comment);

module.exports = router;
