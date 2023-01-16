import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import carsService from "services/carsServices";
import Typewriter from "typewriter-effect";
import Cookies from "universal-cookie";
import { FormTitle, Navigator, selectClasses } from "../extra/Widget";

const CarDetails = () => {
  const cookie = new Cookies();
  const [selectedCar] = useState(cookie.get("carDetail"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all", defaultValues: selectedCar });
  const navigate = useNavigate();

  const [carDetail, setCarDetail] = useState({
    Make: "",
    Model: "",
    Year: "",
    "Model-type": "",
  });
  const [Maker, setMaker] = useState([]);
  const [Model, setModel] = useState([]);
  const [cars, setCars] = useState([]);

  const carService = new carsService();
  useEffect(() => {
    async function fetchdata() {
      const getCarMakers = await carService.getCarMaker();
      setMaker(getCarMakers);
    }
    fetchdata();
    // eslint-disable-next-line
  }, []);

  const getMaker = async (e) => {
    setCarDetail({ ...carDetail, Make: e.target.value });
    const getCarModel = await carService.getCarModel(e.target.value);
    setModel(getCarModel);
  };

  const getModel = async (e) => {
    setCarDetail({ ...carDetail, Model: e.target.value });
    const getCars = await carService.getCarDetails(
      carDetail.Make,
      e.target.value
    );
    setCars(getCars);
  };

  const getCar = async (data) => {
    cars.map((car) => {
      if (car.id === parseInt(data.carId)) {
        let leadCookie = cookie.get("leadDetails");
        cookie.remove("leadDetails");
        return cookie.set("leadDetails", { ...leadCookie, carId: car.id });
      } else return false;
    });
    navigate("/journey/workDetail");
  };
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{
        opacity: 0,
        x: window.innerWidth,
        transition: { duration: 0.3 },
      }}
      className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-1 text-primary-color-4 dark:text-primary-color-7"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 max-w-screen-xl h-full mx-auto">
        <div className="w-5/6 lg:w-1/2 text-left text-lg xl:text-2xl md:px-20">
          <Typewriter
            options={{
              strings: "Please tell us what car you want?",
              autoStart: true,
              loop: false,
              delay: 50,
            }}
          />
        </div>
        <div className="w-5/6 lg:w-1/2 md:px-28">
          <form
            onSubmit={handleSubmit(getCar)}
            className="flex justify-center flex-col mx-auto"
          >
            <div className="flex flex-col gap-y-6">
              <FormTitle formTitle={"Car Details"} />
              <div className="flex flex-col gap-y-5">
                <div className="flex flex-col">
                  <label htmlFor="maker" className="px-1">
                    Car make <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="maker"
                    id="maker"
                    autoFocus
                    defaultValue={""}
                    className={selectClasses}
                    onClick={getMaker}
                    {...register("make", {
                      required: "Please select car maker!",
                    })}
                  >
                    <option value="" className="" disabled>
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
                <div className="flex flex-col">
                  <label htmlFor="model" className="px-1">
                    Car model <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="model"
                    id="model"
                    defaultValue={""}
                    className={selectClasses}
                    onClick={getModel}
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
                </div>
                {/* <div className="flex flex-col">
                    <label htmlFor="prodution_year" className="px-1">Production Year</label>
                    <select name="prodution_year" id="prodution_year" className={selectClasses}>
                      {cars.map(item => {
                        console.log(item.production_year);
                        for (let i = parseInt(item.production_year[0]); i < parseInt(item.production_year[1]); i++) {
                          console.log(i);
                        }
                      })}
                    </select>
                  </div> */}
                <div className="flex flex-col">
                  <label htmlFor="model_type" className="px-1">
                    Car model type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="model_type"
                    id="model-type"
                    className={selectClasses}
                    defaultValue=""
                    {...register("carId", {
                      required: "Please select model-type!",
                    })}
                  >
                    <option value="" className="" disabled>
                      Select model type
                    </option>
                    {cars.map((item) => {
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
                  {errors.carId && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.carId?.message}
                    </span>
                  )}
                </div>
              </div>
              <Navigator prevForm={"/journey"} />
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

const index = () => {
  return (
    <div>
      <CarDetails />
    </div>
  );
};

export default index;
