import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MasterLayout = () => {
  return (
    <React.Fragment>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full ml-1">
          <Navbar />
          <div className="p-4">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MasterLayout;
