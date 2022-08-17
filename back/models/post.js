/*
 *photo utilisateur ==> JOIN from table user
 *nom utilisateur==> JOIN from table user
 *date de publication
 *Titre du post/ optionnel
 *text du post
 *image du post/ opionnel
 *like==> JOIN from table liked
 *commentaire ==> JOIN from table comment
 */
class Post {
  constructor(title, content, userId, imageUrl) {
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.imageUrl = imageUrl;
  }
}
module.exports = Post;
