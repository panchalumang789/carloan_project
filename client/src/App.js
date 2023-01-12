import React from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Outlet } from "react-router-dom";
// import Navbar from "components/navbar/Navbar";
// import Theme from "components/pages/Theme";
// import Cursor from "./components/pages/Cursor";

function App() {
  return (
    <div className="App">
      {/* <Theme />
      <Navbar /> */}
      <Outlet />
      {/* <Cursor /> */}
    </div>
  );
}

export default App;
