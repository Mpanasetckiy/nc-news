import { useState, useEffect } from "react";

import { fetchArticles } from "../api";

import Article from "../article/components/Article";

const Homepage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(({ articles }) => {
      setArticles(articles);
    });
  }, []);

  console.log(articles);

  return (
    <section>
      <ul className="article">
        {articles.map((article) => {
          return <Article key={article.id} article={article} />;
        })}
      </ul>
    </section>
  );
};

export default Homepage;
