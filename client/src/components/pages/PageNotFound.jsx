import React from "react";
import PageNotFoundImage from "../../assest/images/PageNotFound1.png";

const PageNotFound = () => {
  return (
    <div className="bg-primary-color-5 dark:bg-primary-color-1 grid place-content-center h-screen">
      <input
        className="max-w-screen-xl mix-blend-color-burn"
        type="image"
        src={PageNotFoundImage}
        alt="page not found image"
      />
    </div>
  );
};

export default PageNotFound;
