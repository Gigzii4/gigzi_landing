import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pay from "./components/Pay";
import Landing from "./components/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
