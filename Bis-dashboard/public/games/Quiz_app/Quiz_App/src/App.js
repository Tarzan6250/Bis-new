import React from "react";
import './App.css';  // Import the stylesheet

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizPage from "./pages/QuizPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizPage />} />
      </Routes>
    </Router>
  );
};

export default App;
