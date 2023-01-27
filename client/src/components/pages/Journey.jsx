import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import CustomerJourney from "./journey/index";
import PageNotFound from "./PageNotFound";
import { ProgressProvider } from "useProgress";
  
const Journey = () => {
  const location = useLocation();
  return (
    <>
      <ProgressProvider>
        <CustomerJourney.ProgressBar />
        <AnimatePresence initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<CustomerJourney.LeadDetails />} />
            <Route path="/carDetail" element={<CustomerJourney.CarDetails />} />
            <Route
              path="/workDetail"
              element={<CustomerJourney.WorkDetails />}
            />
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
            <Route
              path="/documents"
              element={<CustomerJourney.DocumentUpload />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AnimatePresence>
      </ProgressProvider>
    </>
  );
};

export default Journey;
