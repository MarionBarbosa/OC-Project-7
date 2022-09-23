const db = require("../mysql_config");

exports.createComment = (req, res, next) => {
  //getting all data for new post from frontend
  const commentObject = req.body;
  const comment = {
    ...commentObject,
  };

  //sending new comment into database
  db.query(
    "INSERT INTO comment SET content=?, userId=?, postId=?",
    [comment.content, comment.userId, comment.postId],
    (error, results) => {
      if (error) {
        res.json({ error });
      } else if (results == 0) {
        return res.status(404).json({ error: "Comment not saved" });
      } else {
        db.query(
          "SELECT * FROM comment WHERE id=?",
          results.insertId,
          (error, results) => {
            if (error) {
              res.json({ error });
            } else if (results == 0) {
              return res.status(404).json({ error: "Comment not found" });
            } else {
              console.log(results);
              res.status(200).json({
                results,
              });
            }
          }
        );
      }
    }
  );
  //checking if the userId is the same to authorise new comment, if not matching throw err
  // if (commentObject.userId !== req.auth.userId) {
  //   res.status(401).json({ message: "Access denied" });
  // } else {
  // const comment = new Comment({
  //   ...commentObject,
  // });

  // //sending new comment into database
  // db.query(
  //   "INSERT INTO comment SET ?",
  //   [comment.content, comment.userId, comment.postId],
  //   (error, results) => {
  //     if (error) {
  //       res.json({ error });
  //     } else if (results == 0) {
  //       return res.status(404).json({ error: "Comment not saved" });
  //     } else {
  //       res.status(201).json({
  //         message: "comment created",
  //       });
  //     }
  //   }
  // );
  //}
};

exports.getPostComment = (req, res, next) => {
  //get all comments for ONE post
  const postId = req.params.postId;
  db.query("SELECT * FROM comment WHERE postId=?", postId, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ message: "comments not found" });
    } else {
      res.status(200).json({ results });
    }
  });
};
exports.getAllComment = (req, res, next) => {
  db.query("SELECT * FROM comment", (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ message: "comments not found" });
    } else {
      res.status(200).json({ results });
    }
  });
};
exports.modifyComment = (req, res, next) => {
  const comment = req.body;
  const commentId = req.params.commentId;
  console.log(req.params);
  // if (comment.userId !== req.auth.userId) {
  //   return res.status(400).json({ message: "access denied" });
  // } else {
  db.query("SELECT * FROM comment WHERE id=?", commentId, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "Comment not found" });
    } else {
      db.query(
        `UPDATE comment SET content=? WHERE id=?`,
        [comment.content, commentId],
        (error, results) => {
          if (error) {
            res.json({ error });
          } else if (results == 0) {
            return res.status(404).json({ error: "comment not modified" });
          } else {
            res.status(200).json({ message: "comment modified" });
          }
        }
      );
    }
  });
  //}
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.commentId;
  console.log(commentId);
  //authentification to allow user to delete comment
  // if (comment.userId !== req.auth.userId) {
  //   return res.status(400).json({ message: "access denied" });
  // } else {
  //searching for comment in database
  db.query("SELECT * FROM comment WHERE id=?", commentId, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "Comment not found" });
    } else {
      //if comment is in database it now can be deleted
      db.query(
        "DELETE FROM comment WHERE id =?",
        commentId,
        (error, results) => {
          if (error) {
            res.json({ error });
          } else if (results == 0) {
            return res.status(404).json({ error: "Comment not deleted" });
          } else {
            res.status(200).json({ message: "Comment deleted " });
          }
        }
      );
    }
  });
  //}
};
