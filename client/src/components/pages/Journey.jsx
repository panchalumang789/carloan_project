import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie'
import 'react-toastify/dist/ReactToastify.css';

import CustomerJourney from './journey'

import loanService from "services/loanService";

const Journey = () => {
  const [leadDetail, setLeadDetails] = useState({})
  const cookie = new Cookies()
  cookie.set('customerJourney', leadDetail)
  console.log("Cookie", cookie.get('customerJourney'));
  // const [leadDetail, setLeadDetails] = useState({ "approx_price": "12", "deposit": "12", "term": "4", "ballon": "12", "carId": "4", "user_status": "Employee", "user_income": "987654" })
  const [ContactNo, setContactNo] = useState('7046611714')
  const [Status, setStatus] = useState('')
  useEffect(() => {
    let verification = '';
    (async () => {
      if (Status === 'approved') {
        const leadServices = new loanService()
        const applyLoan = await leadServices.applyLoan({ path: 'loan', details: { loanData: leadDetail } })
        if (applyLoan) {
          toast.success('Verifying OTP', {
            position: "top-right",
            autoClose: 2000,
            theme: "light",
          });
          verification = setTimeout(() => {
            toast.success(applyLoan.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }, 2000);
        }
      }
    })()
    return () => { clearTimeout(verification) }
    // eslint-disable-next-line
  }, [Status])
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<CustomerJourney.LeadDetails loanDetail={(data) => setLeadDetails(data)} />} />
        <Route path="/carDetail" element={<CustomerJourney.CarDetails carDetails={(data) => setLeadDetails({ ...leadDetail, carId: data })} />} />
        <Route path="/workDetail" element={<CustomerJourney.WorkDetails workDetail={(data) => setLeadDetails({ ...leadDetail, user_status: data.user_status, user_income: data.user_income })} />} />
        <Route path="/loginDetail" element={<CustomerJourney.Login sendMobile={(data) => setContactNo(data)} />} />
        <Route path="/verifyOTP" element={<CustomerJourney.VerifyOTP ContactNo={ContactNo} verifyOTP={(status) => setStatus(status)} />} />
        <Route path="/customerDetail" element={<CustomerJourney.CustomerDetails />} />
        <Route path="/licenseName" element={<CustomerJourney.LicenseName />} />
        <Route path="/licenseDetail" element={<CustomerJourney.LicenseDetails />} />
        <Route path="/incomeDetail" element={<CustomerJourney.IncomeDetails />} />
        <Route path="/expensesDetail" element={<CustomerJourney.ExpensesDetails />} />
      </Routes>
    </>
  )
};

export default Journey;