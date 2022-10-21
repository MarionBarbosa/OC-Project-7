import React from "react";
import { useContext } from "react";
import { UserContext } from "../../Context";

export default function ModalDelete(props) {
  const { setIsAuthenticated } = useContext(UserContext);
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
          return res
            .json()
            .then(() => {
              props.setPostData((prevPostData) =>
                prevPostData.filter((post) => post.id !== postId)
              );
              props.closeModalDelete(false);
            })
            .catch((error) => console.error("error:", error));
        } else if (res.status === 401) {
          setIsAuthenticated(false);
        } else {
          alert("Un problème est survenu, veuillez essayer à nouveau");
        }
      })

      .catch((error) => console.error("error:", error));
  }
  return (
    <div className="modal--background">
      <div className="modal--container">
        <h2 className="modal--header">Confirmer la suppression</h2>

        <div className="button--container">
          <button
            onClick={() => {
              props.closeModalDelete(false);
              window.location.reload();
            }}
          >
            Annuler
          </button>
          <button onClick={handleClickDelete} id={props.postId}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
