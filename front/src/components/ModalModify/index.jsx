import React from "react";
import { useState } from "react";
export default function ModalModify(props) {
  const token = localStorage.getItem("token");

  const [image, setImage] = useState(props.postImageUrl);
  const [title, setTitle] = useState(props.postTitle);
  const [content, setContent] = useState(props.postContent);
  function handleClick(event) {
    event.preventDefault();
    const postId = event.currentTarget.id;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    //sending the form to backend
    fetch(`http://localhost:3001/api/post/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then(function (res) {
      if (res.ok) {
        //clearing all fields
        setContent("");
        setTitle("");
        props.closeModalModify(false);
      }
    });
  }

  return (
    <div className="modal--background">
      <div>
        <h2>Modifier la publication</h2>
        <form encType="multipart/form-data">
          <input
            type="text"
            className="post--title"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ajouter un titre"
            name="postTitle"
            defaultValue={props.postTitle}
          />
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
          />
          <button onClick={() => props.closeModalModify(false)}>Annuler</button>
          <button onClick={handleClick} id={props.postId}>
            Confirmer
          </button>
        </form>
      </div>
    </div>
  );
}
