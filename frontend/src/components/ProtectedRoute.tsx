import { useAuth } from "../hooks/useAuth/useAuth";
import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = { children: ReactElement };

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation(); // Get the current page URL

	return isAuthenticated ? (
		children
	) : (
		<Navigate to="/signin" replace state={{ from: location }} />
	);
};

export default ProtectedRoute;