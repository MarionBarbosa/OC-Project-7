import React from "react";
import { useState } from "react";

export default function Comments(props) {
  const commentUserId = props.commentUserId;
  const loggedUserId = 1;

  return (
    <div className="post--comment">
      <div>
        <div className="comment--user">
          <p>NAME</p>
          <p>{props.timestamp}</p>
        </div>
        <div className="comment--content">
          <p>{props.content}</p>
        </div>
      </div>
      {commentUserId === loggedUserId ? (
        <div className="comment--options">
          <button id={props.commentId}>Modifier</button>
          <button id={props.commentId}>Supprimer</button>
        </div>
      ) : null}
    </div>
  );
}
// function handleClickModify(event) {
//   event.preventDefault();
//   const commentId = 16;
//   const content = formData.commentContent;
//   console.log(content);
//   fetch(urlCommentId, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     body: JSON.stringify({ commentId, content }),
//   });
// }
// function handleClickDelete(event) {
//   event.preventDefault();
//   const commentId = 16;
//   console.log(content);
//   fetch(urlCommentId, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     body: JSON.stringify({ commentId }),
//   });
// }
