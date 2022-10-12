class User {
  constructor(firstName, lastName, email, password, admin) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.admin = admin;
  }
}
module.exports = User;
