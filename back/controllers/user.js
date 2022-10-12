const bcrypt = require("bcrypt");
const db = require("../mysql_config");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//function to check a strong password was typed.
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

exports.signup = (req, res) => {
  //checking if the password is strong, if so password goes through Bcrypt
  if (checkPasswordValidation(req.body.password) == null) {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const admin = req.body.admin;
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
                    return res.status(404).json({ error: "user not found" });
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
};

exports.login = (req, res) => {
  //finding email in database
  const email = req.body.email;
  db.query("SELECT * FROM user WHERE email=?", email, (error, results) => {
    if (error) {
      res.json({ error });
    } else if (results == 0) {
      return res.status(404).json({ error: "User not found" });
    } else {
      //comparing password to allow user connection
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
