import React from "react";
import { useState } from "react";
export default function ModalModify(props) {
  const token = localStorage.getItem("token");
  const [error, setError] = useState(null);
  const [image, setImage] = useState(props.postImage);
  const [content, setContent] = useState(props.postContent);
  function handleError() {
    setError("");
  }
  function handleClick(event) {
    event.preventDefault();
    const postId = event.currentTarget.id;
    const formData = new FormData();
    console.log(content);
    formData.append("content", content);
    formData.append("image", image);
    //sending the form to backend
    fetch(`http://localhost:3001/api/post/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(function (res) {
        if (res.ok) {
          console.log(res);
          return res
            .json()
            .then((post) => {
              console.log(post);
              props.setPostContent(post.results[0].content);
              props.setPostImage(post.results[0].imageUrl);
              props.closeModalModify(false);
            })
            .catch((error) => console.error("error:", error));
        } else {
          setError("Champ vide");
        }
      })

      .catch((error) => console.error("error", error));
  }

  return (
    <div className="modal--background">
      <div className="modal--container--modify">
        <h2>Modifier la publication</h2>
        <form encType="multipart/form-data">
          <div className="post--image--container">
            <img
              name="postImageUrl"
              className="post--image"
              src={image}
              alt="publication"
            />
          </div>
          <input
            type="file"
            name="image"
            onChange={(event) => setImage(event.target.files[0])}
          />
          <input
            type="text"
            className="post--text"
            onChange={(event) => setContent(event.target.value)}
            placeholder="Ajouter du texte"
            name="postContent"
            defaultValue={props.postContent}
            onClick={handleError}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={() => props.closeModalModify(false)}>Annuler</button>
          <button onClick={handleClick} id={props.postId}>
            Confirmer
          </button>
        </form>
      </div>
    </div>
  );
}
