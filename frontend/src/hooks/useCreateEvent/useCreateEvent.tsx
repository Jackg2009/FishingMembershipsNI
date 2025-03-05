import { useState } from 'react';
import axios from 'axios';

// Define the expected structure of the event data
interface CreateEventData {
    clubId: string;
    name: string;
    date: string;
    isPrivate: boolean;
}

// Define the hook return type
interface UseCreateEventReturn {
    createEvent: (eventData: CreateEventData) => Promise<any>;
    loading: boolean;
    error: string | null;
}

const useCreateEvent = (): UseCreateEventReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function to create an event
    const createEvent = async ({ clubId, name, date, isPrivate }: CreateEventData) => {
        setLoading(true);
        setError(null); // Reset the error state before the request

        try {
            // Send the request to create the event
            const response = await axios.post(`/api/clubs/${clubId}/events`, {
                name,
                date,
                isPrivate,
            });

            // Return the event data upon success
            setLoading(false);
            return response.data;
        } catch (err: any) {
            setLoading(false);
            // Handle error and set an error message
            setError(err.response?.data?.message || 'Something went wrong');
            throw err; // Propagate the error for the component to handle
        }
    };

    return {
        createEvent,
        loading,
        error,
    };
};

export default useCreateEvent;
