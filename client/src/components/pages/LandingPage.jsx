import { motion, useDragControls } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import LandingPageImage from "assest/images/LandingPage5.jpg";
import Footer from "./Footer";

const LandingPage = () => {
  const controls = useDragControls();
  return (
    <div className="bg-primary-color-5 p-4 lg:p-0 font-medium dark:bg-primary-color-8 h-screen grid place-items-center transition-all duration-500">
      <div className="flex flex-col gap-y-20 lg:flex-row items-center max-w-screen-xl justify-between w-full">
        <div className="w-full order-2 lg:order-1 lg:w-1/2 flex flex-col gap-y-5 lg:gap-y-6 lg:px-24 text-primary-color-1 dark:text-primary-color-7 tracking-wider">
          <motion.p
            drag
            dragControls={controls}
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            dragElastic={0.3}
            className="text-4xl lg:text-6xl font-semibold"
          >
            Find the perfect loan for you..
          </motion.p>
          <p className="text-lg lg:text-xl">
            Find the cheapest loan in minutes then click to apply instantly.
            It's free and won't affect your credit score.
          </p>
          <div className="w-full text-center lg:text-left">
            <Link
              to="/journey"
              className="border-2 w-max rounded-md border-primary-color-1 text-xl lg:text-2xl p-3 lg:p-4 transition-all hover:bg-primary-color-3 hover:text-primary-color-7 dark:border-primary-color-10 dark:bg-primary-color-10 dark:text-primary-color-4 dark:hover:text-primary-color-7 dark:hover:bg-primary-color-9 dark:hover:border-primary-color-7 duration-300"
            >
              Get my loan options.
            </Link>
          </div>
        </div>
        <div className="w-auto order-1 lg:order-2 md:w-2/3 lg:w-1/2 px-8 lg:px-24">
          <motion.img
            initial={{ x: "-40%", scale: 1, opacity: 0 }}
            animate={{ x: "0%", scale: 1.25, opacity: 1 }}
            transition={{ duration: 0.75 }}
            className="bg-transparent mix-blend-multiply dark:mix-blend-soft-light"
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
