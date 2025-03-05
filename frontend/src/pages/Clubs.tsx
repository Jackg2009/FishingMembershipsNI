import React, {useState} from 'react';
import {Grid2 as Grid, Container, Paper, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth/useAuth';
import useGetClubs from '../hooks/useGetClubs/useGetClubs';
import ClubsList from '../components/ClubsList/ClubsList';
import CreateClubForm from '../components/CreateClubForm/CreateClubForm';
import LoadingError from '../components/LoadingError/LoadingError';

const Clubs: React.FC = () => {
    const navigate = useNavigate();
    const {clubs, loading, error} = useGetClubs();
    const {user} = useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Handle club creation logic here
    };

    return (
        <>
            <LoadingError loading={loading} error={error}/>
            <Grid container spacing={2} sx={{py: 5}}>
                {/* Club List */}
                <Grid size={{xs: 12}}>
                    <Typography variant="h3" gutterBottom sx={{textAlign: 'center'}}>
                        Find a club
                    </Typography>

                    <ClubsList
                        clubs={clubs}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        navigate={navigate}
                    />
                </Grid>

                {/* Create Club Form (visible only for admin users) */}
                {user?.isAdmin && (
                    <Grid size={{xs: 4}}>
                        <CreateClubForm handleSubmit={handleSubmit} setName={setName} setDescription={setDescription}/>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default Clubs;
