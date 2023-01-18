import React, { useEffect, useState } from "react";

const Theme = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="fixed h-16 right-24 md:top-5 md:right-36 z-50">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={handleTheme}
        />
        <div className="w-11 h-6 bg-primary-color-1 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-color-1 dark:peer-focus:ring-primary-color-5 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-primary-color-1 peer-checked:after:bg-primary-color-1 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-primary-color-5 after:border-primary-color-5 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-color-5"></div>
      </label>
    </div>
  );
};

export default Theme;
