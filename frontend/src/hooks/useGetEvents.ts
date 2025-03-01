import { useState, useEffect } from 'react';

const useGetEvents = () => {
    const [latestEvents, setLatestEvents] = useState<any[]>([]);
    const [featuredClubs, setFeaturedClubs] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch latest fishing events
        fetch(`${import.meta.env.VITE_API_URL}/events/latest`)
            .then((res) => res.json())
            .then((data) => setLatestEvents(data))
            .catch((err) => {
                console.error('Error fetching events:', err);
                setError('Failed to fetch events');
            });

        // Fetch featured clubs
        fetch(`${import.meta.env.VITE_API_URL}/clubs/featured`)
            .then((res) => res.json())
            .then((data) => setFeaturedClubs(data))
            .catch((err) => {
                console.error('Error fetching clubs:', err);
                setError('Failed to fetch clubs');
            });
    }, []);

    return { latestEvents, featuredClubs, error };
};

export default useGetEvents;
