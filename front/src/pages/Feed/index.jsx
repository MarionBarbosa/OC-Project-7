//FEED
// => Render post component
//=> Fetch all posts and all comments

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";

//import components
import Post from "../../components/Post";
import Navbar from "../../components/Nav";

export default function Feed() {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  //*************************STATES*********************************
  const [postData, setPostData] = useState([]);
  const [commentData, setCommentData] = useState([]);

  //Using context to change the isAuthenticated state if needed
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);

  //function to update the state getting all the comments after adding a new comment so it is rendered on the page.
  const updateComment = (newComment) => {
    setCommentData((prevCommentData) => [...prevCommentData, newComment]);
  };

  //******************SENDING REQUEST**********************
  //request to get all posts
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

  //Request to get all comments
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

  //checking that the user is still authenticated.
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signIn", { replace: true });
    }
  }, []);

  //*******************************************HTML*******************************************
  return (
    <>
      <Navbar />

      <div className="feed">{postElements}</div>
    </>
  );
}
