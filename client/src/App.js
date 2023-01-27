import React from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Outlet } from "react-router-dom";
import Navbar from "components/navbar/Navbar";
import Theme from "components/pages/Theme";

function App() {
  // const [Loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);
  return (
    <div className="App">
      <Theme />
      <Navbar />
      <Outlet />
      {/* )} */}
    </div>
  );
}

export default App;
