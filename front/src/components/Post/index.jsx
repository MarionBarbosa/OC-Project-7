import React from "react";
import { useState, useEffect } from "react";
import { FaRegThumbsUp, FaRegCommentAlt } from "react-icons/fa";
import Comments from "../Comments/index";
import NewComment from "../NewComment";
import ModalDelete from "../../components/ModalDelete";
import ModalModify from "../../components/ModalModify";
export default function Post(props) {
  const postUserId = props.userId;
  const loggedUserId = 1;
  function handleClick() {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  }
  const [modalDelete, setModalDelete] = useState(false);
  const [modalModify, setModalModify] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [commentCount, setCommentCount] = useState();

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
  //rendering each comments in post
  const commentElements = commentPerPost.map((comment) => {
    return (
      <Comments
        key={comment.id}
        commentId={comment.id}
        commentUserId={comment.userId}
        timestamp={comment.created_at}
        content={comment.content}
        postId={props.postId}
        setCommentCount={setCommentCount}
        commentCount={commentCount}
        commentData={props.commentData}
        setCommentData={props.setCommentData}
      />
    );
  });

  //*******************LIKES**************************
  //get like counts from API for each post
  const [likeCount, setLikeCount] = useState();
  const [likeData, setLikeData] = useState([]);
  const [likeClicked, setLikeClicked] = useState();
  useEffect(() => {
    fetch(`http://localhost:3001/api/post/like/${props.postId}`)
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((getLikeData) => {
        if (!getLikeData) {
          return setLikeCount(0);
        } else {
          setLikeData(getLikeData.results);
          setLikeCount(getLikeData.results.length);
        }
      });
  }, [likeClicked]);
  //State to determine like or dislike
  const [likes, setLikes] = useState(false);
  //changing icon's color depending on like or dislike
  const styleLikes = {
    backgroundColor: likes ? "pink" : "transparent",
  };
  const urlLike = "http://localhost:3001/api/post/like";
  function addLike(event) {
    setLikes((prevLikes) => !prevLikes);
    const postId = event.currentTarget.id;
    const userId = 2;
    if (!likes) {
      //case of liking a post
      const like = 1;

      fetch(urlLike, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ userId, postId, like }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(() => {
          setLikeClicked(1);
        });
    } else {
      //case of taking OFF the like
      const like = -1;

      fetch(urlLike, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ userId, postId, like }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(() => {
          setLikeClicked(0);
        });
    }
  }
  //function to open the modal windows on delete and modify on the Posts
  function modalDeletePost() {
    setModalDelete(true);
    setShowMenu(false);
  }
  function modalModifyPost() {
    setModalModify(true);
    setShowMenu(false);
  }
  return (
    <section className="post">
      <div className="post--profile">
        <div className="post--profile--details">
          <div className="post--profile--picture">pic</div>
          <div className="post--profile--name">NAME</div>
          <div>{props.timestamp}</div>
        </div>
        {postUserId === loggedUserId ? (
          <div className="post--collapsibleMenu">
            <button onClick={handleClick}>+</button>
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
        <div className="post--title">{props.title}</div>
        <div className="post--image--container">
          <img
            className="post--image"
            src={`${props.imageUrl}`}
            alt="publication"
          />
        </div>

        <div className="post--text">{props.content}</div>
        <div className="post--interaction">
          <div className="post--interaction--button">
            <div className="post--like">
              <button onClick={addLike} id={props.postId}>
                {likeCount} <FaRegThumbsUp style={styleLikes} />
              </button>
            </div>
            <div className="post--showComments">
              <button onClick={handleClickComments} id={props.postId}>
                {commentCount} <FaRegCommentAlt />
              </button>
            </div>
          </div>

          {showComments ? <div>{commentElements}</div> : null}

          <NewComment
            postId={props.postId}
            userId={props.userId}
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
            />
          )}
          {modalDelete && (
            <ModalDelete
              closeModalDelete={setModalDelete}
              postId={props.postId}
            />
          )}
        </div>
      </div>
    </section>
  );
}
