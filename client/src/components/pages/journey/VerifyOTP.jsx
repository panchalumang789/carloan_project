import React from 'react'
import { Link } from 'react-router-dom'

const VerifyOTP = () => {
  return (
    <>
      <div className='flex items-center'>
        <div className='w-1/2 text-center' >
          <p>I just send a 4-digit SMS code to you on { }</p>
          <p>Please enter it to verify yourself.</p>
          <Link>Edit number</Link>
        </div>
        <div className='w-1/2 text-center'>
          <p>SMS Code</p>
          <div className=''>
            <input className='h-10 w-14 border' type="text" maxLength='1' alt="1" placeholder='0' autoFocus />
            <input className='h-10 w-14 border' type="text" maxLength='1' alt="1" placeholder='0' />
            <input className='h-10 w-14 border' type="text" maxLength='1' alt="1" placeholder='0' />
            <input className='h-10 w-14 border' type="text" maxLength='1' alt="1" placeholder='0' />
          </div>
          <button type='submit' className='p-2 border border-primary-color-1'>Next</button>
        </div>
      </div >
    </ >
  )
}

export default VerifyOTP