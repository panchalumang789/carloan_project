import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customerService from "services/customerServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOTP = (props) => {
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

  async function handleInput(e) {
    let verifyService = new customerService();
    var maxLength = parseInt(e.target.attributes["maxlength"].value);
    var myLength = e.target.value.length;
    if (myLength >= maxLength) {
      var next = e.target;
      if (OTP.join("").length === 4) {
        let result = await verifyService.verifyOTP({
          path: "verify",
          details: { ContactNo: props.ContactNo, code: OTP.join("") },
        });
        if (result.message === "approved") {
          props.verifyOTP(result.message);
          setTimeout(() => {
            navigate("/journey/customerDetail");
          }, 3000);
        } else {
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
    <>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "100%" }}
        exit={{
          opacity: 0,
          x: window.innerWidth,
          transition: { duration: 0.3 },
        }}
        className="flex items-center h-screen"
      >
        <ToastContainer />
        <div className="w-1/2 text-center">
          <p className="">I just send a 4-digit SMS code to you on {}</p>
          <p>Please enter it to verify yourself.</p>
          <Link>Edit number</Link>
        </div>
        <div className="w-1/2 text-center">
          <p>SMS Code</p>
          <div
            className="flex gap-x-4 justify-center"
            onKeyUp={(e) => handleInput(e)}
          >
            <input
              className="h-12 text-xl w-14 border rounded-2xl px-5"
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
              className="h-12 text-xl w-14 border rounded-2xl px-5"
              type="text"
              value={OTP[1]}
              maxLength="1"
              alt="2"
              onChange={handleChange}
              placeholder="0"
            />
            <input
              className="h-12 text-xl w-14 border rounded-2xl px-5"
              type="text"
              value={OTP[2]}
              maxLength="1"
              alt="3"
              onChange={handleChange}
              placeholder="0"
            />
            <input
              className="h-12 text-xl w-14 border rounded-2xl px-5"
              type="text"
              value={OTP[3]}
              maxLength="1"
              alt="4"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
          <button type="submit" className="p-2 border border-primary-color-1">
            Next
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default VerifyOTP;
