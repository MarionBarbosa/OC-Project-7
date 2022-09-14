import React from "react";
import { useState, useEffect } from "react";
import { FaRegThumbsUp, FaRegCommentAlt } from "react-icons/fa";
import Comments from "../Comments/index";
import NewComment from "../NewComment";
export default function Post(props) {
  function handleClick() {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  }
  const [showMenu, setShowMenu] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [commentCount, setCommentCount] = useState();
  //*******************COMMENT***************************
  //Clicking on the comment icon shows the comments or hides them
  const [showComments, setShowComments] = useState(false);

  function handleClickComments(event) {
    setShowComments((prevShowComments) => !prevShowComments);
  }

  //fetch all comments for each post
  useEffect(() => {
    console.log(props.postId);
    fetch(`http://localhost:3001/api/post/comment/${props.postId}`)
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((getCommentData) => {
        if (!getCommentData) {
          return setCommentCount(0);
        } else {
          console.log(getCommentData.results);
          setCommentData(getCommentData.results);
          setCommentCount(getCommentData.results.length);
        }
      });
  }, []);
  const commentElements = commentData.map((comment) => {
    return (
      <Comments
        key={comment.id}
        commentId={comment.id}
        timestamp={comment.created_at}
        content={comment.content}
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
          console.log(getLikeData.results);
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

  return (
    <section className="post">
      <div className="post--profile">
        <div className="post--profile--details">
          <div className="post--profile--picture">pic</div>
          <div className="post--profile--name">NAME</div>
          <div>{props.timestamp}</div>
        </div>
        <div className="post--collapsibleMenu">
          <button onClick={handleClick}>+</button>
          {showMenu ? (
            <div className="post--collapsibleMenu--option">
              <p>Modifier la publication</p>
              <p>Supprimer la publication</p>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <div className="post--title">{props.title}</div>
        <div className="post--image--container">
          <img className="post--image" src={`${props.imageUrl}`} />
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

          <NewComment />
        </div>
      </div>
    </section>
  );
}
