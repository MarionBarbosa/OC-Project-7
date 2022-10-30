//CREATE POST page
// => rendered when clicking on link in Navbar

import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";
import { UserContext } from "../../Context";

export default function CreatePost() {
  let navigate = useNavigate();
  const formData = new FormData();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  //*************************STATES*********************************
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const imageRef = useRef(null);

  //Using context to change the isAuthenticated state if needed
  const { setIsAuthenticated } = useContext(UserContext);

  //Sending request to API
  function handleSubmitPost(event) {
    event.preventDefault();
    //creating form to send to API
    formData.append("content", content);
    formData.append("userId", userId);
    formData.append("image", image);
    fetch("http://localhost:3001/api/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(function (res) {
        if (res.ok) {
          return res
            .json()
            .then(() => {
              //clearing all fields
              setContent("");
              imageRef.current.value = null;
              navigate("/home", { replace: true });
            })
            .catch((error) => console.error("error:", error));
        } else if (res.status === 401) {
          localStorage.clear();
          setIsAuthenticated(false);
        } else if (res.status === 400) {
          setContent("");
          setError("Ce champ ne peut être vide");
          formData.delete("content", content);
          formData.delete("userId", userId);
          formData.delete("image", image);
        }
      })
      .catch((error) => console.error("error:", error.message));
  }
  //*******************************************HTML*******************************************
  return (
    <div className="container container--background">
      <div className="createPost--container">
        <h1 className="createPost--header">Créer une publication</h1>
        <form className="createPost" encType="multipart/form-data">
          {file ? (
            <div>
              <img
                src={file}
                alt="choisie par l'utilisateur"
                className="uploaded-image"
              />
            </div>
          ) : null}
          <textarea
            className="createPost--content"
            type="text"
            placeholder="Que souhaitez-vous partager aujourd'hui?"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            maxLength={2500}
          />
          {error && (
            <p
              style={{
                color: "red",
                marginTop: 3,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
          <label for="input-file" className="upload--image">
            Ajouter une image
            <FaRegImage
              className="icon-upload-image"
              aria-label="icone téléchargement d'image"
            />
            <input
              id="input-file"
              className="input--image"
              type="file"
              name="image"
              onChange={(event) => {
                setImage(event.target.files[0]);
                setFile(URL.createObjectURL(event.target.files[0]));
              }}
              ref={imageRef}
            />
          </label>
          <div className="button--container">
            <button
              className="createPost--button"
              onClick={() => navigate("/home", { replace: true })}
            >
              Annuler
            </button>
            <button
              className="createPost--button"
              disabled={!content}
              onClick={handleSubmitPost}
            >
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
