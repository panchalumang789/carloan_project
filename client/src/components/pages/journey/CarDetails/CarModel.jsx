import React, { useEffect, useState } from "react";
import carsService from "services/carsServices";
import { selectClasses } from "../extra/Widget";

const CarModel = (props) => {
  const carService = new carsService();
  const [Model, setModel] = useState([]);

  useEffect(() => {
    async function fetchModel() {
      const getCarModel = await carService.getCarModel(props.maker);
      setModel(getCarModel);
    }
    if (props.maker) fetchModel();
    return () => {};
    // eslint-disable-next-line
  }, [props.maker]);
  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="model" className="px-1">
          Car model
          <span className="text-red-500">*</span>
        </label>
        <select
          name="model"
          id="model"
          value={props.getValue("model") || props.defaultValue}
          className={selectClasses}
          {...props.register}
        >
          <option value="" className="opacity-50" disabled>
            Select model
          </option>
          {Model.map((item) => {
            return (
              <option key={item.model} value={item.model}>
                {item.model}
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

export default CarModel;
