import React from "react";
import PageNotFoundImage from "assest/images/PageNotFound.png";

const PageNotFound = () => {
  return (
    <div className="bg-primary-color-5 dark:bg-primary-color-8 grid place-content-center h-screen">
      <input
        className="h-screen max-w-screen-xl mix-blend-multiply"
        type="image"
        src={PageNotFoundImage}
        alt="page not found image"
      />
    </div>
  );
};

export default PageNotFound;
