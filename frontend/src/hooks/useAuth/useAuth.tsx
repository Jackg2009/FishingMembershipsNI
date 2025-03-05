import {useCallback, useState} from "react";
import {jwtDecode, JwtPayload} from "jwt-decode";

export interface IUser extends JwtPayload {
	email: string
	id: string
	forename: string,
	surname: string,
	dob: string,
	contactNumber: number,
	fishingLicense: number,
	isAdmin: boolean,
}

export function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	
	const isUserLoggedIn = useCallback(() => {
		return !!localStorage.getItem('user_token')
	}, [isAuthenticated])
	
	const user: IUser | null = isUserLoggedIn() ? jwtDecode<IUser>(localStorage.getItem('user_token') as string) : null;

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
	};
	
	return {isAuthenticated: isUserLoggedIn(), login, logout, error, loading, user};
}