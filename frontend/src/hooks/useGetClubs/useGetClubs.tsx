import { useState, useEffect } from 'react';
import axios from 'axios';
import { Club } from '../../types';

const useGetClubs = () => {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('user_token'); // Get token from localStorage
        if (!token) {
            setError('No token found');
            setLoading(false);
            return;
        }

        axios
            .get('http://localhost:4000/api/clubs/', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Send token in the Authorization header
                }
            })
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

export default useGetClubs;
