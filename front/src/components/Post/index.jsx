// POST
// => component rendered for each post saved in database, displayed in the Feed page.
// => Rendering of Comment  and Like components

import { useState, useEffect } from "react";
import { FaRegCommentAlt, FaUserCircle } from "react-icons/fa";

//import all components
import Comments from "../Comments/index";
import NewComment from "../NewComment";
import ModalDelete from "../../components/ModalDelete";
import ModalModify from "../../components/ModalModify";
import Likes from "../Likes";

export default function Post(props) {
  const postUserId = props.postUserId;
  const token = localStorage.getItem("token");
  const isAdmin = +localStorage.getItem("isAdmin");
  const loggedUserId = +localStorage.getItem("userId");
  const date = new Date(props.timestamp);
  const dateStr = date.toLocaleString();
  //function to show or hide menu to delete or modify
  function handleClick() {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  }
  //*************************STATES*********************************
  const [modalDelete, setModalDelete] = useState(false);
  const [modalModify, setModalModify] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [postContent, setPostContent] = useState(props.content);
  const [postImage, setPostImage] = useState(props.imageUrl);
  const styleMenu = {
    backgroundColor: showMenu ? "#ffd7d7" : "transparent",
  };
  //Sending request to API to get user's firstName and lastName
  const urlUser = `http://localhost:3001/api/auth/${postUserId}`;
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
  //******************************************COMMENT******************************************
  //Clicking on the comment icon shows the comments or hides them
  const [showComments, setShowComments] = useState(false);
  function handleClickComments() {
    setShowComments((prevShowComments) => !prevShowComments);
  }
  //Filtering comments array to get new array containing comments per post
  const commentPerPost = props.commentData.filter(
    (comment) => comment.postId === props.postId
  );
  //Managing comment count
  const commentLength = commentPerPost.length;
  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    setCommentCount(commentLength);
  }, [commentLength]);
  //rendering each comments in post component
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

  ////******************************************MODAL WINDOW******************************************
  //function to open the modal windows on delete and modify on the Posts
  function modalDeletePost() {
    setModalDelete(true);
    setShowMenu(false);
  }
  function modalModifyPost() {
    setModalModify(true);
    setShowMenu(false);
  }
  //*******************************************HTML*******************************************
  return (
    <article className="post">
      <div className="post--profile">
        <div className="post--profile--container">
          <div className="post--profile--details">
            <div className="post--profile--picture">
              <FaUserCircle className="post--profile--userIcon" />
            </div>
            <div className="post--profile--name">
              <p>
                {firstName} {lastName}
              </p>
            </div>
          </div>
          <div className="post--date">
            <p>publié le {dateStr}</p>
          </div>
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
              {commentCount}
              <FaRegCommentAlt className="comment-icon" tabIndex="0" />
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
    </article>
  );
}
