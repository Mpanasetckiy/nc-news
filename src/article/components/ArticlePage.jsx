import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import IconComment from "../../assets/icon-message.png";
import IconLike from "../../assets/icon-like.png";
import IconDislike from "../../assets/icon-dislike.png";

import { useHttpClient } from "../../hooks/http-hook";
import { formatDateAndTime } from "../../util/convertDate";
import Comment from "./Comment";

const ArticlePage = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();
  const { article_id } = useParams();

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

  useEffect(() => {
    fetchArticleById();
    fetchCommentsByArticleId();
  }, [article_id]);

  if (isLoading) {
    return (
      <section>
        <div className="loader">
          <MoonLoader />
        </div>
      </section>
    );
  }

  const formattedDate = formatDateAndTime(article.created_at);

  return (
    <section>
      <ul className="article-page">
        <li key={article.article_id}>
          <div className="article__avatar">
            <img src={article.avatar_url} alt="avatar url" />
          </div>
          <div className="article__container">
            <div className="article-page__header">
              <h3>{article.name}</h3>

              <p>@{article.author}</p>
            </div>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
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
                <img src={IconLike} alt="icon like" />
                <p>{article.votes}</p>
                <img src={IconDislike} alt="icon dislike" />
              </div>
            </div>
          </div>
        </li>
        {comments.length > 0 ? (
          comments.map((comment) => {
            return <Comment key={comment.comment_id} comment={comment} />;
          })
        ) : (
          <p>No comments...</p>
        )}
      </ul>
    </section>
  );
};

export default ArticlePage;
