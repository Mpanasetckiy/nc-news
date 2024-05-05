import { Link } from "react-router-dom";

import IconComment from "../../assets/icon-message.png";
import IconLike from "../../assets/icon-like.png";
import IconDislike from "../../assets/icon-dislike.png";

const Article = ({ article }) => {
  const {
    article_id,
    article_img_url,
    author,
    author_avatar_url,
    comment_count,
    created_at,
    title,
    topic,
    votes,
  } = article;

  const date = new Date(created_at);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return (
    <li key={article_id}>
      <div className="article__avatar">
        <img src={author_avatar_url} alt="avatar url" />
      </div>
      <div className="article__container">
        <div className="article__header">
          <h3>@{author}</h3>
          &middot;
          <p>{formattedDate}</p>
        </div>
        <Link to={`/articles/${article_id}`}>
          <h5>{title}</h5>
          <img src={article_img_url} alt="image url" className="article__img" />
        </Link>
        <div className="article__stats">
          <div>
            <img src={IconComment} alt="icon comments" />
            <p>{comment_count}</p>
          </div>
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

export default Article;
