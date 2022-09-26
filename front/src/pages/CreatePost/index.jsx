import React from "react";
import { useState } from "react";
export default function createPost() {
  //function to upload images
  function handleFileChange(e) {}
  //getting all input data
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  function handleSubmitPost(event) {
    event.preventDefault();
    console.log(title, content, imageUrl);
    const form = {
      title: title,
      content: content,
      userId: 7,
      imageUrl: imageUrl,
    };
    fetch("http://localhost:3001/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ form }),
    }).then(function(res) {
      if (res.ok) {
        return res.json();
      }
    });
    setContent("");
    setTitle("");
  }
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="file"
          onChange={(event) => setImageUrl(event.target.value.trim())}
        />
        <input
          type="text"
          placeholder="Text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button onClick={handleSubmitPost}>Publier</button>
      </form>
    </div>
  );
}
//create function to POST form
