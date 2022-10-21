import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/icon-left-font-monochrome-white.png";
import { UserContext } from "../../Context";
export default function Header() {
  const { setIsAuthenticated } = useContext(UserContext);
  function handleLogOut() {
    localStorage.clear();
    setIsAuthenticated(false);
  }
  return (
    <nav>
      <div className="nav--logo">
        <img src={Logo} alt="logo" className="nav--logo--image" />
      </div>
      <ul className="nav--newPost">
        <li>
          <Link to="/CreatePost" className="link">
            <p>Nouvelle publication</p>
          </Link>
        </li>
        <li>
          <Link to="/signIn" className="link" onClick={handleLogOut}>
            Deconnexion
          </Link>
        </li>
      </ul>
    </nav>
  );
}
