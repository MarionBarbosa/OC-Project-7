import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context";
export default function NotFound() {
  const { setIsAuthenticated } = useContext(UserContext);
  function handleClick() {
    localStorage.clear();
    setIsAuthenticated(false);
  }
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
