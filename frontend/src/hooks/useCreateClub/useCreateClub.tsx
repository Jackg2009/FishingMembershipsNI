import { useState } from "react";
import axios from "axios";
import { Club } from "../../types/club"

const useCreateClub = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const createClub = async (club: Club) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/api/clubs', club);
            setLoading(false);
            return response.data;
        } catch (error) {
            setError(error);
            setLoading(false);
            throw error;
        }
    };

    return { createClub, loading, error };
};

export default useCreateClub;