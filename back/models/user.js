/*
 *creation d'un compte avec
 * => adresse email
 * => mot de passe
 */
class User {
  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
module.exports = User;
