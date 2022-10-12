import React from "react";
import Logo from "../../assets/icon-left-font.png";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="home--container">
      <img src={Logo} alt="Logo" />
      <Link to="/signUp">S'inscrire</Link>
      <Link to="/signIn">Se connecter</Link>
    </div>
  );
}
