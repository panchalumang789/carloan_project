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
    <div className="fixed top-10 right-32">
      <button
        className="dark:bg-white p-2 rounded-lg border"
        onClick={handleTheme}
      >
        Theme
      </button>
    </div>
  );
};

export default Theme;
