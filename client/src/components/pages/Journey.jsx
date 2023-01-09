import React from 'react'

import LeadDetails from './journey/LeadDetails'
import CarDetails from './journey/CarDetails'
import WorkDetails from './journey/WorkDetails'
import Login from './journey/Login'
import VerifyOTP from './journey/VerifyOTP'
import CustomerDetails from './journey/CustomerDetails'
import LicenseName from './journey/LicenseName'
import LicenseDetails from './journey/LicenseDetails'
import IncomeDetails from './journey/IncomeDetails'
import ExpensesDetails from './journey/ExpensesDetails'


const Journey = () => {
    return (
        <>
            <div className='h-screen'>
                <LeadDetails />
                <CarDetails />
                <WorkDetails />
                <Login />
                <VerifyOTP />
                <CustomerDetails />
                <LicenseName />
                <LicenseDetails />
                <IncomeDetails />
                <ExpensesDetails />
            </div>
        </>
    )
}

export default Journey