import { useState } from "react";
import API from "../../utils/axios"; // Assuming you have a centralized axios instance
import { User } from "../../types/user"; // Assuming you have a type for User

const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async (updatedUser: Partial<User>) => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('user_token'); // Get token from localStorage

        if (!token) {
            setError('No token found. Please log in again.');
            setLoading(false);
            return;
        }

        // Convert dob to ISO string if it's a Date object
        const updatedUserData = {
            ...updatedUser,
            dob: updatedUser.dob instanceof Date ? updatedUser.dob.toISOString() : updatedUser.dob,
        };

        try {

            const response = await API.put(
                `/users/${updatedUser.id}`,
                updatedUserData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            return response.data;
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateProfile, loading, error };
};

export default useUpdateProfile;
