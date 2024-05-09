import { useState, useContext } from "react";

import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";

import IconLike from "../../assets/icon-like.png";
import IconDislike from "../../assets/icon-dislike.png";

const Votes = ({ votes, article_id }) => {
  const [currentVotes, setCurrentVotes] = useState(votes);
  const { isLoading, sendRequest } = useHttpClient();
  const { user, addVotedArticles } = useContext(AuthContext);
  let currentArticleVote;

  if (user.voted) {
    currentArticleVote = user.voted[article_id];
  }

  const patchArticleVotes = async (vote) => {
    try {
      setCurrentVotes((prev) => {
        return prev + vote;
      });

      const { article } = await sendRequest(
        `https://be-nc-news-0820.onrender.com/api/articles/${article_id}`,
        "PATCH",
        { inc_vote: vote }
      );
    } catch (error) {
      setCurrentVotes((prev) => {
        return prev - vote;
      });
      console.log(error);
    }
  };

  const handleLike = () => {
    if (!currentArticleVote || currentArticleVote === 0) {
      addVotedArticles(article_id, 1);
      patchArticleVotes(1);
    } else if (currentArticleVote === -1) {
      addVotedArticles(article_id, 1);
      patchArticleVotes(2);
    } else if (currentArticleVote === 1) {
      addVotedArticles(article_id, 0);
      patchArticleVotes(-1);
    }
  };

  const handleDislike = () => {
    if (!currentArticleVote || currentArticleVote === 0) {
      addVotedArticles(article_id, -1);
      patchArticleVotes(-1);
    } else if (currentArticleVote === 1) {
      addVotedArticles(article_id, -1);
      patchArticleVotes(-2);
    } else if (currentArticleVote === -1) {
      addVotedArticles(article_id, 0);
      patchArticleVotes(1);
    }
  };

  return (
    <div>
      <img
        src={IconLike}
        onClick={handleLike}
        className={currentArticleVote === 1 ? "voted" : ""}
        alt="icon like"
      />
      <p>{currentVotes}</p>
      <img
        src={IconDislike}
        onClick={handleDislike}
        className={currentArticleVote === -1 ? "voted" : ""}
        alt="icon dislike"
      />
    </div>
  );
};

export default Votes;
