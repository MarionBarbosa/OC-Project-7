const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const likeCtrl = require("../controllers/like");

router.get("/:postId", auth, likeCtrl.getAllLike);
router.post("/", auth, likeCtrl.createLike);

module.exports = router;
