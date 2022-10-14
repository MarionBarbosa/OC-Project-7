import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/icon-left-font-monochrome-white.png";
import { UserContext } from "../../Context";
export default function Header() {
  const { setIsLoggedIn } = useContext(UserContext);

  function handleLogOut() {
    localStorage.clear();
    setIsLoggedIn(false);
  }
  return (
    <header>
      <div className="header--logo">
        <img src={Logo} alt="logo" className="header--logo--image" />
      </div>
      <div className="header--newPost">
        <Link to="/CreatePost" className="link">
          <p>Nouvelle publication</p>
        </Link>
      </div>
      <section>
        <Link to="/signIn" className="link" onClick={handleLogOut}>
          Deconnexion
        </Link>
      </section>
    </header>
  );
}
