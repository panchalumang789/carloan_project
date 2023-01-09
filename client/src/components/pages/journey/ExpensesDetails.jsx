import React from 'react'
import { useForm } from 'react-hook-form';

const ExpensesDetails = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ model: 'all' })
  const expensesDetails = (data) => {
    console.log(data);
  }
  return (
    <div className='flex items-center'>
      <div className='w-1/2 text-center'>
        <p>Please provide your monthly expenses.</p>
      </div>
      <div className='w-1/2 text-center'>
        <p>Expenses</p>
        <form onSubmit={handleSubmit(expensesDetails)}>
          <div>
            <label htmlFor='vehicle_running_cost'>Moter vehicle running costs</label>
            <input id='vehicle_running_cost' type="number" className='border' {...register('vehicle_running_cost', { required: true })} />
            {errors.vehicle_running_cost && (
              <span>This field is required.</span>
            )}
          </div>
          <div>
            <label htmlFor="travel">Travel</label>
            <input id='travel' type="number" className='border' {...register('travel', { required: true })} />
            {errors.travel && (
              <span>This field is required.</span>
            )}
          </div>
          <div>
            <label htmlFor="utilities">Utilities</label>
            <input id='utilities' type="number" className='border' {...register('utilities', { required: true })} />
            {errors.utilities && (
              <span>This field is required.</span>
            )}
          </div>
          <div>
            <label htmlFor="insurances">Insurances</label>
            <input id='insurances' type="number" className='border' {...register('insurances', { required: true })} />
            {errors.insurances && (
              <span>This field is required.</span>
            )}
          </div>
          <div>
            <label htmlFor="telephone_internet">Telephone and Internet</label>
            <input id='telephone_internet' type="number" className='border' {...register('telephone_internet', { required: true })} />
            {errors.telephone_internet && (
              <span>This field is required.</span>
            )}
          </div>
          <div>
            <label htmlFor="entertainment">Entertainment</label>
            <input id='entertainment' type="number" className='border' {...register('entertainment', { required: true })} />
            {errors.entertainment && (
              <span>This field is required.</span>
            )}
          </div>
          <button type='submit' className='p-2 border border-primary-color-1'>Next</button>
        </form>
      </div >
    </div >
  )
}

export default ExpensesDetails