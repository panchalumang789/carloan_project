import React from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Outlet } from "react-router-dom";
// import LoadingPage from "./components/pages/journey/extra/LoadingPage";
// import Navbar from "components/navbar/Navbar";
// import Theme from "components/pages/Theme";

function App() {
  // const [Loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);
  return (
    <>
      {/* {Loading ? (
        <LoadingPage></LoadingPage>
      ) : ( */}
      <div className="App">
        {/* <Theme />
      <Navbar /> */}
        <Outlet />
      </div>
      {/* )} */}
    </>
  );
}

export default App;
