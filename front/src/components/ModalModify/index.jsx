import React from "react";

export default function ModalModify(props) {
  return (
    <div className="modal--background">
      <div>
        <h2>Modifier la publication</h2>
        <button onClick={() => props.closeModalModify(false)}>Annuler</button>
        <button>Confirmer</button>
      </div>
    </div>
  );
}
