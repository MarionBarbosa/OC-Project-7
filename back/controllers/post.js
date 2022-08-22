const Post = require("../models/post");
const db = require("../mysql_config");
const fs = require("fs");

//CREATING NEW POST
exports.createPost = (req, res, next) => {
  //getting the body of the request
  const postObject = JSON.parse(req.body.post);
  //checking if the userId is the same to authorise new post, if not matching throw err
  if (postObject.userId !== req.auth.userId) {
    res.status(401).json({ message: "Accès non autorisé" });
  } else {
    const post = new Post({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });

    //sending new post into database
    db.query(
      "INSERT INTO post SET ?",
      [post.title, post.content, post.userId, post.imageUrl],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else if (results == 0) {
          return res.status(404).json({ error: "Post non cree" });
        } else {
          res.status(201).json({ message: "post enregistre" });
        }
      }
    );
  }
};
//GETTING ALL POSTS
exports.getAllPosts = (req, res, next) => {
  db.query("SELECT * FROM post", (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "Post non trouve" });
    } else {
      res.status(200).json({ results });
    }
  });
};

//MODIFYING POST
exports.modifyPost = (req, res, next) => {
  //getting body of the request
  const postObject = req.file //case where the reauest contains a file
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
      return res.status(404).json({ error: "Post inexistant" });
    } else if (postObject.userId !== req.auth.userId) {
      return res.status(400).json({ message: "acces refuse" });
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
                return res.status(404).json({ error: "Post non modifie" });
              } else {
                //deleting previous image
                fs.unlink(`images/${oldFilename}`, (err) => {
                  message: "Image non supprimée";
                });
                res.status(200).json({ message: "post modifie" });
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
                return res.status(404).json({ error: "Post non modifie" });
              } else {
                res.status(200).json({ message: "post modifie" });
              }
            }
          );
    }
  });
};

//DELETING POST
exports.deletePost = (req, res, next) => {
  const post = req.body;
  db.query("SELECT * FROM post WHERE id=?", post.id, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "Post inexistant" });
    } else if (post.userId !== req.auth.userId) {
      return res.status(400).json({ message: "acces refuse" });
    } else {
      //deleting image
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        db.query("DELETE FROM post WHERE id =?", post.id, (error, results) => {
          if (error) {
            res.json({ error });
          } else if (results == 0) {
            return res.status(404).json({ error: "Post non supprime" });
          } else {
            res.status(200).json({ message: "post supprime " });
          }
        });
      });
    }
  });
};

// exports.createPost = (req, res, next) => {
//   const postObject = JSON.parse(req.body.post);

//   if (postObject.userId !== req.auth.userId) {
//     res.status(401).json({ message: "Accès non autorisé" });
//   } else {
//     const post = new Post({
//       ...postObject,
//       imageUrl: `${req.protocol}://${req.get("host")}/images/${
//         req.file.filename
//       }`,
//       likes: 0,
//       dislikes: 0,
//       usersLiked: [],
//       usersDisliked: [],
//     });
//     post
//       .save()
//       .then(() =>
//         res.status(201).json({ message: "Publication Enregistrée !" })
//       )
//       .catch((error) => res.status(400).json({ error }));
//   }
// };
// exports.getAllPosts = (req, res, next) => {
//   Post.find()
//     .then((posts) => res.status(200).json(posts))
//     .catch((error) => res.status(404).json({ error }));
// };
// exports.getOnePost = (req, res, next) => {
//   Post.findOne({ _id: req.params.id })
//     .then((post) => res.status(200).json(post))
//     .catch((error) => res.status(404).json({ error }));
// };
// exports.modifyPost = (req, res, next) => {
//   Post.findOne({ _id: req.params.id })
//     .then((post) => {
//       //getting the image from the post
//       const oldFilename = post.imageUrl.split("/images/")[1];
//       //returning error is there is no post found
//       if (!post) {
//         res.status(404).json({ message: "Publication non trouvée" });
//       }
//       //checking that if the userId from the post and from the request are different and if so not allowing access
//       if (post.userId !== req.auth.userId) {
//         res.status(401).json({ message: "Accès non autorisé" });
//       } else {
//         // after all the previous checks the post can be updated
//         //getting new data and/or image
//         const postObject = req.file
//           ? {
//               ...JSON.parse(req.body.post),
//               imageUrl: `${req.protocol}://${req.get("host")}/images/${
//                 req.file.filename
//               }`,
//             }
//           : { ...req.body };
//         //update post with new data and/or image

//         Post.updateOne(
//           { _id: req.params.id },
//           { ...postObject, _id: req.params.id }
//         )
//           .then(() => {
//             fs.unlink(`images/${oldFilename}`, (err) => {
//               message: "Image non supprimée";
//             });
//             res.status(200).json({ message: "Publication modifiée" });
//           })
//           .catch((error) => res.status(400).json({ error }));
//       }
//     })

//     .catch((error) => res.status(500).json({ error }));
// };
// exports.deletePost = (req, res, next) => {
//   Post.findOne({ _id: req.params.id })
//     .then((post) => {
//       if (!post) {
//         res.status(404).json({ message: "Publication non trouvée" });
//       }
//       //checking that if the userId from the post and from the request are different and if so not allowing access
//       if (post.userId !== req.auth.userId) {
//         res.status(401).json({ message: "Accès non autorisé" });
//       }
//       //deleting image
//       const filename = post.imageUrl.split("/images/")[1];
//       fs.unlink(`images/${filename}`, () => {
//         //deleting post from website and DB
//         Post.deleteOne({ _id: req.params.id })
//           .then(() =>
//             res.status(200).json({ message: "Publication supprimée" })
//           )
//           .catch((error) => res.status(400).json({ error }));
//       });
//     })
//     .catch((error) => res.status(500).json({ error }));
// };
