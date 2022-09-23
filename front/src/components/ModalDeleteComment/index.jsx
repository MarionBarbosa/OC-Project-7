import React from "react";

export default function ModalDeleteComment(props) {
  function handleClickDeleteComment(event) {
    event.preventDefault();
    const commentId = event.currentTarget.id;
    const urlDeleteComment = `http://localhost:3001/api/post/comment/${commentId}`;
    fetch(urlDeleteComment, {
      method: "DELETE",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    })
      .then(function(res) {
        if (!res.ok) {
          return alert({ message: "not working" });
        }
      })
      .then(() => {
        const updateCommentData = props.commentData.filter(
          (comment) => comment.id !== commentId
        );
        props.setCommentData(updateCommentData);
        props.closeModalDelete(false);
      });
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
