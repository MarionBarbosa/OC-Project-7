import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Likes(props) {
  //*******************LIKES**************************
  //get like counts from API for each post
  const [likeCount, setLikeCount] = useState(0);
  const [likeData, setLikeData] = useState([]);
  const [likes, setLikes] = useState(false);
  const token = localStorage.getItem("token");

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
          return res
            .json()
            .then((getLikeData) => {
              setLikeData(getLikeData.results);
              setLikeCount(getLikeData.results.length);
              console.log(likeCount);
            })
            .catch((error) => console.error("error:", error));
        }
      })
      .catch((error) => console.error("error:", error));
  }, []);
  //State to determine like or dislike
  //changing icon's color depending on like or dislike
  const styleLikesFull = {
    color: likes ? "#FD2D01" : "transparent",
  };
  const styleLikesEmpty = {
    color: likes ? "transparent" : "black",
  };

  const urlLike = "http://localhost:3001/api/post/like";
  function addLike(event) {
    setLikes((prevLikes) => !prevLikes);
    const postId = event.currentTarget.id;
    console.log("postID", postId);
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
      })
        .then((res) => {
          if (res.ok) {
            return res
              .json()
              .then(() => {
                setLikeCount((prevLikeCount) => {
                  return prevLikeCount + 1;
                });
              })
              .catch((error) => console.error("error:", error));
          }
        })
        .catch((error) => console.error("error:", error));
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
  return (
    <div className="post--like">
      {likeCount}
      <FaRegThumbsUp className="empty-thumb" style={styleLikesEmpty} />
      <FaThumbsUp
        onClick={addLike}
        id={props.postId}
        className="full-thumb"
        style={styleLikesFull}
      />
    </div>
  );
}