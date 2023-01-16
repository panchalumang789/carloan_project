import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";

import CustomerJourney from "./journey/index";
// import LoadingPage from "./journey/extra/LoadingPage";

const Journey = () => {
  const location = useLocation();
  return (
    <>
      <ToastContainer />
      <AnimatePresence initial={false}>
        {/* <LoadingPage/> */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<CustomerJourney.LeadDetails />} />
          <Route path="/carDetail" element={<CustomerJourney.CarDetails />} />
          <Route path="/workDetail" element={<CustomerJourney.WorkDetails />} />
          <Route path="/loginDetail" element={<CustomerJourney.Login />} />
          <Route path="/verifyOTP" element={<CustomerJourney.VerifyOTP />} />
          <Route
            path="/customerDetail"
            element={<CustomerJourney.CustomerDetails />}
          />
          <Route
            path="/licenseName"
            element={<CustomerJourney.LicenseName />}
          />
          <Route
            path="/licenseDetail"
            element={<CustomerJourney.LicenseDetails />}
          />
          <Route
            path="/incomeDetail"
            element={<CustomerJourney.IncomeDetails />}
          />
          <Route
            path="/expensesDetail"
            element={<CustomerJourney.ExpensesDetails />}
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default Journey;
