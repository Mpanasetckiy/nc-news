import IconLike from "../../assets/icon-like.png";
import IconDislike from "../../assets/icon-dislike.png";

import { formatDateAndTime } from "../../util/convertDate";

const Comment = ({ comment }) => {
  const { author, author_avatar_url, body, comment_id, created_at, votes } =
    comment;

  const formattedDate = formatDateAndTime(created_at);

  return (
    <li key={comment_id}>
      <div className="article__avatar">
        <img src={author_avatar_url} alt="avatar url" />
      </div>
      <div className="comment__container">
        <h4>@{author}</h4>
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
