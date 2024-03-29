import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import loanService from "services/loanService";
import Typewriter from "typewriter-effect";
import customerService from "services/customerServices";
import LoadingPage from "components/pages/journey/extra/LoadingPage";
import OTPImage from "assest/images/OTPPage1.jpg";
import useProgress from "useProgress";
import { errorToast, successToast } from "../extra/Widget";

const VerifyOTP = () => {
  const { setProgress } = useProgress();
  useEffect(() => {
    setProgress(40);
  }, [setProgress]);
  const cookie = new Cookies();
  const loanServices = new loanService();
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
  async function handleInput(e) {
    let verifyService = new customerService();
    var maxLength = parseInt(e.target.attributes["maxlength"].value);
    var myLength = e.target.value.length;
    if (myLength >= maxLength) {
      var next = e.target;
      if (OTP.join("").length === 4 && called === false) {
        called = true;
        setLoading(true);
        const { output, error } = await verifyService.verifyOTP({
          details: {
            ContactNo: cookie.get("contactNo").contactNo,
            code: OTP.join(""),
          },
        });
        if (error) {
          setLoading(false);
          errorToast("Invalid OTP !");
          setOTP(["", "", "", ""]);
          inputRef.current.focus();
        } else {
          if (output.token) {
            localStorage.setItem("token", output.token);
          }
        }
        if (output.message === "approved") {
          successToast(`OTP: ${output.message}`);
          let token = "";
          if (localStorage.getItem("token")) {
            token = localStorage.getItem("token");
          } else {
            token = "";
          }
          loanServices
            .applyLoan({
              details: { loanData: cookie.get("leadDetails") },
              headerData: token,
            })
            .then((loanResult) => {
              cookie.remove("leadDetails");
              cookie.remove("loanDetail");
              cookie.set(
                "loanDetail",
                { loanId: loanResult.loanId },
                { maxAge: 3600 }
              );
              const functionThatReturnPromise = () =>
                new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
                  setTimeout(() => {
                    navigate("/journey/customerDetail");
                  }, 500);
                });
              toast.promise(
                functionThatReturnPromise,
                {
                  pending: "Applying Loan...",
                  success: loanResult.message,
                },
                { position: "top-center" }
              );
            })
            .catch((error) => {
              errorToast(error);
            });
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
      className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-8 text-primary-color-4 dark:text-primary-color-7"
    >
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
        <div className="w-5/6 lg:w-1/2 md:px-24 rounded-xl p-8 shadow-wrapper">
          <div className="text-lg md:text-2xl mb-12">
            <p>I just send a 4-digit SMS code to you on </p>
            <span className="text-xl md:text-2xl font-medium">
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
          <p className="px-6 py-1">SMS-Code</p>
          <div
            className="flex gap-x-4 justify-center pb-8 "
            onKeyUp={(e) => handleInput(e)}
          >
            <input
              className="px-5 text-xl font-medium h-12 w-14 rounded-xl bg-primary-color-9/10 outline outline-1 outline-primary-color-1 dark:bg-primary-color-9 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 5ont-medium placeholder:text-primary-color-1 placeholder:opacity-30"
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
              className="px-5 text-xl font-medium h-12 w-14 rounded-xl bg-primary-color-9/10 outline outline-1 outline-primary-color-1 dark:bg-primary-color-9 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 5ont-medium placeholder:text-primary-color-1 placeholder:opacity-30"
              type="text"
              value={OTP[1]}
              maxLength="1"
              alt="2"
              onChange={handleChange}
              placeholder="0"
            />
            <input
              className="px-5 text-xl font-medium h-12 w-14 rounded-xl bg-primary-color-9/10 outline outline-1 outline-primary-color-1 dark:bg-primary-color-9 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 5ont-medium placeholder:text-primary-color-1 placeholder:opacity-30"
              type="text"
              value={OTP[2]}
              maxLength="1"
              alt="3"
              onChange={handleChange}
              placeholder="0"
            />
            <input
              className="px-5 text-xl font-medium h-12 w-14 rounded-xl bg-primary-color-9/10 outline outline-1 outline-primary-color-1 dark:bg-primary-color-9 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 5ont-medium placeholder:text-primary-color-1 placeholder:opacity-30"
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
              className="group font-medium flex items-center justify-end gap-x-2 w-28 h-14 text-center p-3 border border-primary-color-1 dark:bg-primary-color-9 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-5"
            >
              <em className=" group-hover:mr-2 text-xl transition-all duration-200 fa fa-arrow-left"></em>{" "}
              Edit Number
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const index = () => {
  return (
    <div>
      <VerifyOTP />
    </div>
  );
};

export default index;
