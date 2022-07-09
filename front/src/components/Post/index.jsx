import React from "react";
import { FaRegThumbsUp, FaRegCommentAlt } from "react-icons/fa";
export default function Post() {
  const [showMenu, setShowMenu] = React.useState(false);
  function handleClick() {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  }
  const [showComments, setShowComments] = React.useState(false);
  function handleClickComments() {
    setShowComments((prevShowComments) => !prevShowComments);
  }
  const [likeCount, setLikeCount] = React.useState(0);
  function addLike() {
    setLikeCount((prevLikeCount) => prevLikeCount + 1);
  }

  return (
    <section className="post">
      <div className="post--profile">
        <div className="post--profile--details">
          <div className="post--profile--picture">pic</div>
          <div className="post--profile--name">NAME</div>
          <div>DATE</div>
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
        <div className="post--image"></div>
        <div className="post--text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className="post--interaction">
          <div className="post--interaction--button">
            <div className="post--like">
              <button onClick={addLike}>
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
