import React, { createContext, useContext, useState } from "react";

const progressContext = createContext(0);
const Progress = () => {
  const [progress, setProgress] = useState("0%");
  return { progress, setProgress };
};

export const ProgressProvider = ({ children }) => {
  const progress = Progress();

  return (
    <progressContext.Provider value={progress}>
      {children}
    </progressContext.Provider>
  );
};

const useProgress = () => useContext(progressContext);
export default useProgress;
