import React from 'react'
import { useForm } from 'react-hook-form'


const WorkDetails = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ model: 'all' })

    const WorkDetails = (data) => {
        console.log(data);
    }
    return (
        <div className='flex items-center justify-center'>
            <div className='w-1/2 text-center'>
                <p>What is your work situation?</p>
            </div>
            <form onSubmit={handleSubmit(WorkDetails)} className='w-1/2 text-center'>
                <div>
                    <p>Loan Detail</p>
                    <div>
                        <label htmlFor="status">Status</label>
                        <input type="text" id='status' placeholder='Status' className='border' {...register('status', { required: true })} />
                        {errors.status && (
                            <span>This field is required.</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="income">Income</label>
                        <input type="number" id='income' placeholder='Income' className='border' {...register('income', { required: true, min: 10000 })} />
                        {errors.income?.type === 'required' && (
                            <span>This field is required.</span>
                        )}
                        {errors.income?.type === 'min' && (
                            <span>Income should be greater than 10000.</span>
                        )}
                    </div>
                    <button type='submit' className='p-2 border border-primary-color-1'>Next</button>
                </div>
            </form>
        </div >
    )
}

export default WorkDetails