import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div>
      <h1>Oops! Cette page n'existe pas</h1>
      <p>Suivez le lien pour retrouver votre chemin!</p>
      <Link to="/">Feed</Link>
    </div>
  );
}
