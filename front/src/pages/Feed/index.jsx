import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

import Post from "../../components/Post";

export default function Feed() {
  const [postData, setPostData] = useState([]);
  const [commentData, setCommentData] = useState([]);

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState();
  //function to update the state getting all the comments after adding a new comment so it is rendered on the page.
  const updateComment = (newComment) => {
    setCommentData((prevCommentData) => [...prevCommentData, newComment]);
  };

  const token = localStorage.getItem("token");
  //getting all posts
  useEffect(() => {
    //setLoading(true);
    fetch("http://localhost:3001/api/post", {
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
      .then((data) => {
        console.log(data);
        setPostData(data.results);
      });
    // .catch(function(err) {
    //   setError(err);
    // })
    // .finally(() => {
    //   setLoading(false);
    // });
  }, []);

  // if (loading) {
  //   return <p>Data is= loading...</p>;
  // }
  // if (error || !Array.isArray(data)) {
  //   return <p>There was an error loading your data!</p>;
  // }
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
        firstName={post.firstName}
        lastName={post.lastName}
      />
    );
  });

  //getting all comments for all posts
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
          return res.json();
        }
      })
      .then((getCommentData) => {
        setCommentData(getCommentData.results);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="feed">{postElements}</div>
    </>
  );
}
