import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import customerService from 'services/customerServices';

const LicenseDetails = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ model: 'all' })
  const userService = new customerService()

  const [States, setStates] = useState([])
  const getStates = async () => {
    const result = await userService.getState({ data: { url: 'states' } })
    setStates(result)
  }
  useEffect(() => {
    getStates()
    return () => { }
  })

  const licenseDetail = (data) => {
    console.log(data);
  }
  return (
    <div className='flex items-center h-screen'>
      <div className='w-1/2 text-center'>
        <p>Great! I need your driving license details.</p>
      </div>
      <div className='w-1/2 text-center'>
        <p>License details</p>
        <form onSubmit={handleSubmit(licenseDetail)}>
          <div>
            <label htmlFor='license_number'>Number</label>
            <input id='license_number' type="number" className='border' {...register('license_number', { required: true })} />
            {errors.license_number && (
              <span>This field is required.</span>
            )}
          </div>
          <div>
            <label htmlFor="license_expiry">Expiry</label>
            <input id='license_expiry' type="date" className='border' {...register('license_expiry', { required: true })} />
            {errors.license_expiry && (
              <span>This field is required.</span>
            )}
          </div>
          <div>
            <label htmlFor="license_type">License type</label>
            <select name="license_type" id="license_type"  {...register('license_type', { required: true })}>
              <option></option>
            </select>
            {errors.license_type && (
              <span>This field is required.</span>
            )}
          </div>
          <div>
            <label htmlFor="issue_state">Issue state</label>
            <select id='issue_state' name="issue_state" defaultValue="" {...register('issue_state', { required: true })}>
              <option value="" disabled >Select State</option>
              {States.map((state, index) => {
                return (
                  <option key={index} value={state}>{state}</option>
                )
              })}
            </select>
            {errors.issue_state && (
              <span>This field is required.</span>
            )}
          </div>
          <button type='submit' className='p-2 border border-primary-color-1'>Next</button>
        </form>
      </div>
    </div>
  )
}

export default LicenseDetails