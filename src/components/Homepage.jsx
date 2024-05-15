import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useHttpClient } from "../hooks/http-hook";
import Article from "../article/components/Article";

import IconArrowDown from "../assets/icon-arrow-down.png";
import IconArrowDownActive from "../assets/icon-arrow-down-active.png";
import IconArrowUp from "../assets/icon-arrow-up.png";
import IconArrowUpActive from "../assets/icon-arrow-up-active.png";

const Homepage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, sendRequest, error } = useHttpClient();
  const [articles, setArticles] = useState([]);
  const [sortingOptions, setSortingOptions] = useState({
    sort_by: "created_at",
    order: "desc",
  });

  useEffect(() => {
    setSearchParams(sortingOptions);
    fetchArticles();
  }, [sortingOptions]);

  const fetchArticles = async () => {
    try {
      const { articles } = await sendRequest(
        `${import.meta.env.VITE_API_URL}/articles?sort_by=${
          sortingOptions.sort_by
        }&order=${sortingOptions.order}`
      );
      if (!isLoading) {
        setArticles(articles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const selectVal = e.target.value;
    setSortingOptions((prev) => {
      return { ...prev, sort_by: selectVal };
    });
  };

  const handleClick = (e) => {
    const order = e.target.id;
    if (order !== sortingOptions.order) {
      setSortingOptions((prev) => {
        return { ...prev, order: order };
      });
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
      <div className="sorting">
        <select value={sortingOptions.sort_by} onChange={handleChange}>
          <option value="created_at"> Sort by: Date</option>
          <option value="comment_count"> Sort by: Comment Count</option>
          <option value="votes"> Sort by: Votes</option>
        </select>
        <div>
          <img
            src={
              sortingOptions.order === "desc" ? IconArrowUpActive : IconArrowUp
            }
            alt="sort ascending icon"
            onClick={handleClick}
            id="desc"
          />
          <img
            src={
              sortingOptions.order === "asc"
                ? IconArrowDownActive
                : IconArrowDown
            }
            alt="sort descending icon"
            onClick={handleClick}
            id="asc"
          />
        </div>
      </div>
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
