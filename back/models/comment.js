/*
 *champs de text
 *limite de caracteres
 */
class Comment {
  constructor(content, userId, postId) {
    this.content = content;
    this.userId = userId;
    this.postId = postId;
  }
}
module.exports = Comment;
