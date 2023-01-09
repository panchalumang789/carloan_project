import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";

const routes = (
  <Routes>
    <Route path="/" element={<App />}></Route>
  </Routes>
);

export default routes;
