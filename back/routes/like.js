const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const likeCtrl = require("../controllers/like");

router.get("/:postId", likeCtrl.getAllLike);
router.post("/", likeCtrl.createLike);

module.exports = router;
