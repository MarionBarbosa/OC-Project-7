import React from "react";
import { FaRegThumbsUp, FaRegCommentAlt } from "react-icons/fa";
export default function Post(props) {
  const [showMenu, setShowMenu] = React.useState(false);
  function handleClick() {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  }
  const [showComments, setShowComments] = React.useState(false);
  function handleClickComments() {
    setShowComments((prevShowComments) => !prevShowComments);
  }
  const [likeCount, setLikeCount] = React.useState(0);
  // function addLike() {
  //   if (like === 1) {
  //     setLikeCount((prevLikeCount) => prevLikeCount + 1);
  //     //sending data to backend to save in database
  //     //==>userID, like=1 ou -1, postId
  //     fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json;charset=UTF-8",
  //       },
  //       body: JSON.stringify(userId, like, postId),
  //     });
  //   }
  // }

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
        <div className="post--image">{props.imageUrl}</div>
        <div className="post--text">{props.content}</div>
        <div className="post--interaction">
          <div className="post--interaction--button">
            <div className="post--like">
              <button>
                {likeCount} <FaRegThumbsUp />
              </button>
            </div>
            <div className="post--comments">
              <button onClick={handleClickComments}>
                X <FaRegCommentAlt />
              </button>
            </div>
          </div>
          {showComments ? <div>Liste des commentaires</div> : null}

          <input
            type="text"
            placeholder="Ecrivez un commentaire"
            className="post--newComments"
          />
        </div>
      </div>
    </section>
  );
}
