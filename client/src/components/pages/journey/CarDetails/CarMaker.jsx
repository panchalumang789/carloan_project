import React, { useEffect, useState } from "react";
import carsService from "services/carsServices";
import { selectClasses } from "../extra/Widget";

const CarMaker = (props) => {
  
  const carService = new carsService();
  const [Maker, setMaker] = useState([]);

  useEffect(() => {
    async function fetchMake() {
      const getCarMakers = await carService.getCarMaker();
      setMaker(getCarMakers);
    }

    if (!Maker.length) fetchMake();
    return () => {};
    // eslint-disable-next-line
  }, [props]);

  return (
    <div className="flex flex-col">
      <label htmlFor="make" className="px-1">
        Car maker <span className="text-red-500">*</span>
      </label>
      <select
        name="make"
        id="make"
        autoFocus
        value={props.getValue("make") || props.defaultValue}
        className={selectClasses}
        {...props.register}
      >
        <option value="" disabled>
          Select maker
        </option>
        {Maker.map((item) => {
          return (
            <option key={item.make} value={item.make}>
              {item.make}
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
  );
};

export default CarMaker;
