import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import { UserContext } from "../../Context";
import Logo from "../../assets/icon-left-font.png";

export default function SignUp() {
  const { setIsLoggedIn } = useContext(UserContext);
  let navigate = useNavigate();
  const refPassword = useRef(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorInputFirst, setErrorInputFirst] = useState(null);
  const [errorInputLast, setErrorInputLast] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  //check email is valid
  function isValidEmail(value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  }
  function isValidInput(value) {
    return /^(?!\s*$).+/.test(value);
  }

  // checking password is valid
  function isValidPassword(value) {
    const isWhitespace = /^(?=.*\s)/;
    if (isWhitespace.test(value)) {
      return setErrorPassword("Le mot de passe ne peut contenir d'espaces.");
    }

    const isContainsUppercase = /^(?=.*[A-Z])/;
    if (!isContainsUppercase.test(value)) {
      return setErrorPassword(
        "Le mot de passe doit contenir au minimum 1 majuscule."
      );
    }

    const isContainsLowercase = /^(?=.*[a-z])/;
    if (!isContainsLowercase.test(value)) {
      return setErrorPassword(
        "Le mot de passe doit contenir au minimum 1 minuscule."
      );
    }

    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(value)) {
      return setErrorPassword(
        "Le mot de passe doit contenir au minimum 1 chiffre."
      );
    }

    const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    if (!isContainsSymbol.test(value)) {
      return setErrorPassword(
        "Le mot de passe doit contenir au minimum 1 symbole."
      );
    }

    const isValidLength = /^.{10,}$/;
    if (!isValidLength.test(value)) {
      return setErrorPassword(
        "Le mot de passe doit contenir un minimum de 10 caratères."
      );
    }
    setErrorPassword("");
    return null;
  }

  function handleChangeEmail(event) {
    if (!isValidEmail(event.target.value)) {
      setErrorEmail(
        `Veuillez respecter le format du courriel (example@email.com).`
      );
    } else {
      setErrorEmail(null);
    }
  }

  function checkInputFirstName(event) {
    if (!isValidInput(event.target.value)) {
      setErrorInputFirst(`Quel est votre prénom?`);
    } else {
      setErrorInputFirst(null);
    }
  }
  function checkInputLastName(event) {
    if (!isValidInput(event.target.value)) {
      setErrorInputLast(`Quel est votre nom?`);
    } else {
      setErrorInputLast(null);
    }
  }
  const [formSignUp, setFormSignUp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    admin: 0,
  });
  function handleChange(event) {
    if (document.activeElement === refPassword.current) {
      isValidPassword(event.currentTarget.value);
    }
    setFormSignUp((prevFormSignin) => {
      return {
        ...prevFormSignin,
        [event.target.name]: event.target.value,
      };
    });
  }
  function submitAccount(event) {
    event.preventDefault();

    //fetch: send data to API
    const urlSignUp = "http://localhost:3001/api/auth/signUp";

    fetch(urlSignUp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formSignUp),
    })
      .then(function (res) {
        if (res.ok) {
          return res
            .json()
            .then((data) => {
              if (!data) {
                setIsLoggedIn(false);
              } else if (data.auth) {
                setIsLoggedIn(true);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("isAdmin", data.isAdmin);
                navigate("/home", { replace: true });
              } else if (data.email) {
                console.log(data.email);
                setErrorEmail("Cet email est déjà utilisé");
              }
            })
            .catch((error) => console.error("error:", error));
        }
      })
      .catch((error) => console.error("error:", error));
  }
  return (
    <div className="signUp--container">
      <section className="signIn--logo">
        <img src={Logo} alt="Logo" />
      </section>
      <section className="signIn--form">
        <h1 className="signIn--header">Inscription</h1>
        <form>
          <input
            type="text"
            placeholder="Prénom"
            name="firstName"
            onChange={handleChange}
            onBlur={checkInputFirstName}
            required
          />
          {errorInputFirst && (
            <p
              style={{
                color: "red",
                marginTop: 3,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {errorInputFirst}
            </p>
          )}
          <input
            type="text"
            placeholder="Nom"
            name="lastName"
            onChange={handleChange}
            onBlur={checkInputLastName}
            required
          />
          {errorInputLast && (
            <p
              style={{
                color: "red",
                marginTop: 3,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {errorInputLast}
            </p>
          )}

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            onBlur={handleChangeEmail}
            required
          />
          {errorEmail && (
            <p
              style={{
                color: "red",
                marginTop: 3,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {errorEmail}
            </p>
          )}
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            ref={refPassword}
            onChange={handleChange}
            required
          />
          {errorPassword && <p style={{ color: "red" }}>{errorPassword}</p>}

          <button className="signIn--button" onClick={submitAccount}>
            S'inscrire
          </button>
        </form>
        <p>Déjà un compte?</p>
        <Link to="/signIn" className="signIn--redirect">
          Se connecter
        </Link>
      </section>
    </div>
  );
}
