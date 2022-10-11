import React from "react";
import { useState } from "react";

import ModalDeleteComment from "../ModalDeleteComment";
import ModalModifyComment from "../ModalModifyComment";
export default function Comments(props) {
  const commentUserId = props.commentUserId;
  const loggedUserId = +localStorage.getItem("userId");
  const isAdmin = +localStorage.getItem("isAdmin");
  const [modalDelete, setModalDelete] = useState(false);
  const [modalModify, setModalModify] = useState(false);
  const [commentContent, setCommentContent] = useState(props.content);
  function modalDeleteComment() {
    setModalDelete(true);
  }
  function modalModifyComment() {
    setModalModify(true);
  }
  return (
    <div className="post--comment">
      <div>
        <div className="comment--user">
          <p className="comment--user--name">NAME</p>
          <p>{props.timestamp}</p>
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
