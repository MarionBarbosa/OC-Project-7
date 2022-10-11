const db = require("../mysql_config");
const fs = require("fs");

let isAdmin = 0;
//***************************CREATING NEW POST*********************************
exports.createPost = (req, res) => {
  //getting the body of the request
  const postObject = req.body;

  //checking if the userId is the same to authorise new post, if not matching throw err
  if (+postObject.userId !== req.auth.userId) {
    res.status(401).json({ message: "Access denied" });
  } else if (!req.file) {
    db.query(
      "INSERT INTO post SET title=?, content=?, userId=?",
      [postObject.title, postObject.content, postObject.userId],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else if (results == 0) {
          return res.status(404).json({ error: "Post not created" });
        } else {
          db.query(
            "SELECT * FROM post WHERE id=?",
            results.insertId,
            (error, results) => {
              if (error) {
                res.json({ error });
              } else if (results == 0) {
                return res.status(404).json({ error: "post not found" });
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
  } else if (req.file) {
    const post = {
      ...postObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };

    //sending new post into database
    db.query(
      "INSERT INTO post SET title=?, content=?, userId=?, imageUrl=?",
      [post.title, post.content, post.userId, post.imageUrl],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else if (results == 0) {
          return res.status(404).json({ error: "Post not created" });
        } else {
          db.query(
            "SELECT * FROM post WHERE id=?",
            results.insertId,
            (error, results) => {
              if (error) {
                res.json({ error });
              } else if (results == 0) {
                return res.status(404).json({ error: "post not found" });
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
};
//********************************GETTING ALL POSTS************************************
exports.getAllPosts = (req, res, next) => {
  db.query("SELECT * FROM post", (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "Post not found" });
    } else {
      res.status(200).json({ results });
    }
  });
};

//****************************MODIFYING POST********************************
exports.modifyPost = (req, res, next) => {
  const postId = req.params.id;
  const postObject = req.body;
  //checking if the logged user has admin rights
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
  //Query to database to search for the post to be modified
  db.query("SELECT * FROM post WHERE id=?", postId, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "Post not found" });
    } else if (isAdmin !== 1 && results[0].userId !== req.auth.userId) {
      return res.status(400).json({ message: "access denied" });
    } else {
      //getting the old image name in case it needs deleting
      // const oldFilename = results[0].imageUrl.split("/images/")[1];
      if (req.file) {
        const postImage = {
          ...postObject,
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        };

        db.query(
          `UPDATE post SET title=?, content=?, imageUrl=? WHERE id=?`,
          [postImage.title, postImage.content, postImage.imageUrl, postId],
          (error, results) => {
            if (error) {
              res.json({ error });
            } else if (results == 0) {
              return res.status(404).json({ error: "Post not modified" });
            } else {
              //deleting previous image
              // fs.unlink(`images/${oldFilename}`, (err) => {
              //   message: "Image not deleted";
              // });
              db.query(
                "SELECT * FROM post WHERE id=?",
                postId,
                (error, results) => {
                  if (error) {
                    res.json({ error });
                  } else if (results == 0) {
                    return res.status(404).json({ error: "Post not found" });
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
      } else if (!req.file) {
        const postObject = req.body;
        db.query(
          `UPDATE post SET title=?, content=? WHERE id=?`,
          [postObject.title, postObject.content, postId],
          (error, results) => {
            if (error) {
              res.json({ error });
            } else if (results == 0) {
              return res.status(404).json({ error: "Post not modified" });
            } else {
              db.query(
                "SELECT * FROM post WHERE id=?",
                postId,
                (error, results) => {
                  if (error) {
                    res.json({ error });
                  } else if (results == 0) {
                    return res.status(404).json({ error: "Post not found" });
                  } else {
                    res.status(200).json({ results });
                  }
                }
              );
            }
          }
        );
      }
    }
  });
};

//****************************DELETING POST***********************************8
//delete all comment from the post
exports.deletePost = (req, res, next) => {
  const postId = req.params.id;
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
  db.query("SELECT * FROM post WHERE id=?", postId, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "Post not found" });
    } else if (isAdmin !== 1 && results[0].userId !== req.auth.userId) {
      return res.status(400).json({ message: "access denied" });
    } else {
      db.query(
        "SELECT * FROM comment WHERE postId=?",
        postId,
        (error, results) => {
          if (error) {
            res.json({ error });
          } else {
            db.query(
              "DELETE FROM comment WHERE postId=?",
              postId,
              (error, results) => {
                if (error) {
                  res.json({ error });
                }
              }
            );
          }
        }
      );
      //delete all likes from the post
      db.query(
        "SELECT * FROM liked WHERE postId=?",
        postId,
        (error, results) => {
          if (error) {
            res.json({ error });
          } else {
            db.query(
              "DELETE FROM liked WHERE postId=?",
              postId,
              (error, results) => {
                if (error) {
                  res.json({ error });
                }
              }
            );
          }
        }
      );
      //deleting image and post
      // const filename = results.imageUrl.split("/images/")[1];
      // fs.unlink(`images/${filename}`, () => {
      db.query("SELECT * FROM post WHERE id=?", postId, (error, results) => {
        if (error) {
          res.json({ error });
        } else if (results == 0) {
          return res.status(404).json({ error: "Post not found" });
        } else {
          db.query("DELETE FROM post WHERE id =?", postId, (error, results) => {
            if (error) {
              res.json({ error });
            } else if (results == 0) {
              return res.status(404).json({ error: "Post not deleted" });
            } else {
              res.status(200).json({ message: "post deleted" });
            }
          });
        }
        // });
      });
    }
  });
};
