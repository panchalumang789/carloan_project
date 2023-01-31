import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  errorToast,
  selectClasses,
  successToast,
} from "components/pages/journey/extra/Widget";
import carsService from "services/carsServices";
import loanService from "services/loanService";
import { ToastContainer } from "react-toastify";

const CarDetails = (props) => {
  const carService = new carsService();
  const updateService = new loanService();
  const [Editing, setEditing] = useState(false);
  const [Maker, setMaker] = useState([]);
  const [Model, setModel] = useState([]);
  const [Cars, setCars] = useState([]);
  const [SelectedMaker, setSelectedMaker] = useState("");
  const [SelectedModel, setSelectedModel] = useState("");
  const [SelectedCars, setSelectedCars] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const fetchCar = async () => {
    const getCarMakers = await carService.getCarMaker();
    setMaker(getCarMakers);
    const getCarModel = await carService.getCarModel(props.CarDetails.make);
    setModel(getCarModel);
    const getCars = await carService.getCarDetails(
      props.CarDetails.make,
      props.CarDetails.model
    );
    setCars(getCars);
  };

  useEffect(() => {
    fetchCar();
    setSelectedMaker(props.CarDetails.make);
    setSelectedModel(props.CarDetails.model);
    setSelectedCars(props.CarId);
    return () => {};
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (Maker.length > 0) {
      setValue("make", SelectedMaker);
    }
    if (Model.length > 0) {
      setValue("model", SelectedModel);
    }
    if (Cars.length > 0) {
      setValue("carId", SelectedCars);
    }
    return () => {};
    // eslint-disable-next-line
  }, [Maker, Model, Cars]);

  const getModel = async (e) => {
    setSelectedMaker(e.target.value);
    setSelectedModel("");
    setSelectedCars("");
    const getCarModel = await carService.getCarModel(e.target.value);
    setModel(getCarModel);
  };

  const getCar = async (e) => {
    setSelectedModel(e.target.value);
    const getCars = await carService.getCarDetails(
      SelectedMaker,
      e.target.value
    );
    setSelectedCars("");
    setCars(getCars);
  };

  const updateCarData = async (data) => {
    const { output, error } = await updateService.updateLoanCar({
      loanId: props.LoanId,
      bodyData: data,
      headerData: localStorage.getItem("token"),
    });
    if (!output) {
      errorToast(error.data.message);
    } else {
      successToast(output.message);
      props.UpdateLoan();
      setEditing(false);
    }
  };

  return (
    <div className="w-full border-2 rounded-md flex flex-col gap-y-3 h-full md:overflow-y-auto border-primary-color-1 dark:border-primary-color-10 p-4">
      <form
        onSubmit={handleSubmit(updateCarData)}
        className="flex flex-col gap-5"
      >
        <ToastContainer />
        <div className="grid grid-cols-2 gap-5 px-2">
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label className="font-normal w-1/5">Make :</label>
            <div className="flex flex-col w-3/5">
              <select
                name="make"
                id="make"
                autoFocus
                className={
                  selectClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                onClick={getModel}
                disabled={!Editing}
                {...register("make", {
                  required: "Please select car maker!",
                })}
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
              {errors.make && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.make?.message}
                </span>
              )}
            </div>
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label className="font-normal w-1/5">Model :</label>
            <div className="flex flex-col w-3/5">
              <select
                name="model"
                id="model"
                className={
                  selectClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                onClick={getCar}
                disabled={!Editing}
                {...register("model", {
                  required: "Please select car model!",
                })}
              >
                <option value="" disabled>
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
              {errors.model && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.model?.message}
                </span>
              )}
            </div>
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label className="font-normal w-1/5">Model-Type :</label>
            <div className="flex flex-col w-3/5">
              <select
                name="model_type"
                id="model_type"
                className={
                  selectClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                disabled={!Editing}
                {...register("carId", {
                  required: "Please select car model-type!",
                })}
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
              {errors.model_type && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.model_type?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end px-36 gap-4">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="group font-medium flex items-center justify-center gap-x-2 w-16 hover:font-semibold text-center p-2 border border-primary-color-1 bg-primary-color-7 hover:bg-white dark:bg-primary-color-9 dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-3"
          >
            Edit
          </button>
          <button
            type="submit"
            disabled={!Editing}
            className="group font-medium flex items-center justify-start gap-x-2 w-28 text-center p-2 border border-primary-color-1 dark:bg-primary-color-9 bg-primary-color-7 hover:bg-white dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-3 disabled:bg-white/40 disabled:hover:cursor-not-allowed"
          >
            SUBMIT
            <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarDetails;
