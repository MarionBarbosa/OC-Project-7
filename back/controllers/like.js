const db = require("../mysql_config");

//*********************************ADD AND DELETE LIKES*********************************
//**
// 1- Check if the post has already been liked or not in the database,
// 2- *If not liked, Add like to database
//    *If already liked, Delete from database
//**
exports.createLike = (req, res, next) => {
  const { userId, postId, like } = req.body;
  //find if already liked
  db.query(
    "SELECT * FROM liked WHERE postId=? AND userId=?",
    [postId, userId],

    (error, results) => {
      if (error) {
        res.json({ error });
      } else if (results != 0 && like === 1) {
        return res.status(400).json({ message: "post already liked" });
      } else if (results == 0 && like === 1) {
        db.query(
          `INSERT INTO liked SET postId=?, userId=?`,
          [postId, userId],
          (error, results) => {
            if (error) {
              res.json({ error });
            } else {
              res.status(200).json({ message: "like added" });
            }
          }
        );
      } else if (results != 0 && like === -1) {
        db.query(
          "DELETE FROM liked WHERE postId=? AND userId=?",
          [postId, userId],
          (error, results) => {
            if (error) {
              res.json({ error });
            } else {
              res.status(200).json({ message: "like deleted " });
            }
          }
        );
      } else if (results == 0 && like === -1) {
        return res.status(400).json({ message: "post already disliked" });
      }
    }
  );
};
//*********************************GET ALL LIKES*********************************
exports.getAllLike = (req, res, next) => {
  //get all likes for ONE post
  const postId = req.params.postId;
  db.query("SELECT * FROM liked WHERE postId=?", postId, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ message: "likes not found" });
    } else {
      res.status(200).json({ results });
    }
  });
};
