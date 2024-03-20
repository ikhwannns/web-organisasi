import React from "react";
import SideBar from "../../component/AdminComp/sidebar/leftbar";
import Navbar from "../../component/AdminComp/navbar/navbar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="flex" style={{ minHeight: "100vh" }}>
        <div className="flex">
          <SideBar />
        </div>
        <div className="flex flex-col p-7 w-full bg-slate-300">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
