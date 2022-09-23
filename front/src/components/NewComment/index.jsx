import React from "react";
import { useState } from "react";
//import { useState, useEffect } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

export default function NewComment(props) {
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

  const userId = props.userId;
  function handleClick(event) {
    event.preventDefault();
    const postId = props.postId;
    const content = formData.commentContent;
    fetch(urlComment, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ userId, postId, content }),
    })
      .then(function(res) {
        if (res.ok) {
          return res.json();
        } else {
          return console.log("not working");
        }
      })
      .then((comment) => {
        props.updateComment(comment.results[0]);
        //setFormData({ commentContent: "" });
      });
  }

  //fetch("http://localhost:3001/api/post/comment");
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
        <FaArrowCircleRight onClick={handleClick} id={props.postId} />
      </button>
    </>
  );
}
