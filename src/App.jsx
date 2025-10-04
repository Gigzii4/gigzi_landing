import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pay from "./components/Pay";
import Landing from "./components/Landing";
import Success from "./components/Success";
import Privacy from "./components/Privacy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
