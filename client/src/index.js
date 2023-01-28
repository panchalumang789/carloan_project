import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "components/pages/LandingPage";
import Journey from "components/pages/Journey";
import PageNotFound from "components/pages/PageNotFound";
import Dashboard from "components/pages/dashboard/Dashboard";
import Login from "components/navbar/Login";
import Verify from "components/navbar/VerifyOTP";
import Protected from "components/Protected";
// import Loan from "components/pages/dashboard/Loan";
import LoanList from "components/pages/dashboard/LoanList/index";
import Loan from "components/pages/dashboard/LoanDetail/index";
import AdminLogin from "components/pages/AdminLogin/index";
import UserList from "components/pages/dashboard/UserList";
import UserLoan from "components/pages/dashboard/UserLoan";

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
        >
          <Route path="" element={<LoanList />}></Route>
          <Route path="user" element={<UserList />}></Route>
          <Route path="user/loans/:id" element={<UserLoan />}></Route>
          <Route path="loan/:loanId" element={<Loan />}></Route>
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="verify" element={<Verify />}></Route>
        <Route path="admin" element={<AdminLogin />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);
reportWebVitals();
