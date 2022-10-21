import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Likes(props) {
  //*******************LIKES**************************
  //get like counts from API for each post
  const [likeCount, setLikeCount] = useState(0);
  const [likeData, setLikeData] = useState([]);
  const [likes, setLikes] = useState(false);
  const token = localStorage.getItem("token");
  const userId = +localStorage.getItem("userId");

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
            })
            .catch((error) => console.error("error:", error));
        }
      })
      .catch((error) => console.error("error:", error));
  }, []);
  useEffect(() => {
    const likePerUser = likeData.filter((like) => userId === like.userId);

    if (likePerUser.length > 0) {
      setLikes(true);
    } else {
      setLikes(false);
    }
  }, [likeData, userId]);

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
    <div tabIndex="0" className="post--like">
      {likeCount}
      {likes ? (
        <FaThumbsUp
          id={props.postId}
          onClick={addLike}
          className="full-thumb"
          style={styleLikesFull}
        />
      ) : (
        <FaRegThumbsUp
          id={props.postId}
          onClick={addLike}
          className="empty-thumb"
          style={styleLikesEmpty}
        />
      )}
    </div>
  );
}
