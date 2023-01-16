import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 1 }}
      className="absolute top-0 left-0 h-full w-full bg-purple-300"
    >
      <Link to={"/journey/carDetail"}>pre</Link>
    </motion.div>
  );
};

export default index;
