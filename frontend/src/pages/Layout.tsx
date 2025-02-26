import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../components/HeaderBar/HeaderBar";

const Layout = () => {
    return (
        <>
            <AppBar/>
            <Outlet/>
        </>
    )
};

export default Layout;