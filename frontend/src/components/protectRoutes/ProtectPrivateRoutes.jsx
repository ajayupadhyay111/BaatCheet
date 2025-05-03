import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";

const ProtectRoute = () => {
  const {isUser} =useSelector((state) => state.user);

  return isUser ? (
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
