import React, { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../Context";
export default function ModalModifyComment(props) {
  //filling the input with the saved comment to be modified
  const [formData, setFormData] = useState({ commentContent: props.content });
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const { setIsAuthenticated } = useContext(UserContext);
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
  //when clicking on button confirmation
  function handleClick(event) {
    event.preventDefault();
    const commentId = event.currentTarget.id;
    const urlCommentId = `http://localhost:3001/api/post/comment/${commentId}`;
    const content = formData.commentContent;
    //sending modified comment to database
    fetch(urlCommentId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    })
      .then(function (res) {
        if (res.ok) {
          return (
            res
              .json()
              //changing state for comment content with new content
              .then(() => props.newContent(content))
              //closing the modal
              .then(() => props.closeModalModify(false))
              .catch((error) => console.error("error:", error))
          );
        } else if (res.status === 401) {
          setIsAuthenticated(false);
        } else if (res.status === 400) {
          setError("champ vide");
        }
      })
      .catch((error) => console.error("error:", error));
  }
  return (
    <div className="modal--background">
      <div className="modal--container--modify">
        <h2>Modifier le commentaire</h2>
        <textarea
          type="text"
          onChange={handleChange}
          onClick={handleError}
          placeholder="Ecrivez un commentaire"
          className="modal--modify--replaceComments"
          name="commentContent"
          value={formData.commentContent}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="modal--button">
          <button onClick={() => props.closeModalModify(false)}>Annuler</button>
          <button onClick={handleClick} id={props.commentId}>
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
