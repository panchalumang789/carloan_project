import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import carsService from 'services/carsServices';

const CarDetails = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ model: 'all' });
    const navigate = useNavigate();

    const [carDetail, setCarDetail] = useState({ 'Make': '', 'Model': '', 'Year': '', 'Model-type': '' })
    const [Maker, setMaker] = useState([])
    const [Model, setModel] = useState([])
    const [cars, setCars] = useState([])

    const carService = new carsService()
    useEffect(() => {
        async function fetchdata() {
            const getCarMakers = await carService.getCarMaker()
            setMaker(getCarMakers)
        }
        fetchdata();
        // eslint-disable-next-line
    }, [])

    const getMaker = async (e) => {
        setCarDetail({ ...carDetail, Make: e.target.value })
        const getCarModel = await carService.getCarModel(e.target.value)
        setModel(getCarModel)
    }

    const getModel = async (e) => {
        setCarDetail({ ...carDetail, Model: e.target.value })
        const getCars = await carService.getCarDetails(carDetail.Make, e.target.value)
        setCars(getCars)
    }

    const getCar = async (data) => {
        props.carDetails(data.carId)
        navigate('/journey/workDetail')
    }

    return (
        <>
            <div className='flex items-center h-screen'>
                <div className='w-1/2 text-center'>
                    <p>Please Tell us what car you want?</p>
                </div>
                <div className='w-1/2 text-center'>
                    <form onSubmit={handleSubmit(getCar)} className="flex justify-center flex-col gap-y-3 w-60 mx-auto">
                        <select name="maker" id="maker" onClick={getMaker} defaultValue="" {...register('make', { required: true })}>
                            <option value="" disabled >Select Maker</option>
                            {Maker.map(item => {
                                return (
                                    <option key={item.make} value={item.make}>{item.make}</option>
                                )
                            })}
                        </select>
                        {errors.make && (
                            <span>Please select car model.</span>
                        )}
                        <select name="model" id="model" onClick={getModel} defaultValue="">
                            {Model.map(item => {
                                return (
                                    <option key={item.model} value={item.model}>{item.model}</option>
                                )
                            })}
                        </select>
                        {/* <select name="year" id="year">
                            {cars.map(item => {
                                console.log(item.production_year);
                                for (let i = parseInt(item.production_year[0]); i < parseInt(item.production_year[1]); i++) {
                                    console.log(i);
                                }
                            })}
                        </select> */}
                        <select name="model_type" id="model-type" defaultValue="" {...register('carId', { required: true })}>
                            {cars.map(item => {
                                return (
                                    <option key={item.model_type} value={item.id}>{item.model_type}</option>
                                )
                            })}
                        </select>
                        {errors.carId && (
                            <span>Please select car model.</span>
                        )}
                        <button type='submit' className='p-2 border border-primary-color-1'>Next</button>
                    </form>
                </div>
            </div >
        </>
    )
}

export default CarDetails;