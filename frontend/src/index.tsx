import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import {AppProvider} from "@toolpad/core/AppProvider";
import Login from "./pages/Login";
import Clubs from "./pages/Clubs";
import Register from "./pages/Register";
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from "./pages/User/Profile";
import theme from './theme/theme';
import {ThemeProvider} from "@mui/material";
import ClubDetails from "./pages/ClubDetails";


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AppProvider>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout/>}>
							<Route index element={<Home/>}/>
							<Route path="signin" element={<Login/>}/>
							<Route path="signup" element={<Register/>}/>
							<Route path="profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
							<Route path="clubs" element={<ProtectedRoute><Clubs/></ProtectedRoute>}/>
							<Route path="clubs/:clubId" element={<ProtectedRoute><ClubDetails/></ProtectedRoute>}/>
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</AppProvider>
	</React.StrictMode>
);