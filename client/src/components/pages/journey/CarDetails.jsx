// import React, { useEffect, useState } from 'react'
// import carsService from 'services/carsService';

// const CarDetails = () => {
//     const [carDetail, setCarDetail] = useState({ 'Make': '', 'Model': '', 'Year': '', 'Model-type': '' })
//     const [Maker, setMaker] = useState([])
//     const [Model, setModel] = useState([])
//     const [cars, setCars] = useState([])

//     const carService = new carsService()
//     useEffect(() => {
//         async function fetchdata() {
//             const getCarMakers = await carService.getCarMaker()
//             setMaker(getCarMakers)
//         }
//         fetchdata();
//     }, [])

//     const getMaker = async (e) => {
//         setCarDetail({ ...carDetail, Make: e.target.value })
//         const getCarModel = await carService.getCarModel(e.target.value)
//         setModel(getCarModel)
//     }

//     const getModel = async (e) => {
//         setCarDetail({ ...carDetail, Model: e.target.value })
//         const getCars = await carService.getCarDetails(carDetail.Make, e.target.value)
//         setCars(getCars)
//     }

//     return (
//         <>
//             <div className=''>
//                 <select name="maker" id="maker" onChange={getMaker}>
//                     {Maker.map(item => {
//                         return (
//                             <option key={item.make} value={item.make}>{item.make}</option>
//                         )
//                     })}
//                 </select>
//                 <select name="model" id="model" onChange={getModel}>
//                     {Model.map(item => {
//                         return (
//                             <option key={item.model} value={item.model}>{item.model}</option>
//                         )
//                     })}
//                 </select>
//                 {/* <select name="year" id="year">
//                     {cars.map(item => {
//                         console.log(item.production_year);
//                         for (let i = parseInt(item.production_year[0]); i < parseInt(item.production_year[1]); i++) {
//                             console.log(i);
//                         }
//                     })}
//                 </select> */}
//                 <select name="model-type" id="model-type">
//                     {cars.map(item => {
//                         return (
//                             <option key={item.model_type} value={item.model_type}>{item.model_type}</option>
//                         )
//                     })}
//                 </select>
//             </div>
//         </>
//     )
// }

// export default CarDetails


import React from 'react'

const CarDetails = () => {
    return (
        <div className='bg-zinc-500'>CarDetails</div>
    )
}

export default CarDetails