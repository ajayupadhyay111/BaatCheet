import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectAuthRoutes = () => {
let user = true;
    return user ? <Navigate to={"/"}/> : <Outlet/>
}

export default ProtectAuthRoutes