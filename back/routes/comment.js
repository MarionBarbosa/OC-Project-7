const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

router.get("/:postId", auth, commentCtrl.getPostComment);
router.get("/", auth, commentCtrl.getAllComment);
router.post("/", auth, commentCtrl.createComment);
router.put("/:commentId", auth, commentCtrl.modifyComment);
router.delete("/:commentId", auth, commentCtrl.deleteComment);

module.exports = router;
