import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pay from "./components/Pay";
import Landing from "./components/Landing";
import Success from "./components/Success";
import Privacy from "./components/Privacy";
import Register from "./components/Register";
import InternshipPage from "./components/InternshipPage";
import Yash from "./components/Yash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/applyIntern" element={<InternshipPage />} />
        <Route path="/3bhk" element={<Yash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
