import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ model: 'all' })
  const getMobile = (data) => {
    console.log(data);
  }
  return (
    <div className='flex items-center'>
      <div className='w-1/2 text-center'>
        <p>Your privacy and security is important.</p>
        <p>Please protect your account with SMS authentication.</p>
      </div>
      <div className='w-1/2 text-center'>
        <form onSubmit={handleSubmit(getMobile)}>
          <div>
            <label htmlFor="contact_no">Mobile</label>
            <input id='contact_no' type="number" placeholder='Contact No' {...register('mobile', { required: true, minLength: "10", maxLength: "10" })} />
            {errors.mobile?.type === 'required' && (
              <span>This field is required.</span>
            )}
            {errors.mobile?.type === 'minLength' && (
              <span>This field is required.</span>
            )}
            {errors.mobile?.type === 'maxLength' && (
              <span>This field is required.</span>
            )}
          </div>
          <button type='submit' className='p-2 border border-primary-color-1'>Next</button>
        </form>
      </div>
    </div>
  )
}

export default Login