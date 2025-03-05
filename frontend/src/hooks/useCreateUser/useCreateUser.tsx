import { useState } from "react";
import axios from "axios";
import {User} from "../../types/user"

const useCreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createUser = async (user: Partial<User>) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.post("http://localhost:4000/api/users", user);
            return data;
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createUser, loading, error };
};

export default useCreateUser;