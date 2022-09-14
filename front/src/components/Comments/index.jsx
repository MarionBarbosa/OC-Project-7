import React from "react";

export default function Comments(props) {
  return (
    <div className="post--comment">
      <p>NAME</p>
      <p>{props.content}</p>
      <p>{props.timestamp}</p>
    </div>
  );
}
