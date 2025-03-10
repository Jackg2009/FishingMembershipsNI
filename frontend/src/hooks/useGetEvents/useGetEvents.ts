import { useState, useEffect } from 'react';
import API from "../../utils/axios";

const useGetEvents = () => {
    const [latestEvents, setLatestEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('user_token'); // Get token from localStorage
        if (!token) {
            setError('No token found');
            setLoading(false);
            return;
        }

        API.get('/events/latest', {
            headers: {
                'Authorization': `Bearer ${token}`, // Send token in the Authorization header
            }
        })
        .then(response => {
            setLatestEvents(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    return { latestEvents, loading, error };
};

export default useGetEvents;
