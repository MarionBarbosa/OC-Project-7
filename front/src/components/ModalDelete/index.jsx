import React from "react";

export default function ModalDelete(props) {
  function handleClickDelete(event) {
    event.preventDefault();
    console.log(event.currentTarget.id);
    const postId = event.currentTarget.id;
    const urlDeletePost = `http://localhost:3001/api/post/${postId}`;
    fetch(urlDeletePost, {
      method: "DELETE",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
  }
  return (
    <div className="modal--background">
      <div className="modal--container">
        <h2>Confirmer la suppression</h2>

        <div className="modal--button">
          <button onClick={() => props.closeModalDelete(false)}>Annuler</button>
          <button onClick={handleClickDelete} id={props.postId}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
