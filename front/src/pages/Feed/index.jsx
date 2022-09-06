import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../../components/Header";
import Post from "../../components/Post";
//import { useEffect } from "react";
export default function Feed() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  //getting all posts
  useEffect(() => {
    //setLoading(true);
    fetch("http://localhost:3001/api/post")
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((postData) => {
        console.log(postData.results);
        setData(postData.results);
      });
    // .catch(function(err) {
    //   setError(err);
    // })
    // .finally(() => {
    //   setLoading(false);
    // });
  }, []);

  // if (loading) {
  //   return <p>Data is loading...</p>;
  // }
  // if (error || !Array.isArray(data)) {
  //   return <p>There was an error loading your data!</p>;
  // }
  const postElements = data.map((post) => {
    return (
      <Post
        timestamp={post.created_at}
        title={post.title}
        content={post.content}
        imageUrl={post.imageUrl}
      />
    );
  });
  return (
    <div>
      <Header />
      {postElements}
    </div>
  );
}
