import { useState, useEffect } from "react";
import { MoonLoader } from "react-spinners";

import { useHttpClient } from "../hooks/http-hook";
import Article from "../article/components/Article";

const Homepage = () => {
  const { isLoading, sendRequest, error } = useHttpClient();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { articles } = await sendRequest(
        "https://be-nc-news-0820.onrender.com/api/articles"
      );
      if (!isLoading) {
        setArticles(articles);
      }
    } catch (error) {
      console.log(error);
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

  return (
    <section>
      <ul className="article">
        {articles.length > 0 &&
          articles.map((article) => {
            return <Article key={article.article_id} article={article} />;
          })}
      </ul>
    </section>
  );
};

export default Homepage;
