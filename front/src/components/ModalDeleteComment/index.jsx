import React from "react";
import { useContext } from "react";
import { UserContext } from "../../Context";

export default function ModalDeleteComment(props) {
  const token = localStorage.getItem("token");
  const { setIsAuthenticated } = useContext(UserContext);
  function handleClickDeleteComment(event) {
    event.preventDefault();
    const commentId = +event.currentTarget.id;

    const urlDeleteComment = `http://localhost:3001/api/post/comment/${commentId}`;
    fetch(urlDeleteComment, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    })
      .then(function (res) {
        if (res.ok) {
          return res
            .json()
            .then(() => {
              props.setCommentData((prevCommentData) =>
                prevCommentData.filter((comment) => comment.id !== commentId)
              );
              props.setCommentCount((prevCommentCount) => prevCommentCount - 1);
              props.closeModalDelete(false);
            })
            .catch((error) => console.error("error:", error));
        } else if (res.status === 401) {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => console.error("error:", error));
  }
  return (
    <div className="modal--background">
      <div className="modal--container">
        <h2>Confirmer la suppression</h2>

        <div className="modal--button">
          <button onClick={() => props.closeModalDelete(false)}>Annuler</button>
          <button onClick={handleClickDeleteComment} id={props.commentId}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
