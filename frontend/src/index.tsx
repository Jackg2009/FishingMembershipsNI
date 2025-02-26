import React, {ReactElement} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import {AppProvider} from "@toolpad/core/AppProvider";
import {GoogleOAuthProvider} from '@react-oauth/google';
import SignIn from "./pages/SignIn";
import Clubs from "./pages/Clubs";
import SignUp from "./pages/SignUp";
import Landing from './pages/Landing';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from "./pages/User/Profile";
import theme from './theme/theme';
import {ThemeProvider} from "@mui/material";
import Club from "./pages/Club";


ReactDOM.createRoot(document.getElementById('root')!).render(
	<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
		<React.StrictMode>
			<AppProvider>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Layout/>}>
								<Route index element={<Landing/>}/>
								<Route path="signin" element={<SignIn/>}/>
								<Route path="signup" element={<SignUp/>}/>
								<Route path="profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
								<Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
								<Route path="clubs" element={<ProtectedRoute><Clubs/></ProtectedRoute>}/>
								<Route path="clubs/:clubId" element={<ProtectedRoute><Club/></ProtectedRoute>}/>
							</Route>
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</AppProvider>
		</React.StrictMode>
	</GoogleOAuthProvider>
);