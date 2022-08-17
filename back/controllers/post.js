const Post = require("../models/post");
const db = require("../mysql_config");
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  //sending new post to database
  //checking userId is the same to authorise new post
  if (postObject.userId != req.auth.userId) {
    res.status(401).json({ message: "Accès non autorisé" });
  } else {
    const post = new Post({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
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

exports.getAllPosts = (req, res, next) => {
  db.query("SELECT * FROM post", (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "Post non trouve" });
    } else {
      console.log(results);
      res.status(200).json({ results });
    }
  });
};
exports.modifyPost = (req, res, next) => {
  const newTitle = req.body.title;
  const newContent = req.body.content;
  const postId = req.body.id;

  const post = new Post(newTitle, newContent);
  db.query("SELECT * FROM post WHERE id=?", postId, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "Post inexistant" });
    } else {
      db.query(
        `UPDATE post SET ? WHERE id=?`,
        [post, postId],
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
exports.deletePost = (req, res, next) => {
  const postId = req.body.id;
  db.query("SELECT * FROM post WHERE id=?", postId, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "Post inexistant" });
    } else {
      db.query("DELETE FROM post WHERE id =?", postId, (error, results) => {
        if (error) {
          res.json({ error });
        } else if (results == 0) {
          return res.status(404).json({ error: "Post non supprime" });
        } else {
          res.status(200).json({ message: "post supprime " });
        }
      });
    }
  });
};
// const fs = require("fs");

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
