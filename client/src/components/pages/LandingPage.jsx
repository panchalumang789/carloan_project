import { motion, useDragControls } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import LandingPageImage from "assest/images/LandingPage1.jpg";
import Footer from "./Footer";

const LandingPage = () => {
  const controls = useDragControls();
  return (
    <div className="bg-primary-color-5 font-medium dark:bg-primary-color-8 h-screen grid place-items-center transition-all duration-500">
      <div className="flex max-w-screen-xl justify-between w-full">
        <div className="w-5/6 lg:w-1/2 flex flex-col gap-y-6 lg:px-24 text-primary-color-1 dark:text-primary-color-5 tracking-wider">
          <motion.p
            drag
            dragControls={controls}
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            dragElastic={0.3}
            className="text-6xl font-semibold"
          >
            Find the perfect loan for you..
          </motion.p>
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
        <div className="w-5/6 lg:w-1/2 mx-20">
          <motion.img
            initial={{ x: "-40%", scale: 1, opacity: 0 }}
            animate={{ x: "0%", scale: 1.25, opacity: 1 }}
            transition={{ duration: 0.75 }}
            className="bg-transparent dark:mix-blend-soft-light mix-blend-color-burn"
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
