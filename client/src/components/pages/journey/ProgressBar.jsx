import React from "react";
import useProgress from "useProgress";

const ProgressBar = () => {
  const { progress } = useProgress();
  return (
    <div className="w-full fixed z-20 top-16 md:top-24">
      <div className="flex w-full max-w-screen-xl mx-auto">
        <div
          className={
            `w-p${progress}` +
            " z-50 bg-primary-color-1 dark:bg-primary-color-5 mx-4 rounded-xl mt-0. h-2 transition-all duration-700"
          }
        ></div>
        <span className="relative text-primary-color-1 dark:text-primary-color-7 font-medium right-3 px-1 -top-1.5">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
