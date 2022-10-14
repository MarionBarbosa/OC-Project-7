import React from "react";
import { useState, useEffect } from "react";
import { FaRegCommentAlt, FaUserCircle } from "react-icons/fa";

import Comments from "../Comments/index";
import NewComment from "../NewComment";
import ModalDelete from "../../components/ModalDelete";
import ModalModify from "../../components/ModalModify";
import Likes from "../Likes";

export default function Post(props) {
  const postUserId = props.postUserId;
  const isAdmin = +localStorage.getItem("isAdmin");
  const loggedUserId = +localStorage.getItem("userId");

  function handleClick() {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  }

  const [modalDelete, setModalDelete] = useState(false);
  const [modalModify, setModalModify] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const styleMenu = {
    backgroundColor: showMenu ? "#ffd7d7" : "transparent",
  };
  //*******************COMMENT***************************
  //Clicking on the comment icon shows the comments or hides them
  const [showComments, setShowComments] = useState(false);

  function handleClickComments() {
    setShowComments((prevShowComments) => !prevShowComments);
  }
  //getting array of comments for one postId
  const commentPerPost = props.commentData.filter(
    (comment) => comment.postId === props.postId
  );
  const commentLength = commentPerPost.length;
  console.log(commentLength);
  const [commentCount, setCommentCount] = useState(0);
  // if (commentLength > 0) {
  //   setCommentCount(commentLength);
  // }
  useEffect(() => {
    setCommentCount(commentLength);
  }, [commentLength]);
  //rendering each comments in post
  const commentElements = commentPerPost.map((comment) => {
    return (
      <Comments
        key={comment.created_at}
        commentId={comment.id}
        commentUserId={comment.userId}
        timestamp={comment.created_at}
        content={comment.content}
        postId={props.postId}
        setCommentCount={setCommentCount}
        commentCount={commentCount}
        commentData={props.commentData}
        setCommentData={props.setCommentData}
        deleteComment={props.deleteComment}
      />
    );
  });

  //function to open the modal windows on delete and modify on the Posts
  function modalDeletePost() {
    setModalDelete(true);
    setShowMenu(false);
  }
  function modalModifyPost() {
    setModalModify(true);
    setShowMenu(false);
  }

  const [postContent, setPostContent] = useState(props.content);
  const [postImage, setPostImage] = useState(props.imageUrl);
  return (
    <section className="post">
      <div className="post--profile">
        <div className="post--profile--container">
          <div className="post--profile--details">
            <div className="post--profile--picture">
              <FaUserCircle />
            </div>
            <div className="post--profile--name">NAME</div>
          </div>
          <div>{props.timestamp}</div>
        </div>
        {isAdmin === 1 || postUserId === loggedUserId ? (
          <div className="post--collapsibleMenu">
            <button onClick={handleClick} style={styleMenu}>
              +
            </button>
            {showMenu ? (
              <div className="post--collapsibleMenu--option">
                <button id={props.postId} onClick={modalModifyPost}>
                  Modifier
                </button>
                <button id={props.postId} onClick={modalDeletePost}>
                  Supprimer
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div>
        {postImage ? (
          <div className="post--image--container">
            <img
              className="post--image"
              src={`${postImage}`}
              alt="publication"
              style={{ maxWidth: 700, maxHeight: 500, objectFit: "cover" }}
            />
          </div>
        ) : null}

        <div className="post--text">{postContent}</div>
        <div className="post--interaction">
          <div className="post--interaction--icon">
            <Likes postId={props.postId} />
            <div
              className="post--showComments"
              onClick={handleClickComments}
              id={props.postId}
            >
              {commentCount} <FaRegCommentAlt className="comment-icon" />
            </div>
          </div>

          {showComments ? <div>{commentElements}</div> : null}

          <NewComment
            postId={props.postId}
            setCommentCount={setCommentCount}
            commentCount={commentCount}
            setCommentData={props.setCommentData}
            commentData={props.commentData}
            updateComment={props.updateComment}
          />
          {modalModify && (
            <ModalModify
              closeModalModify={setModalModify}
              postId={props.postId}
              postContent={postContent}
              setPostContent={setPostContent}
              postImage={postImage}
              setPostImage={setPostImage}
            />
          )}
          {modalDelete && (
            <ModalDelete
              closeModalDelete={setModalDelete}
              postId={props.postId}
              postData={props.postData}
              setPostData={props.setPostData}
            />
          )}
        </div>
      </div>
    </section>
  );
}
