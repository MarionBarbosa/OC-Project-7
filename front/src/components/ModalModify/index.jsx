//MODAL WINDOW
// => opens when modify button is clicked on post component
// => runs functions to modify post

import { useState, useContext } from "react";
import { FaRegImage } from "react-icons/fa";
import { UserContext } from "../../Context";
export default function ModalModify(props) {
  const token = localStorage.getItem("token");
  //*************************STATES*********************************
  const [error, setError] = useState(null);
  //state to manage new file uploaded
  const [file, setFile] = useState();
  //state to manage file originally uploaded
  const [image, setImage] = useState(props.postImage);
  //state to manage the text
  const [content, setContent] = useState(props.postContent);
  //Using context to change the isAuthenticated state if needed
  const { setIsAuthenticated } = useContext(UserContext);
  function handleError() {
    setError("");
  }
  //******************SENDING REQUEST**********************
  function handleClick(event) {
    event.preventDefault();
    const postId = event.currentTarget.id;
    //saving updated states in formData to send in the request to API
    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", image);
    //sending the modify request to API
    fetch(`http://localhost:3001/api/post/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      //if successful, update state array to update client-side
      .then(function (res) {
        if (res.ok) {
          return res
            .json()
            .then((post) => {
              props.setPostContent(post.results[0].content);
              props.setPostImage(post.results[0].imageUrl);
              props.closeModalModify(false);
            })
            .catch((error) => console.error("error:", error));
        } else if (res.status === 401) {
          setIsAuthenticated(false);
        } else if (res.status === 400) {
          setError("Champ vide");
        }
      })

      .catch((error) => console.error("error", error));
  }
  //checking what is saved in the image state to decide if it is displayed or not
  // =>if contains string with "http" then display as it is the original image.
  // =>else it is the new image to be send to API and it is not formatted to be displayed.
  let imageText = image ? image.toString().includes("http") : false;

  //*******************************************HTML*******************************************
  return (
    <div className="modal--background">
      <div className="modal--modify--container">
        <h2 className="modal--container--modify--header">
          Modifier la publication
        </h2>
        <form encType="multipart/form-data">
          <div className="modal--image--container">
            {file ? (
              <img
                name="postImageUrl"
                className="uploaded-image"
                src={file}
                alt="publication"
              />
            ) : null}

            {imageText ? (
              <img
                name="postImageUrl"
                className="uploaded-image"
                src={image}
                alt="publication"
              />
            ) : null}
          </div>
          <textarea
            onChange={(event) => setContent(event.target.value)}
            placeholder="Ajouter du texte"
            name="postContent"
            defaultValue={props.postContent}
            onClick={handleError}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label htmlFor="input-file" className="upload--image">
            Ajouter une image
            <FaRegImage className="icon-upload-image" />
            <input
              id="input-file"
              className="input--image"
              type="file"
              name="image"
              onChange={(event) => {
                setImage(event.target.files[0]);
                setFile(URL.createObjectURL(event.target.files[0]));
              }}
            />
          </label>

          <div className="button--container">
            <button
              onClick={() => {
                props.closeModalModify(false);
                window.location.reload();
              }}
              className="modal--button"
            >
              Annuler
            </button>
            <button
              onClick={handleClick}
              id={props.postId}
              className="modal--button"
            >
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
