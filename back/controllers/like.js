const db = require("../mysql_config");
//if like =1 check not already liked in database
//if like=-1 delete like from database
exports.like = (req, res, next) => {
  let userId = req.body.userId;
  let postId = req.body.postId;
  let like = req.body.like;
  console.log(req.body);
  //find if already liked
  db.query(
    "SELECT * FROM liked WHERE postId=? AND userId=?",
    [postId, userId],

    (error, results) => {
      if (error) {
        res.json({ error });
      } else if (results == 0 && like === 1) {
        db.query(
          `INSERT INTO liked SET postId=?, userId=?`,
          [postId, userId],
          (error, results) => {
            if (error) {
              res.json({ error });
            } else {
              res.status(200).json({ message: "like added " });
            }
          }
        );
      } else if (results != 0 && like === 1) {
        return res.status(400).json({ message: "post already liked" });
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
