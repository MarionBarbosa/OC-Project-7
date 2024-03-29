const bcrypt = require("bcrypt");
const db = require("../mysql_config");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//check is form fields are empty or contain whitespace
function inputValidation(value) {
  const isEmpty = /^(?!\s*$).+/;
  if (!isEmpty.test(value)) {
    return "champ vide";
  } else {
    return null;
  }
}

//function to check a strong password was entered.
function checkPasswordValidation(value) {
  const isWhitespace = /^(?=.*\s)/;
  if (isWhitespace.test(value)) {
    return "Le mot de passe ne peut contenir d'espaces.";
  }

  const isContainsUppercase = /^(?=.*[A-Z])/;
  if (!isContainsUppercase.test(value)) {
    return "Le mot de passe doit contenir au minimum 1 majuscule.";
  }

  const isContainsLowercase = /^(?=.*[a-z])/;
  if (!isContainsLowercase.test(value)) {
    return "Le mot de passe doit contenir au minimum 1 minuscule.";
  }

  const isContainsNumber = /^(?=.*[0-9])/;
  if (!isContainsNumber.test(value)) {
    return "Le mot de passe doit contenir au minimum 1 chiffre.";
  }

  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
  if (!isContainsSymbol.test(value)) {
    return "Le mot de passe doit contenir au minimum 1 symbole.";
  }

  const isValidLength = /^.{10,}$/;
  if (!isValidLength.test(value)) {
    return "Le mot de passe doit contenir un minimum de 10 caratères.";
  }
  return null;
}
//****************************CREATING USER ACCOUNT - SIGNUP***********************************
// 1- Check input are not empty
// 2- Check password is strong
// 3- Check if email already in database
// 3- If no,
//      a. bcrypt to encrypt password
//      b. Save user is database
//      c. Return new user data and token to front
// 4- if yes, return info to front
//**
exports.signup = (req, res) => {
  const { email, password, firstName, lastName, admin } = req.body;

  db.query("SELECT * FROM user WHERE email=?", email, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      if (
        inputValidation(req.body.firstName) == null &&
        inputValidation(req.body.lastName) == null
      ) {
        if (checkPasswordValidation(req.body.password) == null) {
          bcrypt
            .hash(password, 10)
            .then((hash) => {
              const user = new User(firstName, lastName, email, hash, admin);
              db.query(
                `INSERT INTO user SET firstName=?, lastName=?, email=?, password=?, admin=?`,
                [
                  user.firstName,
                  user.lastName,
                  user.email,
                  user.password,
                  user.admin,
                ],
                (error, results) => {
                  if (error) {
                    res.json({ error });
                  } else {
                    db.query(
                      "SELECT * FROM user WHERE id=?",
                      results.insertId,
                      (error, results) => {
                        if (error) {
                          res.json({ error });
                        } else if (results == 0) {
                          return res
                            .status(404)
                            .json({ error: "user not found" });
                        } else {
                          res.status(200).json({
                            auth: true,
                            userId: results[0].id,
                            token: jwt.sign(
                              { userId: results[0].id },
                              process.env.KEY_TOKEN,
                              {
                                expiresIn: "1h",
                              }
                            ),
                            isAdmin: results[0].admin,
                          });
                        }
                      }
                    );
                  }
                }
              );
            })
            .catch((error) => res.status(500).json({ error }));
        } else {
          return res.status(401).json({
            message:
              "Le mot de passe doit contenir minimum 10 caratères, dont 1 majuscule, 1 chiffre, 1 symbole et sans espaces",
          });
        }
      } else {
        res.status(400).json({ message: "champ vide" });
      }
      //if email already in database return
    } else if (results[0].email === req.body.email) {
      return res.status(200).json({ email: results[0].email });
    }
  });
};
//****************************LOGIN INTO USER ACCOUNT - SIGNIN***********************************

// 3- Check if email already in database
// 3- If yes,
//      a. bcrypt to compare password
//      b. Save user is database
//      c. Return user data and token to front
//**
exports.login = (req, res) => {
  const email = req.body.email;
  db.query("SELECT * FROM user WHERE email=?", email, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const password = results[0].password;
      bcrypt
        .compare(req.body.password, password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ error: "Wrong password" });
          } else {
            //issuing a token to allow access throughout website

            res.status(200).json({
              auth: true,
              userId: results[0].id,
              token: jwt.sign(
                { userId: results[0].id },
                process.env.KEY_TOKEN,
                {
                  expiresIn: "1h",
                }
              ),
              isAdmin: results[0].admin,
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    }
  });
};
//****************************FIND ONE USER***********************************
exports.getOneUser = (req, res) => {
  const userId = req.params.userId;
  db.query(
    "SELECT firstName, lastName FROM user WHERE id=?",
    userId,
    (error, results) => {
      if (error) {
        res.json({ error });
      } else if (results == 0) {
        return res.status(404).json({ error: "User not found" });
      } else {
        return res.status(200).json({ results });
      }
    }
  );
};
