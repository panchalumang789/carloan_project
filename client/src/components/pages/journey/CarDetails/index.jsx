import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import Cookies from "universal-cookie";
import CarMaker from "./CarMaker";
import CarModel from "./CarModel";
import CarModelType from "./CarModelType";
import { FormTitle, Navigator } from "../extra/Widget";
import useProgress from "useProgress";

const CarDetails = () => {
  const { setProgress } = useProgress();
  useEffect(() => {
    setProgress(10);
  }, [setProgress]);

  const cookie = new Cookies();
  const navigate = useNavigate();
  const [Car, setCar] = useState({});
  const [CarDetail, setCarDetail] = useState({});
  const [CarDetails, setCarDetails] = useState({
    Make: "",
    Model: "",
    Model_type: "",
  });
  // const carService = new carsService();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  watch("make");

  useEffect(() => {
    if (cookie.get("carDetails")) {
      const cookieData = cookie.get("carDetails");
      setCarDetail(cookieData);
    }
    return () => {};
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (Object.keys(CarDetail).length > 0) {
      setCarDetails({
        Make: CarDetail.make,
        Model: CarDetail.model,
        Model_type: CarDetail.id,
      });
      setValue("make", "" || CarDetail.make);
      setValue("model", "" || CarDetail.model);
      setValue("carId", "" || CarDetail.id);
    }
    return () => {};
    // eslint-disable-next-line
  }, [CarDetail]);

  useEffect(() => {
    if (
      cookie.get("carDetails") &&
      cookie.get("carDetails").make !== watch("make")
    ) {
      setCarDetails({ Model_type: "" });
      setValue("model", "");
      setValue("carId", "");
    }
    // eslint-disable-next-line
  }, [watch("make")]);

  useEffect(() => {
    if (
      cookie.get("carDetails") &&
      cookie.get("carDetails").model !== watch("model")
    ) {
      setCarDetails({ Model_type: "" });
      setValue("carId", "");
    }
    // eslint-disable-next-line
  }, [watch("model")]);

  const getCar = async (data) => {
    if (Car.id) {
      let leadCookie = cookie.get("leadDetails");
      cookie.remove("leadDetails");
      cookie.set("carDetails", Car, { maxAge: 3600 });
      cookie.set(
        "leadDetails",
        { ...leadCookie, carId: Car.id },
        { maxAge: 3600 }
      );
    }
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
      className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-8 text-primary-color-4 dark:text-primary-color-7"
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
        <div className="w-5/6 lg:w-1/2 md:px-24">
          <form
            onSubmit={handleSubmit(getCar)}
            className="flex justify-center flex-col mx-auto rounded-xl p-8 shadow-wrapper"
          >
            <div className="flex flex-col gap-y-6">
              <FormTitle formTitle={"Car Details"} />
              <div className="flex flex-col gap-y-5">
                <CarMaker
                  register={register("make", {
                    required: "Please select car maker!",
                  })}
                  error={errors.make}
                  defaultValue={CarDetails.Make}
                  getValue={getValues}
                />
                <CarModel
                  maker={watch("make")}
                  register={register("model", {
                    required: "Please select car model!",
                  })}
                  error={errors.model}
                  defaultValue={CarDetails.Model}
                  getValue={getValues}
                />
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
                <CarModelType
                  maker={watch("make")}
                  model={watch("model")}
                  register={register("carId", {
                    required: "Please select model-type!",
                  })}
                  error={errors.carId}
                  defaultValue={CarDetails.Model_type}
                  selectedCar={(data) => {
                    setCar(data);
                  }}
                  getValue={getValues}
                />
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
