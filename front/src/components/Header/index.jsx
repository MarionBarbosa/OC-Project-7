import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/icon-left-font-monochrome-white.png";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../Context";
//import { Link } from "react-router-dom";
export default function Header() {
  const { setIsLoggedIn } = useContext(UserContext);

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
  }
  return (
    <header>
      <div className="header--logo">
        <Link to="/home">
          <img src={Logo} alt="logo" className="header--logo--image" />
        </Link>
      </div>
      <div className="header--newPost">
        <Link to="/CreatePost" className="link">
          <p>Nouvelle publication</p>
        </Link>
      </div>
      <section>
        <div>
          <FaUserCircle />
        </div>
        <Link to="/profile" className="link">
          Profile
        </Link>
        <Link to="/signIn" className="link" onClick={handleLogOut}>
          Deconnexion
        </Link>
      </section>
    </header>
  );
}
