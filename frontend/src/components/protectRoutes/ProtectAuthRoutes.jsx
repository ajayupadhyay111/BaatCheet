import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectAuthRoutes = () => {
  const { isUser } = useSelector((state) => state.user);

  return isUser ? <Navigate to={"/"} /> : <Outlet />;
};

export default ProtectAuthRoutes;
