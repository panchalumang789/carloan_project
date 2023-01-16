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
import Login from "components/navbar/Login";
import Verify from "components/navbar/VerifyOTP";
import LoadingPage from "components/pages/journey/extra/LoadingPage";
import Protected from "components/Protected";
import Loan from "components/pages/Loan";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<LandingPage />}></Route>
        <Route path="journey/*" element={<Journey />}></Route>
        <Route
          path="dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        ></Route>
        <Route
          path="loan/:loanId"
          element={
            <Protected>
              <Loan />
            </Protected>
          }
        ></Route>
        <Route path="loading" element={<LoadingPage />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="verify" element={<Verify />}></Route>
      </Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);
reportWebVitals();
