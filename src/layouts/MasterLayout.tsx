import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MasterLayoutProps {
  element: React.ReactNode;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ element }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-stone-50">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
        <div className="shrink-0 p-4">
          <Navbar />
        </div>
        <main className="flex-1 p-4">{element}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MasterLayout;
