import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import carsService from "services/carsServices";
import Typewriter from "typewriter-effect";
import Cookies from "universal-cookie";

const CarDetails = () => {
  const cookie = new Cookies();
  const [selectedCar, SelectCar] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all" });
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
        cookie.set("leadDetails", { ...leadCookie, carId: car.id });
        return cookie.set("carDetails", car);
      } else return false;
    });
    navigate("/journey/workDetail");
  };

  useMemo(() => {
    if (cookie.get("carDetails")) {
      SelectCar(cookie.get("carDetails"));
    }
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "100%" }}
        exit={{
          opacity: 0,
          x: window.innerWidth,
          transition: { duration: 0.3 },
        }}
        className="h-screen bg-primary-color-5 dark:bg-primary-color-1 text-primary-color-4 dark:text-primary-color-7"
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
                <p className="text-3xl after:w-0 font-semibold hover:after:w-full after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:transition-all after:duration-700 after:rounded-xl after:mt-1.5">
                  Car Details
                </p>
                <div className="flex flex-col gap-y-5">
                  <div className="flex flex-col">
                    <label htmlFor="maker" className="px-1">
                      Car Maker
                    </label>
                    <select
                      name="maker"
                      id="maker"
                      defaultValue={selectedCar.make || ""}
                      className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7  text-primary-color-1 font-medium "
                      onClick={getMaker}
                      {...register("make", { required: true })}
                    >
                      <option value="" className="" disabled>
                        Select Maker
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
                        Please select car model.
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="model" className="px-1">
                      Car Model
                    </label>
                    <select
                      name="model"
                      id="model"
                      className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7  text-primary-color-1 font-medium"
                      onClick={getModel}
                    >
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
                    <select name="prodution_year" id="prodution_year" className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7  text-primary-color-1 font-medium">
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
                      Car Mode-Type
                    </label>
                    <select
                      name="model_type"
                      id="model-type"
                      className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7  text-primary-color-1 font-medium"
                      {...register("carId", { required: true })}
                    >
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
                        Please select car model.
                      </span>
                    )}
                  </div>
                  <div className="w-full flex justify-around">
                    <Link
                      to={"/journey"}
                      className="group font-medium flex items-center justify-end gap-x-2 w-24 text-center p-3 border border-primary-color-1 dark:bg-primary-color-6 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-3"
                    >
                      <em className=" group-hover:mr-2 text-xl transition-all duration-200 fa fa-arrow-left rounded-md "></em>{" "}
                      Back
                    </Link>
                    <button
                      type="submit"
                      className="group font-medium flex items-center justify-start gap-x-2 w-24 text-center p-3 border border-primary-color-1 dark:bg-primary-color-6 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-3"
                    >
                      Next{" "}
                      <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right rounded-md " />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CarDetails;
