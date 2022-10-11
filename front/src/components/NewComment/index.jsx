import React from "react";
import { useState } from "react";
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

  const userId = +localStorage.getItem("userId");
  function handleClick(event) {
    event.preventDefault();
    const postId = props.postId;
    const content = formData.commentContent;
    const token = localStorage.getItem("token");
    fetch(urlComment, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, postId, content }),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((comment) => {
        props.updateComment(comment.results[0]);
        props.setCommentCount((prevCommentCount) => prevCommentCount + 1);
        setFormData({ commentContent: "" });
      });
  }

  return (
    <div className="newComment">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Ecrivez un commentaire"
        className="post--newComments"
        name="commentContent"
        value={formData.commentContent}
      />
      <button>
        <FaArrowCircleRight
          className="newComment--button--icon"
          onClick={handleClick}
          id={props.postId}
        />
      </button>
    </div>
  );
}
