import React from "react";
import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <section className="signIn">
      <h1>Inscription</h1>
      <form className="signIn__form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />
        <input type="password" placeholder="Confirmez mot de passe" />
        <button className="signIn--button">S'inscrire</button>
      </form>
      <p>Déjà un compte?</p>
      <Link to="/signIn" className="signIn--button">
        Se connecter
      </Link>
    </section>
  );
}
