const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

router.get("/:postId", commentCtrl.getPostComment);
router.get("/", commentCtrl.getAllComment);
router.post("/", commentCtrl.createComment);
router.put("/:commentId", commentCtrl.modifyComment);
router.delete("/:commentId", commentCtrl.deleteComment);

module.exports = router;
