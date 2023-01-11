import React from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

const LandingPage = () => {
  return (
    <div className="bg-primary-color-5 dark:bg-primary-color-1 h-screen grid place-items-center transition-all duration-500">
      <Link
        to="/journey"
        className="border border-primary-color-1 dark:bg-primary-color-3 text-2xl p-4 hover:text-3xl transition-all duration-300"
      >
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Get my Loan options")
              .changeDelay(100)
              .start();
          }}
        />
      </Link>
    </div>
  );
};

export default LandingPage;
