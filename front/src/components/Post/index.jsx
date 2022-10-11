import React from "react";
import { useState, useEffect } from "react";
import { FaRegThumbsUp, FaRegCommentAlt, FaUserCircle } from "react-icons/fa";
import Comments from "../Comments/index";
import NewComment from "../NewComment";
import ModalDelete from "../../components/ModalDelete";
import ModalModify from "../../components/ModalModify";

export default function Post(props) {
  const token = localStorage.getItem("token");
  const postUserId = props.postUserId;
  const isAdmin = +localStorage.getItem("isAdmin");
  const loggedUserId = +localStorage.getItem("userId");

  function handleClick() {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  }
  const [modalDelete, setModalDelete] = useState(false);
  const [modalModify, setModalModify] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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
  const [commentCount, setCommentCount] = useState(() => commentPerPost.length);

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

  //*******************LIKES**************************
  //get like counts from API for each post
  const [likeCount, setLikeCount] = useState();
  const [likeData, setLikeData] = useState([]);
  //const [likeClicked, setLikeClicked] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/api/post/like/${props.postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    })
      .then(function (res) {
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
  }, []);
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
    const userId = +localStorage.getItem("userId");
    if (!likes) {
      //case of liking a post
      const like = 1;

      fetch(urlLike, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, postId, like }),
      }).then((res) => {
        if (res.ok) {
          return res.json().then(() => {
            setLikeCount((prevLikeCount) => {
              return prevLikeCount + 1;
            });
          });
        }
      });
    } else {
      //case of taking OFF the like
      const like = -1;

      fetch(urlLike, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, postId, like }),
      }).then((res) => {
        if (res.ok) {
          return res.json().then(() => {
            setLikeCount((prevLikeCount) => {
              return prevLikeCount - 1;
            });
          });
        }
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

  const [postTitle, setPostTitle] = useState(props.title);
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
        <div className="post--title">{postTitle}</div>
        <div className="post--image--container">
          <img className="post--image" src={`${postImage}`} alt="publication" />
        </div>

        <div className="post--text">{postContent}</div>
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
              postTitle={postTitle}
              setPostTitle={setPostTitle}
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
