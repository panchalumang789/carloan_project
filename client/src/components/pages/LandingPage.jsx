import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import LandingPageImage from "../../assest/images/LandingPage4.jpg";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="bg-primary-color-5 font-medium dark:bg-primary-color-1 h-screen grid place-items-center transition-all duration-500">
      {/* <div className="fixed h-16 text-primary-color-1 dark:text-primary-color-5 flex justify-center items-center xl:ml-44 top-0 left-0">
        <div className="flex items-center">
          <div className="flex flex-col items-end">
            <p className="text-2xl leading-6 tracking-wider">C</p>
            <p className="text-2xl leading-6 tracking-wider">LO</p>
          </div>
          <p className="text-6xl">A</p>
          <div className="flex flex-col">
            <p className="text-2xl leading-6 tracking-wider">R</p>
            <p className="text-2xl leading-6 tracking-wider">NS</p>
          </div>
        </div>
      </div> */}
      <div className="flex max-w-screen-xl justify-between w-full">
        <div className="w-5/6 lg:w-1/2 flex flex-col gap-y-6 lg:px-24 text-primary-color-1 dark:text-primary-color-5 tracking-wider">
          <p className="text-6xl font-semibold">
            Find the perfect loan for you..
          </p>
          <p className="text-xl">
            Find the cheapest loan in minutes then click to apply instantly.
            It's free and won't affect your credit score.
          </p>
          <Link
            to="/journey"
            className="border w-max rounded-md border-primary-color-1 text-2xl p-4 transition-all hover:bg-primary-color-3 hover:text-primary-color-7 dark:border-primary-color-5 dark:bg-primary-color-3 dark:text-primary-color-4 dark:hover:bg-primary-color-7 duration-300"
          >
            Get my Loan options.
          </Link>
        </div>
        <div className="w-5/6 lg:w-1/2 sca">
          <motion.img
            initial={{ x: "-40%", scale: 1, opacity: 0 }}
            animate={{ x: "0%", scale: 1.25, opacity: 1 }}
            transition={{ duration: 0.75 }}
            className="bg-transparent aspect-video dark:mix-blend-soft-light h-full mix-blend-color-burn"
            src={LandingPageImage}
            alt="Banner"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
