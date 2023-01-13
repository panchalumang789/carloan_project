import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "components/pages/LandingPage";
import Journey from "components/pages/Journey";
import PageNotFound from "components/pages/PageNotFound";
import Dashboard from "components/pages/Dashboard";
import LoadingPage from "components/pages/journey/extra/LoadingPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<LandingPage />}></Route>
        <Route path="journey/*" element={<Journey />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="loading" element={<LoadingPage />}></Route>
      </Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);
reportWebVitals();
