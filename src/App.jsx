import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import ArticlePage from "./article/components/ArticlePage";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
      <Navbar />
    </>
  );
}

export default App;
