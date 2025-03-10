import {useCallback, useState} from "react";
import {jwtDecode, JwtPayload} from "jwt-decode";

export interface IUser extends JwtPayload {
	email: string
	id: string
	forename: string,
	surname: string,
	dob: Date,
	contactNumber: number,
	fishingLicense: string,
	isAdmin: boolean,
}

export function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [user, setUser] = useState<IUser | null>(null);
	
	const isUserLoggedIn = useCallback(() => {
		return !!localStorage.getItem('user_token')
	}, [isAuthenticated])

	const login = async (email: string, password: string) => {
		setLoading(true);
		setError(null); // Reset previous error
		
		try {
			// @ts-ignore
			const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({email, password}),
			});
			
			const data = await response.json();
			if (!response.ok) {
				setError(data.message || 'Something went wrong');
				setLoading(false);
				return {success: false, message: data.message || 'Something went wrong'};
			}
			
			localStorage.setItem('user_token', data.token);
			localStorage.setItem('refreshToken', data.refreshToken);
			setIsAuthenticated(true);
			setLoading(false);
			return {success: true};
		} catch (err) {
			console.error("Error during login:", err);
			setError('Error logging in. Please try again.');
			setLoading(false);
			return {success: false, message: 'Error logging in'};
		}
	};
	
	const logout = () => {
		console.log("LOGGING OUT")
		setIsAuthenticated(false);
		localStorage.removeItem('user_token');
		localStorage.removeItem('refreshToken');

		// Broadcast logout event to all tabs
		localStorage.setItem('logout-event', Date.now().toString());
	};

	// Fetch user data from backend
	const fetchUserData = async () => {
		setLoading(true);
		setError(null); // Reset previous error

		try {
			const token = localStorage.getItem('user_token');
			if (!token) {
				setError("No token found");
				return;
			}

			const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});

			const data = await response.json();
			if (!response.ok) {
				setError(data.message || 'Failed to fetch user data');
			} else {
				setUser(data); // Update user state with the new data
			}
		} catch (err) {
			console.error("Error fetching user data:", err);
			setError('Error fetching user data');
		} finally {
			setLoading(false);
		}
	};

	// Fetch user data if logged in
	const userFromToken: IUser | null = isUserLoggedIn() ? jwtDecode<IUser>(localStorage.getItem('user_token') as string) : null;

	// Set user state if the user is logged in (This should be done only on initial load)
	if (!user && userFromToken) {
		setUser(userFromToken);
	}
	
	return {isAuthenticated: isUserLoggedIn(), login, logout, error, loading, user, fetchUserData};
}