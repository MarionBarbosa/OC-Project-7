//MODAL WINDOW
// => opens when modify button is clicked on comment component
// => runs functions to modify comment

import { useContext, useState } from "react";
import { UserContext } from "../../Context";

export default function ModalModifyComment(props) {
  //*************************STATES*********************************
  const [formData, setFormData] = useState({ commentContent: props.content });
  const [error, setError] = useState(null);

  //Getting token from localstorage
  const token = localStorage.getItem("token");

  //Using context to change the isAuthenticated state if needed
  const { setIsAuthenticated } = useContext(UserContext);

  //function to manage error when issue with the form fields
  function handleError() {
    setError("");
  }
  //function to update formData with new values
  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  //******************SENDING REQUEST**********************
  function handleClick(event) {
    event.preventDefault();
    const commentId = event.currentTarget.id;
    const urlCommentId = `http://localhost:3001/api/post/comment/${commentId}`;
    const content = formData.commentContent;
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
  //*******************************************HTML*******************************************
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
