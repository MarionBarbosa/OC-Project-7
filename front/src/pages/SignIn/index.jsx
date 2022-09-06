import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
export default function SignIn() {
  const passwordRef = useRef();
  const emailRef = useRef();
  let navigate = useNavigate();
  const [errorEmail, setErrorEmail] = useState(null);
  const [loginData, setLoginData] = useState();
  function handleSubmit(event) {
    event.preventDefault();
    const savedEmail = emailRef.current.value;
    const savedPassword = passwordRef.current.value;
    const savedData = {
      email: savedEmail,
      password: savedPassword,
    };
    // **********TO DO ***********=>check if form is correctly filled and not empty before sending to DB
    const urlSignIn = "http://localhost:3001/api/auth/login";
    fetch(urlSignIn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(savedData),
    })
      .then(function(res) {
        if (res.ok) {
          return res.json();
          // navigate("/", { replace: true });
        } else {
          //ce n'est pas forcment a cause du mot de passe
          setErrorEmail("Mot de passe errone");
        }
      })
      .then((data) => {
        setLoginData(data);
        console.log(loginData);
      })
      //redirect to feed page
      .then(() => {
        navigate("/", { replace: true });
      });
  }
  return (
    <section className="signIn">
      <h1>Connectez-vous</h1>
      <form className="signIn__form">
        <input type="email" placeholder="Email" ref={emailRef} />

        <input type="password" placeholder="Mot de passe" ref={passwordRef} />
        {errorEmail && <p style={{ color: "red" }}>{errorEmail}</p>}
        <button className="signIn--button" onClick={handleSubmit}>
          Se connecter
        </button>
      </form>
      <p>Pas encore de compte?</p>
      <Link to="/signUp" className="signIn--button">
        Créer un compte
      </Link>
    </section>
  );
}
