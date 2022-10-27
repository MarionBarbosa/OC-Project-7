//NOT FOUND
// => Rendered when url path is wrong

import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context";

export default function NotFound() {
  //Using context to change the isAuthenticated state if needed
  const { setIsAuthenticated } = useContext(UserContext);

  //function to logout
  function handleClick() {
    localStorage.clear();
    setIsAuthenticated(false);
  }
  //*******************************************HTML*******************************************
  return (
    <div className="container container--background">
      <div className="notFound--container">
        <h1>Oups! Cette page n'existe pas</h1>
        <p>Groupomania c'est par ici:</p>
        <Link
          to="/signIn"
          className="notFound--container--link"
          onClick={handleClick}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
