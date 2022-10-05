import React from "react";
import { useState, useRef } from "react";
export default function CreatePost() {
  //getting all input data
  const formData = new FormData();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const imageRef = useRef(null);
  function handleSubmitPost(event) {
    event.preventDefault();
    formData.append("title", title);
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
    }).then(function (res) {
      if (res.ok) {
        //clearing all fields
        setContent("");
        setTitle("");
        imageRef.current.value = null;
      }
    });
  }
  return (
    <div>
      <form encType="multipart/form-data">
        <input
          type="text"
          placeholder="Insérez un titre"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="file"
          name="image"
          onChange={(event) => setImage(event.target.files[0])}
          ref={imageRef}
        />
        <input
          type="text"
          placeholder="Ecrivez votre texte"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button onClick={handleSubmitPost}>Publier</button>
      </form>
    </div>
  );
}
