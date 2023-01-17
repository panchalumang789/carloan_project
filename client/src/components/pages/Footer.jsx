import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="dark:bg-primary-color-4 px-4 text-primary-color-7 fixed bottom-0 h-14 bg-primary-color-1 w-full">
      <div className="flex justify-between items-center h-full mx-auto max-w-screen-xl">
        <div>Copyright &#169; 2022. All rights reserved</div>
        <div className="flex gap-x-4">
          <Link to={""}>
            <span className="text-4xl fa-brands fa-square-facebook"></span>
          </Link>
          <Link to={""}>
            <span className="text-4xl fa-brands fa-square-instagram"></span>
          </Link>
          <Link to={""}>
            <span className="text-4xl fa-brands fa-square-youtube"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
