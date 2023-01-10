import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "components/pages/LandingPage";
import Journey from "components/pages/Journey";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<LandingPage />}></Route>
        <Route path="journey/*" element={<Journey />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);
reportWebVitals();
