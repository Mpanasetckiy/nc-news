import { useContext, useState, useEffect } from "react";

import IconAdd from "../../assets/icon-add.png";

import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

const PostComment = ({ article_id, setComments }) => {
  const [commentBody, setCommentBody] = useState("");
  const { isLoading, sendRequest, error, setError } = useHttpClient();
  const { user } = useContext(AuthContext);

  const postComment = async () => {
    try {
      const { newComment } = await sendRequest(
        `${import.meta.env.VITE_API_URL}/api/articles/${article_id}/comments`,
        "POST",
        {
          username: user.username,
          body: commentBody,
        }
      );
      if (!isLoading) {
        setComments((prev) => {
          return [
            { ...newComment, author_avatar_url: user.avatar_url },
            ...prev,
          ];
        });
        setCommentBody("");
        alert("Successfully posted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ target }) => {
    const inputVal = target.value.trim();
    setCommentBody(inputVal);
  };

  const handleClick = () => {
    if (commentBody !== "" && user.username) {
      postComment();
    } else {
      setError(new Error("Comment body is required"));
    }
  };
  return (
    user.username && (
      <>
        <div className="post-comment">
          <input
            type="text"
            name=""
            id=""
            value={commentBody}
            placeholder="  Add a comment"
            onChange={handleChange}
          />
          <img src={IconAdd} alt="icon add" onClick={handleClick} />
        </div>
        <div>
          {error ? (
            <p
              style={{
                color: "red",
              }}
            >
              Error has occurred while posting, try again
            </p>
          ) : null}
        </div>
      </>
    )
  );
};

export default PostComment;
