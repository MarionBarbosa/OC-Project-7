import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../../Context";
import Logo from "../../assets/icon-left-font.png";

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
              }
            })
            .catch((error) => console.error("error:", error));
        } else {
          setError("Mot de passe ou utilisateur incorrects");
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
        <h1>Connectez-vous</h1>
        <form>
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
        <Link to="/signUp" className="signIn--link">
          Créer un compte
        </Link>
      </section>
    </div>
  );
}
