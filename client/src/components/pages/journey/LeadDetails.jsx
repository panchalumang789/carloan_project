import React from 'react'
import { useForm } from 'react-hook-form'

const LeadDetails = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ model: 'all' });
    const LeadDetail = (data) => {
        console.log(data);
    }
    return (
        <div className='flex items-center'>
            <div className='w-1/2 text-center'>
                <p>Hello I'm Kate.</p>
                <p>I am here to help you find the best car loan options.</p>
                <p>Let's get started.</p>
            </div>
            <form onSubmit={handleSubmit(LeadDetail)} className='w-1/2 text-center'>
                <div >
                    <p>Loan Detail</p>
                    <div>
                        <label htmlFor="approx_amount">Approx Amount</label>
                        <input type="number" id='approx_amount' placeholder='Approx Amount' className='border' {...register('approx_amount', { required: true, min: 0 })} />
                        {errors.approx_amount?.type === 'required' && (
                            <span>This field is required.</span>
                        )}
                        {errors.approx_amount?.type === 'min' && (
                            <span>Enter valid amount.</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="deposit">Deposit</label>
                        <input type="number" id='deposit' placeholder='Deposit' className='border' {...register('deposit', { required: true, min: 0 })} />
                        {errors.deposit?.type === 'required' && (
                            <span>This field is required.</span>
                        )}
                        {errors.deposit?.type === 'min' && (
                            <span>Enter valid amount.</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="term">Term</label>
                        <select id='term' {...register('term', { required: true })} defaultValue="" >
                            <option disabled value="" ></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        {errors.term && (
                            <span>This field is required.</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="ballon">Ballon</label>
                        <input type="number" id='ballon' placeholder='Ballon' className='border' {...register('ballon', { required: true, min: 0, max: 35 })} />
                        {errors.ballon?.type === 'required' && (
                            <span>This field is required.</span>
                        )}
                        {errors.ballon?.type === 'min' && (
                            <span>Enter valid amount.</span>
                        )}
                        {errors.ballon?.type === 'max' && (
                            <span>Maximum amount of ballon in 35.</span>
                        )}
                    </div>
                    <button type='submit' className='p-2 border border-primary-color-1'>Next</button>
                </div>
            </form>
        </div>
    )
}

export default LeadDetails