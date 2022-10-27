//NAVBAR
// => contains creaPost link and logout

import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context";
import Logo from "../../assets/icon-left-font-monochrome-white.png";

export default function Navbar() {
  //Using context to change the isAuthenticated state if needed
  const { setIsAuthenticated } = useContext(UserContext);

  function handleLogOut() {
    localStorage.clear();
    setIsAuthenticated(false);
  }
  //*******************************************HTML*******************************************
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
