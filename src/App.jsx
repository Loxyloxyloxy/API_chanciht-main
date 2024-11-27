import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Course from "./pages/Course";
import Chapter from "./pages/Chapter";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Course />} />
        <Route path="/course/:id" element={<Chapter />} />
      </Routes>
    </Router>
  );
};

export default App;
