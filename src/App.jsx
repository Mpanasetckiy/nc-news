import { Routes, Route } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/auth-context";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import ArticlePage from "./article/components/ArticlePage";
import Navbar from "./components/Navbar";
import Profile from "./user/components/Profile";
import Login from "./user/components/Login";

import "./App.css";

function App() {
  const { isLoggedIn, user, login, logout } = useAuth();
  console.log(localStorage);
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Navbar />
    </AuthContext.Provider>
  );
}

export default App;
