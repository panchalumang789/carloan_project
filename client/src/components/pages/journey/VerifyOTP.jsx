import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import customerService from "services/customerServices";
import loanService from "services/loanService";
import Typewriter from "typewriter-effect";

const VerifyOTP = () => {
  const cookie = new Cookies();
  const loanServices = new loanService();
  const navigate = useNavigate();
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
  async function handleInput(e) {
    let verifyService = new customerService();
    var maxLength = parseInt(e.target.attributes["maxlength"].value);
    var myLength = e.target.value.length;
    if (myLength >= maxLength) {
      var next = e.target;
      if (OTP.join("").length === 4 && called === false) {
        called = true;
        let result = await verifyService
          .verifyOTP({
            path: "verify",
            details: {
              ContactNo: cookie.get("contactNo").mobile,
              code: OTP.join(""),
            },
          })
          .catch(() => {
            toast.error("Invalid OTP !", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
        if (result.message === "approved") {
          toast.success(`OTP: ${result.message}`);
          loanServices
            .applyLoan({
              path: "loan",
              details: { loanData: cookie.get("leadDetails") },
            })
            .then((loanResult) => {
              cookie.remove("leadDetails");
              cookie.set("loanDetail", { loanId: loanResult.loanId });
              const functionThatReturnPromise = () =>
                new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
                  setTimeout(() => {
                    navigate("/journey/customerDetail");
                  }, 500);
                });
              toast.promise(functionThatReturnPromise, {
                pending: "Applying Loan...",
                success: loanResult.message,
              });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          toast.error("Invalid OTP !", {
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setOTP(["", "", "", ""]);
          inputRef.current.focus();
        }
      }
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
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{
        opacity: 0,
        x: window.innerWidth,
        transition: { duration: 0.3 },
      }}
      className="h-screen bg-primary-color-5 dark:bg-primary-color-1 text-primary-color-4 dark:text-primary-color-7"
    >
      <ToastContainer />
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 max-w-screen-xl h-full mx-auto">
        <div className="w-5/6 lg:w-1/2 text-left text-lg xl:text-2xl md:px-20">
          <p className="">I just send a 4-digit SMS code to you on </p>
          <span className="text-xl font-medium">
            {cookie.get("contactNo") && (
              <Typewriter
                options={{
                  strings: cookie.get("contactNo").mobile,
                  autoStart: true,
                  loop: false,
                  delay: 80,
                }}
              />
            )}
          </span>
          <p>Please enter it to verify yourself.</p>
        </div>
        <div className="w-5/6 lg:w-1/2 md:px-28">
          <Link className="text-md font-medium after:w-0 hover:after:w-24 after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-5 after:transition-all after:duration-700 after:rounded-xl after:mb-3">
            Edit number
          </Link>
          <p className="px-6 py-1">SMS Code</p>
          <div
            className="flex gap-x-4 justify-center pb-8"
            onKeyUp={(e) => handleInput(e)}
          >
            <input
              className="px-5 text-xl h-12 w-14 rounded-xl bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 font-medium placeholder:text-primary-color-1 placeholder:opacity-30"
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
              className="px-5 text-xl h-12 w-14 rounded-xl bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 font-medium placeholder:text-primary-color-1 placeholder:opacity-30"
              type="text"
              value={OTP[1]}
              maxLength="1"
              alt="2"
              onChange={handleChange}
              placeholder="0"
            />
            <input
              className="px-5 text-xl h-12 w-14 rounded-xl bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 font-medium placeholder:text-primary-color-1 placeholder:opacity-30"
              type="text"
              value={OTP[2]}
              maxLength="1"
              alt="3"
              onChange={handleChange}
              placeholder="0"
            />
            <input
              className="px-5 text-xl h-12 w-14 rounded-xl bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 font-medium placeholder:text-primary-color-1 placeholder:opacity-30"
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
              to={"/journey/loginDetail"}
              className="group font-medium flex items-center justify-end gap-x-2 w-24 text-center p-3 border border-primary-color-1 dark:bg-primary-color-6 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-3"
            >
              <em className=" group-hover:mr-2 text-xl transition-all duration-200 fa fa-arrow-left"></em>{" "}
              Back
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VerifyOTP;
