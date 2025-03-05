import React from 'react';
import { Skeleton, Typography } from '@mui/material';

interface LoadingErrorProps {
    loading: boolean;
    error: Error | null;
}

const LoadingError: React.FC<LoadingErrorProps> = ({ loading, error }) => {
    if (loading) {
        return <Skeleton variant="rectangular" width="100%" height="100vh" />;
    }

    if (error) {
        return <Typography color="error">{error.message}</Typography>;
    }

    return null;
};

export default LoadingError;
