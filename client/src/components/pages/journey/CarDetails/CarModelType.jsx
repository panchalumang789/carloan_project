import React, { useEffect, useState } from "react";
import carsService from "services/carsServices";
import { selectClasses } from "../extra/Widget";

const CarModelType = (props) => {
  console.log("Model-Type", props.defaultValue);
  console.log("Model-Type", props.getValue("carId"));
  const carService = new carsService();
  const [Cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      const getCars = await carService.getCarDetails(props.maker, props.model);
      setCars(getCars);
    }
    if (props.model) fetchCars();
    return () => {};
    // eslint-disable-next-line
  }, [props.model]);

  const getCar = (e) => {
    console.log("model", e.target.value);
    Cars.map((item) => {
      if (item.id === parseInt(props.getValue("carId"))) {
        console.log(item);
        return props.selectedCar(item);
      } else return false;
    });
  };

  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="model_type" className="px-1">
          Car model type {props.maker} {props.model}
          <span className="text-red-500">*</span>
        </label>
        <select
          name="model_type"
          id="model_type"
          className={selectClasses}
          value={props.getValue("carId") || props.defaultValue}
          onClick={getCar}
          {...props.register}
        >
          <option value="" disabled>
            Select model type
          </option>
          {Cars.map((item) => {
            return (
              <option
                key={item.model_type}
                id={item.model_type}
                value={item.id}
              >
                {item.model_type}
              </option>
            );
          })}
        </select>
        {props.error && (
          <span className="text-red-500 pt-1 px-1 text-sm">
            {props.error?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default CarModelType;
