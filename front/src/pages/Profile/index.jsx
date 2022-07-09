import React from "react";
import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div>
      <h1>mon profil</h1>
      <Link to="/">Fil d'actualité</Link>
      <form>
        <input type="image" id="'image" alt="profile picture" />
        <input type="text" placeholder="Nom" />
        <input type="text" placeholder="Prénom" />
      </form>
    </div>
  );
}
