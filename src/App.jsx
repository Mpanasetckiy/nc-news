import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Navbar />
    </>
  );
}

export default App;
