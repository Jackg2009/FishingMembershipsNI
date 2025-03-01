import {useAuth} from "../hooks/useAuth";
import React, {ReactElement} from "react";
import {Navigate} from "react-router-dom";

type ProtectedRouteProps = { children: ReactElement }

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
	const {isAuthenticated} = useAuth();

	return isAuthenticated ? children : <Navigate to="/signin" replace/>;
};

export default ProtectedRoute;