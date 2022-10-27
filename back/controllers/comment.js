const db = require("../mysql_config");
let isAdmin = 0;

//function to check if the content of the comment is empty or whitespaces
function inputValidation(value) {
  const isEmpty = /^(?!\s*$).+/;
  if (!isEmpty.test(value)) {
    return "champ vide";
  } else {
    return null;
  }
}
// *******************CREATE COMMENT************************
//**
// 1- Check that the new comment content is valid,
// 2- Check user has permission
// 3- Create the comment
//**
exports.createComment = (req, res, next) => {
  //getting all data for new post from frontend
  const commentObject = req.body;
  if (inputValidation(commentObject.content) === null) {
    if (commentObject.userId !== req.auth.userId) {
      res.status(401).json({ message: "Access denied" });
    } else {
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
            //getting the comment last inserted to send back to front
            db.query(
              "SELECT * FROM comment WHERE id=?",
              results.insertId,
              (error, results) => {
                if (error) {
                  res.json({ error });
                } else if (results == 0) {
                  return res.status(404).json({ error: "Comment not found" });
                } else {
                  res.status(200).json({
                    results,
                  });
                }
              }
            );
          }
        }
      );
    }
  } else {
    res.status(400).json({ message: "champ vide" });
  }
};
//*********************************GET COMMENTS PER POST*********************************
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
//*********************************GET ALL COMMENTS*********************************
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
//*********************************MODIFY COMMENT*********************************
exports.modifyComment = (req, res, next) => {
  const comment = req.body;
  const commentId = req.params.commentId;
  //**
  // 1- Check that the new comment content is valid,
  // 2- Check user's permisson
  // 3- Look for the comment in database and if exist
  // 5- Modify the comment
  //**
  if (inputValidation(comment.content) === null) {
    db.query(
      "SELECT * FROM user WHERE id=?",
      req.auth.userId,
      (error, results) => {
        if (error) {
          res.json({ error });
        } else if (results == 0) {
          return res.status(404).json({ error: "user not found" });
        } else if (results[0].admin === 1) {
          isAdmin = 1;
        } else {
          isAdmin = 0;
        }
      }
    );
    db.query(
      "SELECT * FROM comment WHERE id=?",
      commentId,
      (error, results) => {
        if (error) {
          res.json({ error });
        } else if (results == 0) {
          return res.status(404).json({ error: "Comment not found" });
        } else {
          if (isAdmin !== 1 && results[0].userId !== req.auth.userId) {
            return res.status(400).json({ message: "access denied" });
          } else {
            db.query(
              `UPDATE comment SET content=? WHERE id=?`,
              [comment.content, commentId],
              (error, results) => {
                if (error) {
                  res.json({ error });
                } else if (results == 0) {
                  return res
                    .status(404)
                    .json({ error: "comment not modified" });
                } else {
                  res.status(200).json({ message: "comment modified" });
                }
              }
            );
          }
        }
      }
    );
  } else {
    res.status(400).json({ message: "champ vide" });
  }
};
//*********************************DELETE COMMENT **************************************

//**
// 1- Checking user's permisson
// 2- Look for the coment in database and if exist
// 3- Delete the comment
//**
exports.deleteComment = (req, res, next) => {
  const commentId = req.params.commentId;
  db.query(
    "SELECT * FROM user WHERE id=?",
    req.auth.userId,
    (error, results) => {
      if (error) {
        res.json({ error });
      } else if (results == 0) {
        return res.status(404).json({ error: "user not found" });
      } else if (results[0].admin === 1) {
        isAdmin = 1;
      } else {
        isAdmin = 0;
      }
    }
  );
  db.query("SELECT * FROM comment WHERE id=?", commentId, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "Comment not found" });
    } else {
      //checking  if the user is authorized
      if (isAdmin !== 1 && results[0].userId !== req.auth.userId) {
        return res.status(400).json({ message: "access denied" });
      } else {
        //if comment is in database and user is authorized then it now can be deleted
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
    }
  });
};
