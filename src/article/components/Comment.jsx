import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import IconLike from "../../assets/icon-like.png";
import IconDislike from "../../assets/icon-dislike.png";

import { formatDateAndTime } from "../../util/convertDate";

const Comment = ({ comment, setComments }) => {
  const { isLoading, sendRequest, error } = useHttpClient();
  const { user } = useContext(AuthContext);
  const { author, author_avatar_url, body, comment_id, created_at, votes } =
    comment;

  const deleteComment = async () => {
    try {
      await sendRequest(
        `${import.meta.env.VITE_API_URL}/comments/${comment_id}`,
        "DELETE"
      );

      if (!isLoading) {
        setComments((prev) => {
          const filteredComments = prev.filter((comment) => {
            return comment.comment_id !== comment_id;
          });
          return filteredComments;
        });
        alert("Successfully deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    deleteComment();
  };

  const formattedDate = formatDateAndTime(created_at);

  return (
    <li key={comment_id}>
      <div className="article__avatar">
        <img src={author_avatar_url} alt="avatar url" />
      </div>
      <div className="comment__container">
        <div className="comment__header">
          <h4>@{author}</h4>
          {user.username === author ? (
            <button onClick={handleClick}>X</button>
          ) : null}
        </div>
        <p>{body}</p>
        <div className="article__stats">
          <p>{formattedDate}</p>
          <div>
            <img src={IconLike} alt="icon like" />
            <p>{votes}</p>
            <img src={IconDislike} alt="icon dislike" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Comment;
