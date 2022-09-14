const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

router.get("/:postId", commentCtrl.getAllComment);
router.post("/", commentCtrl.createComment);
router.put("/:postId/:commentId", commentCtrl.modifyComment);
router.delete("/:postId/:commentId", commentCtrl.deleteComment);

module.exports = router;
