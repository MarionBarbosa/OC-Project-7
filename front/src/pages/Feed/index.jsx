import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Nav";
import { UserContext } from "../../Context";
import Post from "../../components/Post";
import { useNavigate } from "react-router-dom";
export default function Feed() {
  let navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  //function to update the state getting all the comments after adding a new comment so it is rendered on the page.
  const updateComment = (newComment) => {
    setCommentData((prevCommentData) => [...prevCommentData, newComment]);
  };

  const token = localStorage.getItem("token");
  //getting all posts
  useEffect(() => {
    fetch("http://localhost:3001/api/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    }).then(function (res) {
      if (res.ok) {
        return res.json().then((data) => {
          setPostData(
            data.results.sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
          );
        });
      }
    });
  }, []);

  // //getting all comments for all posts
  useEffect(() => {
    fetch("http://localhost:3001/api/post/comment", {
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
            .then((getCommentData) => {
              setCommentData(getCommentData.results);
            })
            .catch((error) => console.error("error:", error));
        } else if (res.status === 401) {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => console.error("error:", error));
  }, []);
  //rendering all post in the feed page
  const postElements = postData.map((post) => {
    return (
      <Post
        key={post.created_at}
        postId={post.id}
        postUserId={post.userId}
        timestamp={post.created_at}
        title={post.title}
        content={post.content}
        imageUrl={post.imageUrl}
        setCommentData={setCommentData}
        commentData={commentData}
        updateComment={updateComment}
        postData={postData}
        setPostData={setPostData}
      />
    );
  });
  useEffect(() => {
    console.log("useEffect feed");
    if (!isAuthenticated) {
      navigate("/signIn", { replace: true });
    }
  }, []);
  return (
    <>
      <Navbar />

      <div className="feed">{postElements}</div>
    </>
  );
}
