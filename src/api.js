export const fetchArticles = () => {
  return fetch(`https://be-nc-news-0820.onrender.com/api/articles`).then(
    (res) => {
      return res.json();
    }
  );
};
