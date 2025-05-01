import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const ProtectRoute = () => {
  let user = true;
  return user ? (
    <>
    <div className="">
    <Navbar />
    </div>
    <div className="max-w-4xl mx-auto mt-20">
      <Outlet />
    </div>
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectRoute;
