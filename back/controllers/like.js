const Post = require("../models/post");

exports.like = (req, res, next) => {
  let userId = req.body.userId;
  //find post to update
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      // case 1: user likes post like=1
      // => get userId from request and push it in usersLiked array and pull it from usersDisliked array
      if (
        req.body.like == 1 &&
        !post.usersLiked.includes(userId) &&
        !post.usersDisliked.includes(userId)
      ) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: req.body.like },
            $addToSet: { usersLiked: req.body.userId },
          }
        )
          .then((post) => res.status(201).json(post))
          .catch((error) => res.status(400).json({ error }));
      }
      //case 2: user dislikes post like = -1
      // => get userId from request and push it in usersDisliked array and pull it from usersLiked array
      else if (
        req.body.like == -1 &&
        !post.usersDisliked.includes(userId) &&
        !post.usersLiked.includes(userId)
      ) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: req.body.like },
            $addToSet: { usersDisliked: req.body.userId },
          }
        )

          .then((post) => res.status(201).json(post))
          .catch((error) => res.status(400).json({ error }));
      }
      // case 3: user takes off his like or dislike => like=0 + delete from all arrays
      //case 3a: user takes off his like
      else if (req.body.like == 0 && post.usersLiked.includes(userId)) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
          }
        )
          .then((post) => res.status(201).json(post))
          .catch((error) => res.status(400).json({ error }));
      }
      //case 3b: user takes off his dislike
      else if (req.body.like == 0 && post.usersDisliked.includes(userId)) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $pull: { usersDisliked: req.body.userId },
          }
        )
          .then((post) => res.status(201).json(post))
          .catch((error) => res.status(400).json({ error }));
      } else {
        return res
          .status(400)
          .json({ message: "Publication déjà likée ou dislikée" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
