import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  inputClasses,
  selectClasses,
} from "components/pages/journey/extra/Widget";

const CarDetails = (props) => {
  const [carDetails, setCarData] = useState({});
  useEffect(() => {
    setCarData(props.CarDetails);
  }, [props]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  return (
    <div className="w-full border-2 rounded-md flex flex-col gap-y-3 h-full md:overflow-y-auto border-primary-color-1 dark:border-primary-color-10 p-4">
      <div className="grid grid-cols-2 gap-5 px-2">
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <label className="font-normal w-1/5">Make :</label>
          <div className="flex flex-col w-3/5">
            <select
              name="make"
              id="make"
              autoFocus
              // value={props.getValue("make") || props.defaultValue}
              className={selectClasses}
              {...props.register}
            >
              <option value="" disabled>
                Select maker
              </option>
              {/* {Maker.map((item) => {
                  return (
                    <option key={item.make} value={item.make}>
                      {item.make}
                    </option>
                  );
                })} */}
            </select>
            {/* {props.error && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {props.error?.message}
                </span>
              )} */}
          </div>
        </div>
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <div className="flex flex-col w-3/5">
            <input
              type="image"
              alt="Car Image"
              disabled
              // defaultValue={userDetails.licenceNumber}
            />
          </div>
        </div>
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <label className="font-normal w-1/5">Model :</label>
          <div className="flex flex-col w-3/5">
            <select
              name="model"
              id="model"
              // value={props.getValue("model") || props.defaultValue}
              className={selectClasses}
              {...props.register}
            >
              <option value="" className="opacity-50" disabled>
                Select model
              </option>
              {/* {Model.map((item) => {
                  return (
                    <option key={item.model} value={item.model}>
                      {item.model}
                    </option>
                  );
                })} */}
            </select>
            {/* {props.error && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {props.error?.message}
                </span>
              )} */}
          </div>
        </div>
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <label className="font-normal w-1/5">Model-Type :</label>
          <div className="flex flex-col w-3/5">
            <select
              name="model_type"
              id="model_type"
              className={selectClasses}
              // value={props.getValue("carId") || props.defaultValue}
              // onClick={getCar}
              {...props.register}
            >
              <option value="" disabled>
                Select model type
              </option>
              {/* {Cars.map((item) => {
                  return (
                    <option
                      key={item.model_type}
                      id={item.model_type}
                      value={item.id}
                    >
                      {item.model_type}
                    </option>
                  );
                })} */}
            </select>
            {/* {props.error && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {props.error?.message}
                </span>
              )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
