import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ModalDelete from "../../components/ModalDelete";
import ModalModify from "../../components/ModalModify";
import Post from "../../components/Post";
export default function Feed() {
  const [modalDelete, setModalDelete] = useState(false);
  const [modalModify, setModalModify] = useState(false);

  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState();
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
        key={post.id}
        postId={post.id}
        userId={post.userId}
        timestamp={post.created_at}
        title={post.title}
        content={post.content}
        imageUrl={post.imageUrl}
        showModalDelete={setModalDelete}
        showModalModify={setModalModify}
      />
    );
  });
  return (
    <>
      {modalModify && <ModalModify closeModalModify={setModalModify} />}
      {modalDelete && <ModalDelete closeModalDelete={setModalDelete} />}
      <Header />
      {postElements}
    </>
  );
}
