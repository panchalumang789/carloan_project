import React from "react";
import App from "./App";
import { Route, Routes } from "react-router-dom";
import Journey from "components/pages/Journey";
import LandingPage from "components/pages/LandingPage";

const CarLoanRoute = (
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="" element={<LandingPage />}></Route>
      <Route path="journey" element={<Journey />}></Route>
    </Route>
  </Routes>
);

export default CarLoanRoute;
