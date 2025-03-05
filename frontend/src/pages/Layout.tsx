import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../components/HeaderBar/HeaderBar";
import Footer from "../components/Footer/Footer";
import theme from "../theme/theme";
import {themeColors} from "../theme/styles";
import {Box} from "@mui/material";

const Layout = () => {
    return (
        <>
            <Box sx={{ display:'flex', flexDirection: 'column', bgcolor: themeColors.fishing.background, minHeight: '100vh' }}>
                <AppBar />
                <Outlet />
                <Footer />
            </Box>
        </>
    )
};

export default Layout;