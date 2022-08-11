/*
 *creation d'un compte avec
 * => adresse email
 * => mot de passe
 */
class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}
module.exports = User;
