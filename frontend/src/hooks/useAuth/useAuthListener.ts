import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";

const useAuthListener = () => {

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'logout-event') {
                // Force logout if logout happens in another tab
                window.location.href = '/signin';
            }

            if (event.key === 'token-refreshed') {
                // Reload page to use the new token if it was refreshed
                window.location.reload();
            }
        };

        // Listen for changes across tabs
        window.addEventListener('storage', handleStorageChange);

        // Clean up the listener when component unmounts
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
};

export default useAuthListener;
