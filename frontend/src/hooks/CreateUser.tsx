import { useState } from "react";
import axios from "axios";

interface User {
    forename: string,
    surname: string,
    dob: Date,
    street: string,
    city: string,
    county: string,
    postcode: string,
    contactNumber: Number,
    fishingLicense: string,
    username: string,
    email: string,
    password: string,
}

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