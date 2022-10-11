import React from "react";

export default function ModalDelete(props) {
  function handleClickDelete(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const postId = +event.currentTarget.id;

    fetch(`http://localhost:3001/api/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        props.setPostData((prevPostData) =>
          prevPostData.filter((post) => post.id !== postId)
        );
        props.closeModalDelete(false);
      })
      .catch((error) => console.error("error:", error));
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
