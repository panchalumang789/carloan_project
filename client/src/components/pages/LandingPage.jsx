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
        <Typewriter options={{
          strings: "Get my Loan options.",
          autoStart: true,
          loop: false,
          delay: 60,
        }} />
      </Link>
    </div>
  );
};

export default LandingPage;
