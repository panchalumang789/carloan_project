import LoadingPage from "components/pages/journey/extra/LoadingPage";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customerService from "services/customerServices";
import Typewriter from "typewriter-effect";
import Cookies from "universal-cookie";
import OTPImage from "assest/images/OTPPage1.jpg";
import {
  errorToast,
  successToast,
} from "components/pages/journey/extra/Widget";
import { ToastContainer } from "react-toastify";

const VerifyOTP = () => {
  const cookie = new Cookies();

  const userService = new customerService();
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState(new Array(4).fill(""));
  const inputRef = useRef(null);

  const handleChange = async (event) => {
    const result = event.target.value.replace(/\D/g, "");
    const nextOTP = OTP.map((value, index) => {
      if (index === parseInt(event.target.alt - 1)) return result;
      return value;
    });
    setOTP(nextOTP);
    event.target.value = result;
  };

  let called = false;
  const verifyUser = async () => {
    if (OTP.join("").length === 4 && called === false) {
      called = true;
      setLoading(true);
      // let result = await userService.verifyOTP({
      //   details: {
      //     ContactNo: cookie.get("contactNo").contactNo,
      //     code: OTP.join(""),
      //   },
      // });
      let { output, error } = await userService.verifyOTP({
        details: {
          ContactNo: cookie.get("contactNo").contactNo,
          code: OTP.join(""),
        },
      });
      if (error) {
        if (error.data.message) {
          errorToast(error.data.message);
        } else {
          errorToast("Invalid OTP !");
        }
        setLoading(false);
        setOTP(["", "", "", ""]);
        inputRef.current.focus();
      } else {
        if (output.message === "approved") {
          successToast(`OTP: ${output.message}`);
          if (output.token) {
            localStorage.setItem("token", output.token);
          }
          cookie.remove("contactNo");
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      }
    }
  };

  async function handleInput(e) {
    var maxLength = parseInt(e.target.attributes["maxlength"].value);
    var myLength = e.target.value.length;
    if (myLength >= maxLength) {
      var next = e.target;
      verifyUser();
      while ((next = next.nextElementSibling)) {
        if (next == null) {
          break;
        }
        if (next.tagName.toLowerCase() === "input") {
          next.focus();
          break;
        }
      }
    }
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-8 text-primary-color-4 dark:text-primary-color-7">
      {Loading && (
        <div className="h-screen w-screen flex justify-center items-center mx-auto bg-transparent/30 dark:bg-transparent/60 fixed">
          <LoadingPage />
        </div>
      )}
      <ToastContainer />
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 max-w-screen-xl h-full mx-auto">
        <div className="w-5/6 lg:w-1/2 text-left text-lg xl:text-2xl">
          <input
            className="w-full mix-blend-multiply"
            type="image"
            src={OTPImage}
            alt="OTP verification image"
          />
        </div>
        <div className="w-5/6 lg:w-1/2 md:px-24 ">
          <div className="rounded-xl p-8 shadow-wrapper ">
            <div className="text-lg md:text-2xl pb-8 ">
              <p className="">I just send a 4-digit SMS code to you on </p>
              <span className="text-xl font-medium">
                {cookie.get("contactNo") && (
                  <Typewriter
                    options={{
                      strings: cookie.get("contactNo").contactNo,
                      autoStart: true,
                      loop: false,
                      delay: 80,
                    }}
                  />
                )}
              </span>
              <p>Please enter it to verify yourself.</p>
            </div>
            <p className="px-6 py-1">SMS Code</p>
            <div
              className="flex gap-x-4 justify-center pb-8"
              onKeyUp={(e) => handleInput(e)}
            >
              <input
                className="px-5 text-xl h-12 w-14 rounded-xl bg-primary-color-9/10 dark:bg-primary-color-9 dark:text-primary-color-7 dark:placeholder:text-primary-color-7 text-primary-color-1 font-medium placeholder:text-primary-color-1 placeholder:opacity-50 outline outline-1 dark:outline-primary-color-5"
                type="text"
                value={OTP[0]}
                maxLength="1"
                alt="1"
                onChange={handleChange}
                placeholder="0"
                autoFocus
                ref={inputRef}
              />
              <input
                className="px-5 text-xl h-12 w-14 rounded-xl bg-primary-color-9/10 dark:bg-primary-color-9 dark:text-primary-color-7 dark:placeholder:text-primary-color-7 text-primary-color-1 font-medium placeholder:text-primary-color-1 placeholder:opacity-50 outline outline-1 dark:outline-primary-color-5"
                type="text"
                value={OTP[1]}
                maxLength="1"
                alt="2"
                onChange={handleChange}
                placeholder="0"
              />
              <input
                className="px-5 text-xl h-12 w-14 rounded-xl bg-primary-color-9/10 dark:bg-primary-color-9 dark:text-primary-color-7 dark:placeholder:text-primary-color-7 text-primary-color-1 font-medium placeholder:text-primary-color-1 placeholder:opacity-50 outline outline-1 dark:outline-primary-color-5"
                type="text"
                value={OTP[2]}
                maxLength="1"
                alt="3"
                onChange={handleChange}
                placeholder="0"
              />
              <input
                className="px-5 text-xl h-12 w-14 rounded-xl bg-primary-color-9/10 dark:bg-primary-color-9 dark:text-primary-color-7 dark:placeholder:text-primary-color-7 text-primary-color-1 font-medium placeholder:text-primary-color-1 placeholder:opacity-50 outline outline-1 dark:outline-primary-color-5"
                type="text"
                value={OTP[3]}
                maxLength="1"
                alt="4"
                onChange={handleChange}
                placeholder="0"
              />
            </div>
            <div className="w-full flex mx-auto justify-start">
              <Link
                to={"/login"}
                className="group font-medium flex items-center justify-end gap-x-2 w-28 h-14 text-center p-3 border border-primary-color-1 dark:bg-primary-color-9 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-5"
              >
                <em className=" group-hover:mr-2 text-xl transition-all duration-200 fa fa-arrow-left"></em>{" "}
                Edit Number
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
