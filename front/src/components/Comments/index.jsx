//COMMENTS
// => comment components to display user comment saved in database for each post
// => contains button to open modal window to delete and modify.

import { useEffect } from "react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import ModalDeleteComment from "../ModalDeleteComment";
import ModalModifyComment from "../ModalModifyComment";
export default function Comments(props) {
  const commentUserId = props.commentUserId;
  const loggedUserId = +localStorage.getItem("userId");
  const isAdmin = +localStorage.getItem("isAdmin");
  const token = localStorage.getItem("token");
  //*************************STATES*********************************
  const [commentContent, setCommentContent] = useState(props.content);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //states and functions to open and close modal windows
  const [modalDelete, setModalDelete] = useState(false);
  const [modalModify, setModalModify] = useState(false);
  function modalDeleteComment() {
    setModalDelete(true);
  }
  function modalModifyComment() {
    setModalModify(true);
  }
  //Formatting the ISO date
  const date = new Date(props.timestamp);
  const dateStr = date.toLocaleString();
  //Sending request to API to get user's firstName and lastName
  const urlUser = `http://localhost:3001/api/auth/${props.commentUserId}`;
  useEffect(() => {
    fetch(urlUser, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    })
      .then(function (res) {
        if (res.ok) {
          return res
            .json()
            .then((data) => {
              setFirstName(data.results[0].firstName);
              setLastName(data.results[0].lastName);
            })
            .catch((error) => console.error("error:", error));
        }
      })
      .catch((error) => console.error("error:", error));
  }, []);
  //*******************************************HTML*******************************************
  return (
    <div className="post--comment">
      <div className="comment--container">
        <div className="comment--user">
          <div className="post--profile--details">
            <div className="post--profile--picture">
              <FaUserCircle className="post--profile--userIcon" />
            </div>
            <div className="comment--user--name">
              <p>
                {firstName} {lastName}
              </p>
            </div>
          </div>
          <div className="comment--date">
            <p>{dateStr}</p>
          </div>
        </div>
        <div className="comment--content">
          <p>{commentContent}</p>
        </div>
      </div>
      {isAdmin === 1 || commentUserId === loggedUserId ? (
        <div className="comment--options">
          <button id={props.commentId} onClick={modalModifyComment}>
            Modifier
          </button>
          <button id={props.commentId} onClick={modalDeleteComment}>
            Supprimer
          </button>
        </div>
      ) : null}
      {modalModify && (
        <ModalModifyComment
          closeModalModify={setModalModify}
          commentId={props.commentId}
          userId={props.commentUserId}
          postId={props.postId}
          content={props.content}
          newContent={setCommentContent}
        />
      )}
      {modalDelete && (
        <ModalDeleteComment
          closeModalDelete={setModalDelete}
          commentId={props.commentId}
          userId={props.commentUserId}
          commentCount={props.commentCount}
          setCommentCount={props.setCommentCount}
          commentData={props.commentData}
          setCommentData={props.setCommentData}
        />
      )}
    </div>
  );
}
