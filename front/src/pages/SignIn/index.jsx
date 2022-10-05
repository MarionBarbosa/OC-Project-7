import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../../Context";

export default function SignIn() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setIsLoggedIn } = useContext(UserContext);
  const [formSignin, setFormSignin] = useState({ email: "", password: "" });

  function handleChange(event) {
    setFormSignin((prevFormSignin) => {
      return {
        ...prevFormSignin,
        [event.target.name]: event.target.value,
      };
    });
  }
  function handleClick() {
    setError("");
  }
  function handleSubmit(event) {
    event.preventDefault();
    // **********TO DO ***********=>check if form is correctly filled and not empty before sending to DB
    const urlSignIn = "http://localhost:3001/api/auth/login";
    fetch(urlSignIn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(formSignin),
    })
      .then(function (res) {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          setError("Mot de passe ou utilisateur incorrects");
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
      <h1>Connectez-vous</h1>
      <form className="signIn__form">
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          onClick={handleClick}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          name="password"
          onClick={handleClick}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
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
