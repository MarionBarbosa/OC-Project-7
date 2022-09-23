const Post = require("../models/post");
const db = require("../mysql_config");
const fs = require("fs");

//CREATING NEW POST
exports.createPost = (req, res, next) => {
  //getting the body of the request

  const postObject = JSON.parse(req.body.post);
  console.log(postObject);
  //checking if the userId is the same to authorise new post, if not matching throw err
  // if (postObject.userId !== req.auth.userId) {
  //   res.status(401).json({ message: "Access denied" });
  // } else {
  const post = {
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  };
  console.log(post);
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
  //}
};
//GETTING ALL POSTS
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

//MODIFYING POST
exports.modifyPost = (req, res, next) => {
  //getting body of the request
  const postObject = req.file //case where the request contains a file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : //case where it does NOT contain a file
      { ...JSON.parse(req.body.post) };
  //Query to database to search for the post to be modified
  db.query("SELECT * FROM post WHERE id=?", postObject.id, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "Post not found" });
    } else if (postObject.userId !== req.auth.userId) {
      return res.status(400).json({ message: "access denied" });
    } else {
      //getting he old image name in case it needs deleting
      const oldFilename = results[0].imageUrl.split("/images/")[1];
      req.file //case where the request contains a file
        ? db.query(
            `UPDATE post SET title=?, content=?, imageUrl=? WHERE id=?`,
            [
              postObject.title,
              postObject.content,
              postObject.imageUrl,
              postObject.id,
            ],
            (error, results) => {
              if (error) {
                res.json({ error });
              } else if (results == 0) {
                return res.status(404).json({ error: "Post not modified" });
              } else {
                //deleting previous image
                fs.unlink(`images/${oldFilename}`, (err) => {
                  message: "Image not deleted";
                });
                res.status(200).json({ message: "post modified" });
              }
            }
          )
        : //case where there is no file to be modified
          db.query(
            `UPDATE post SET title=?, content=? WHERE id=?`,
            [postObject.title, postObject.content, postObject.id],
            (error, results) => {
              if (error) {
                res.json({ error });
              } else if (results == 0) {
                return res.status(404).json({ error: "Post not modified" });
              } else {
                res.status(200).json({ message: "post modified" });
              }
            }
          );
    }
  });
};

//DELETING POST
exports.deletePost = (req, res, next) => {
  const postId = req.params.id;
  console.log(postId);
  db.query("SELECT * FROM post WHERE id=?", postId, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    //else if (post.userId !== req.auth.userId) {
    //   return res.status(400).json({ message: "access denied" });
    // }
    else {
      //deleting image
      // const filename = post.imageUrl.split("/images/")[1];
      // fs.unlink(`images/${filename}`, () => {
      db.query("DELETE FROM post WHERE id =?", postId, (error, results) => {
        if (error) {
          res.json({ error });
        } else if (results == 0) {
          return res.status(404).json({ error: "Post not deleted" });
        } else {
          res.status(200).json({ message: "post deleted " });
        }
      });
      //});
    }
  });
};
