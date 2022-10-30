// NEW COMMENT
// => components rendered in post, used to add a new comment to post
// => If successful update the comment array and comment count

import { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

export default function NewComment(props) {
  //*************************STATES*********************************
  const [formData, setFormData] = useState({ commentContent: "" });
  const [error, setError] = useState(null);
  const userId = +localStorage.getItem("userId");
  function handleError() {
    setError("");
  }
  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  //Sending request to API
  function handleClick(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const postId = props.postId;
    const content = formData.commentContent;
    const urlComment = "http://localhost:3001/api/post/comment";
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
          return res
            .json()
            .then((comment) => {
              props.updateComment(comment.results[0]);
              props.setCommentCount((prevCommentCount) => prevCommentCount + 1);
              setFormData({ commentContent: "" });
            })
            .catch((error) => console.error("error:", error));
        } else {
          setError("Champ vide");
        }
      })
      .catch((error) => console.error("error", error));
  }
  //*******************************************HTML*******************************************
  return (
    <div className="newComment">
      <textarea
        type="text"
        onChange={handleChange}
        onClick={handleError}
        placeholder="Ecrivez un commentaire"
        className="post--newComments"
        name="commentContent"
        value={formData.commentContent}
        maxLength={2500}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <FaArrowCircleRight
          className="newComment--button--icon"
          onClick={handleClick}
          id={props.postId}
        />
      </div>
    </div>
  );
}
