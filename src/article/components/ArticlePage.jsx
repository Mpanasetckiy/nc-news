import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import IconComment from "../../assets/icon-message.png";
import IconLike from "../../assets/icon-like.png";
import IconDislike from "../../assets/icon-dislike.png";

import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import { formatDateAndTime } from "../../util/convertDate";
import Comment from "./Comment";
import PostComment from "./PostComment";

const ArticlePage = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();
  const { user, addVotedArticles } = useContext(AuthContext);
  const { article_id } = useParams();

  let currentArticleVote;

  const fetchArticleById = async () => {
    try {
      const { article } = await sendRequest(
        `https://be-nc-news-0820.onrender.com/api/articles/${article_id}`
      );
      if (!isLoading) {
        setArticle(article);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCommentsByArticleId = async () => {
    try {
      const { comments } = await sendRequest(
        `https://be-nc-news-0820.onrender.com/api/articles/${article_id}/comments`
      );

      if (!isLoading) {
        setComments(comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const patchArticleVotes = async (vote) => {
    try {
      const { article } = await sendRequest(
        `https://be-nc-news-0820.onrender.com/api/articles/${article_id}`,
        "PATCH",
        { inc_vote: vote }
      );

      if (!isLoading) {
        setArticle((prev) => {
          return { ...prev, votes: article.votes };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticleById();
    fetchCommentsByArticleId();
  }, [article_id]);

  if (user.voted) {
    currentArticleVote = user.voted[article_id];
  }

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

  if (isLoading) {
    return (
      <section className="loader">
        <div>
          <MoonLoader />
        </div>
      </section>
    );
  }

  const formattedDate = formatDateAndTime(article.created_at);

  return (
    <section>
      <ul className="article-page">
        <div className="article-page__container">
          <div className="article-page__header">
            <img src={article.avatar_url} alt="avatar url" />
            <div>
              <h3>{article.name}</h3>
              <p>@{article.author}</p>
            </div>
          </div>
          <h2>{article.title}</h2>
          <p className="body">{article.body}</p>
          <img
            src={article.article_img_url}
            alt="image url"
            className="article__img"
          />

          <div className="article__stats">
            <p>{formattedDate}</p>
            <div>
              <img src={IconComment} alt="icon comments" />
              <p>{article.comment_count}</p>
            </div>
            <div>
              <img
                src={IconLike}
                onClick={handleLike}
                className={currentArticleVote === 1 ? "voted" : ""}
                alt="icon like"
              />
              <p>{article.votes}</p>
              <img
                src={IconDislike}
                onClick={handleDislike}
                className={currentArticleVote === -1 ? "voted" : ""}
                alt="icon dislike"
              />
            </div>
          </div>
        </div>
        <PostComment article_id={article_id} setComments={setComments} />
        {comments.length > 0 ? (
          comments.map((comment) => {
            return (
              <Comment
                key={comment.comment_id}
                comment={comment}
                setComments={setComments}
              />
            );
          })
        ) : (
          <p>No comments...</p>
        )}
      </ul>
    </section>
  );
};

export default ArticlePage;
