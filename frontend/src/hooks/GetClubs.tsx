import { useState, useEffect } from 'react';
import axios from 'axios';

interface Club {
    _id: string;
    name: string;
    description: string;
}

const useClubs = () => {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/clubs/')
            .then(response => {
                setClubs(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return { clubs, loading, error };
};

export default useClubs;