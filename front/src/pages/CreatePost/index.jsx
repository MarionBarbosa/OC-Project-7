import React from "react";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";
import { UserContext } from "../../Context";
export default function CreatePost() {
  //getting all input data
  let navigate = useNavigate();
  const formData = new FormData();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const imageRef = useRef(null);
  const { setIsAuthenticated } = useContext(UserContext);
  function handleSubmitPost(event) {
    event.preventDefault();

    formData.append("content", content);
    formData.append("userId", userId);
    formData.append("image", image);
    //sending the form to backend
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
          setIsAuthenticated(false);
        }
      })
      .catch((error) => console.error("error:", error.message));
  }

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
          />
          <label for="input-file" className="upload--image">
            Ajouter une image
            <FaRegImage className="icon-upload-image" />
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
