import { Routes, Route, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/auth-context";
import ErrorFallback from "../src/util/ErrorFallback";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import ArticlePage from "./article/components/ArticlePage";
import Navbar from "./components/Navbar";
import Profile from "./user/components/Profile";
import Login from "./user/components/Login";
import NoPage from "./components/NoPage";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const { isLoggedIn, user, login, logout, addVotedArticles } = useAuth();

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, addVotedArticles }}
    >
      <Header />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          navigate("/");
        }}
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </ErrorBoundary>
      <Navbar />
    </AuthContext.Provider>
  );
}

export default App;
