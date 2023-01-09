import React from 'react'
import { useForm } from 'react-hook-form'

const LicenseName = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ model: 'all' })
    const licenseDetail = () => {

    }
    return (
        <div className='flex items-center'>
            <div className='w-1/2 text-center'>
                <p>Perfect! I need to grab some personal info so we can run a soft credit check. Don't worry, it won't impact your credit score.</p>
            </div>
            <div className='w-1/2 text-center'>
                <p>Personal Details</p>
                <form onSubmit={handleSubmit(licenseDetail)}>
                    <div>
                        <label htmlFor='license_first_name'>First name in driver's licenses</label>
                        <input id='license_first_name' type="number" className='border' {...register('license_first_name', { required: true })} />
                        {errors.license_first_name && (
                            <span>This field is required.</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="license_last_name">Last name in driver's licenses</label>
                        <input id='license_last_name' type="number" className='border' {...register('license_last_name', { required: true })} />
                        {errors.license_last_name && (
                            <span>This field is required.</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="birth_date">Date of birth</label>
                        <input id='birth_date' type="number" className='border' {...register('birth_date', { required: true })} />
                        {errors.birth_date && (
                            <span>This field is required.</span>
                        )}
                    </div>
                    <button type='submit' className='p-2 border border-primary-color-1'>Next</button>
                </form>
            </div>
        </div>
    )
}

export default LicenseName