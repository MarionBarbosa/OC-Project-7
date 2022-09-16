import React from "react";
import { useState } from "react";
//import { useState, useEffect } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

export default function NewComment() {
  const [formData, setFormData] = useState({ commentContent: "" });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  const urlComment = "http://localhost:3001/api/post/comment";

  const userId = 1;
  function handleClick(event) {
    event.preventDefault();
    const postId = 16;
    const content = formData.commentContent;
    fetch(urlComment, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ userId, postId, content }),
    });
    setFormData({ commentContent: "" });
  }

  return (
    <>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Ecrivez un commentaire"
        className="post--newComments"
        name="commentContent"
        value={formData.commentContent}
      />
      <button>
        <FaArrowCircleRight onClick={handleClick} />
      </button>
    </>
  );
}
