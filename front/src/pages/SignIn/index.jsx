//SIGNIN
// => page to connect to existing user account

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../Context";
import Logo from "../../assets/icon-left-font-resize.png";

export default function SignIn() {
  let navigate = useNavigate();
  //*************************STATES*********************************
  const [error, setError] = useState(null);
  const { setIsAuthenticated } = useContext(UserContext);
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

  //******************SENDING REQUEST**********************
  function handleSubmit(event) {
    event.preventDefault();
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
          return (
            res
              .json()
              //if successful, setting data in localstorage to be used throughout the application
              .then((data) => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("isAdmin", data.isAdmin);
                setIsAuthenticated(true);

                navigate("/home", { replace: true });
              })

              .catch((error) => console.error("error:", error))
          );
        } else {
          setError("Mot de passe ou utilisateur incorrect");
        }
      })
      .catch((error) => console.error("error:", error));
  }
  //*******************************************HTML*******************************************
  return (
    <div className="container">
      <div className="signUp--container">
        <section className="signIn--logo">
          <img src={Logo} alt="Logo" />
        </section>
        <section className="signIn--form">
          <h1 className="signIn--header">Connectez-vous</h1>
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
            {error && (
              <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
            )}
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
    </div>
  );
}
