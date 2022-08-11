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
  // if (checkPasswordValidation(req.body.password) == null) {
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User(email, hash);
      db.query(`INSERT INTO user SET ?`, user, (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.json({ message: "utilisateur enregistre" });
        }
      });
    })
    .catch((error) => res.status(500).json({ error }));
  //}
  //else {
  //   return res.status(401).json({
  //     message:
  //       "Le mot de passe doit contenir minimum 10 caratères, dont 1 majuscule, 1 chiffre, 1 symbole et sans espaces",
  //   });
  // }
};

// exports.login = (req, res, next) => {
//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       if (!user) {
//         return res.status(401).json({ message: "Utilisateur inexistant" });
//       }
//       bcrypt
//         .compare(req.body.password, user.password)
//         .then((valid) => {
//           if (!valid) {
//             return res.status(401).json({ message: "Mot de passe incorrect" });
//           }
//           res.status(200).json({
//             userId: user._id,
//             token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
//               expiresIn: "1h",
//             }),
//           });
//         })
//         .catch((error) => res.status(500).json({ error }));
//     })

//     .catch((error) => res.status(500).json({ error }));
// };
