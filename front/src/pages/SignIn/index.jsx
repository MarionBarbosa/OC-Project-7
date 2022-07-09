import React from "react";
import { Link } from "react-router-dom";
export default function SignIn() {
  return (
    <section className="signIn">
      <h1>Connectez-vous</h1>
      <form className="signIn__form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />
        <button className="signIn--button">Se connecter</button>
      </form>
      <p>Pas encore de compte?</p>
      <Link to="/signUp" className="signIn--button">
        Créer un compte
      </Link>
    </section>
  );
}
