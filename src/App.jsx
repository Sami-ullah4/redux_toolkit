import React from "react";
import './app.css'
// import Github_Api from "./pages/github/Github_Api";
import Home from "./pages/home/Home";
import Navbar from "./component/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { toastConfig } from "./component/toster/Toster";

const App = () => {
  return (
    <>
      {/* <Navbar/> */}
      {/* <Github_Api/> */}

      <ToastContainer {...toastConfig} />
      <Home />
      <ToastContainer />
    </>
  );
};

export default App;
