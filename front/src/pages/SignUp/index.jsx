import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import { UserContext } from "../../Context";

export default function SignUp() {
  const { setIsLoggedIn } = useContext(UserContext);
  let navigate = useNavigate();
  const passwordRef = useRef();
  const emailRef = useRef();
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const [errorEmail, setErrorEmail] = useState(null);
  //const [errorPassword, setErrorPassword] = useState(null);
  //check email is valid
  function isValidEmail(value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  }

  //checking password is valid
  // function isValidPassword(event) {
  //   const isWhitespace = /^(?=.*\s)/;
  //   if (isWhitespace.test(event.target.value)) {
  //     return setErrorPassword("Le mot de passe ne peut contenir d'espaces.");
  //   }

  //   const isContainsUppercase = /^(?=.*[A-Z])/;
  //   if (!isContainsUppercase.test(event.target.value)) {
  //     return setErrorPassword(
  //       "Le mot de passe doit contenir au minimum 1 majuscule."
  //     );
  //   }

  //   const isContainsLowercase = /^(?=.*[a-z])/;
  //   if (!isContainsLowercase.test(event.target.value)) {
  //     return setErrorPassword(
  //       "Le mot de passe doit contenir au minimum 1 minuscule."
  //     );
  //   }

  //   const isContainsNumber = /^(?=.*[0-9])/;
  //   if (!isContainsNumber.test(event.target.value)) {
  //     return setErrorPassword(
  //       "Le mot de passe doit contenir au minimum 1 chiffre."
  //     );
  //   }

  //   const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
  //   if (!isContainsSymbol.test(event.target.value)) {
  //     return setErrorPassword(
  //       "Le mot de passe doit contenir au minimum 1 symbole."
  //     );
  //   }

  //   const isValidLength = /^.{10,}$/;
  //   if (!isValidLength.test(event.target.value)) {
  //     return setErrorPassword(
  //       "Le mot de passe doit contenir un minimum de 10 caratères."
  //     );
  //   }
  //   return null;
  // }

  function handleChangeEmail(event) {
    if (!isValidEmail(event.target.value)) {
      setErrorEmail(
        `Veuillez respecter le format du courriel (example@email.com).`
      );
    } else {
      setErrorEmail(null);
    }
  }

  function submitAccount(event) {
    event.preventDefault();
    const newEmail = emailRef.current.value;
    const newPassword = passwordRef.current.value;
    const newLastName = lastNameRef.current.value;
    const newFirstName = firstNameRef.current.value;
    //fetch: send data to API
    const urlSignUp = "http://localhost:3001/api/auth/signUp";
    const signUpData = {
      email: newEmail,
      password: newPassword,
      lastName: newLastName,
      firstName: newFirstName,
      admin: 0,
    };
    fetch(urlSignUp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (!data) {
          setIsLoggedIn(false);
        } else if (data.auth) {
          setIsLoggedIn(true);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("isAdmin", data.isAdmin);
          navigate("/", { replace: true });
        }
      });
  }
  return (
    <section className="signIn">
      <h1>Inscription</h1>
      <form className="signIn__form">
        <input type="text" placeholder="Prénom" ref={firstNameRef} />
        <input type="text" placeholder="Nom" ref={lastNameRef} />

        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          onBlur={handleChangeEmail}
        />
        {errorEmail && <p style={{ color: "red" }}>{errorEmail}</p>}
        <input
          type="password"
          placeholder="Mot de passe"
          ref={passwordRef}
          // onChange={isValidPassword}
        />
        {/* {errorPassword && <p style={{ color: "red" }}>{errorPassword}</p>} */}
        {/* <input type="password" placeholder="Confirmez mot de passe" /> */}
        <button className="signIn--button" onClick={submitAccount}>
          S'inscrire
        </button>
      </form>
      <p>Déjà un compte?</p>
      <Link to="/signIn" className="signIn--button">
        Se connecter
      </Link>
    </section>
  );
}
