import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo-black.png";
import SearchBar from "../SearchBar";
//import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <Link to="/home">
        <img src={Logo} alt="logo" className="header--logo" />
      </Link>
      <SearchBar />
      <section>
        <div>pic</div>
        <Link to="/profile">Profile</Link>
        <Link to="/signIn">Deconnexion</Link>
      </section>
    </header>
  );
}
