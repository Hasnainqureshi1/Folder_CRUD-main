import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Table from "./pages/Table";
import NotFound from "./pages/NotFound";
import LayoutWithNav from './Components/LayoutWithNav';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/" element={<LayoutWithNav />}>
          <Route path="Home" element={<Table />} />
          <Route path="Home/*" element={<Table />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
