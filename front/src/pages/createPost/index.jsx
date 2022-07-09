import React from "react";

export default function NewPost() {
  return (
    <div>
      <form>
        <input type="text" placeholder="Title" />
        <input type="image" alt="post image" />
        <input type="text" placeholder="Text" />
        <button>Publier</button>
      </form>
    </div>
  );
}
