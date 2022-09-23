import React from "react";
import { useState } from "react";
export default function ModalModifyComment(props) {
  //filling the input with the saved comment to be modified
  const [formData, setFormData] = useState({ commentContent: props.content });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  //when clicking on button confirmation
  function handleClick(event) {
    event.preventDefault();
    const userId = props.userId;
    const commentId = event.currentTarget.id;
    const urlCommentId = `http://localhost:3001/api/post/comment/${commentId}`;
    const content = formData.commentContent;
    //sending modified comment to database
    fetch(urlCommentId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ userId, content }),
    })
      //changing state for comment content with new content
      .then(() => props.newContent(content))
      //closing the modal
      .then(() => props.closeModalModify(false));
  }
  return (
    <div className="modal--background">
      <div>
        <h2>Modifier le commentaire</h2>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Ecrivez un commentaire"
          className="post--newComments"
          name="commentContent"
          value={formData.commentContent}
        />
        <button onClick={() => props.closeModalModify(false)}>Annuler</button>
        <button onClick={handleClick} id={props.commentId}>
          Confirmer
        </button>
      </div>
    </div>
  );
}
