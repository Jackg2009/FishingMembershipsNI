import React from "react";
import {Box, Button, Container, Grid2 as Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useGetEvents from "../hooks/useGetEvents/useGetEvents";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import GetStartedButton from "../components/GetStartedButton/GetStartedButton";
import Logo from '../../public/logo.png'

const Home = () => {
    const navigate = useNavigate();
    const { latestEvents, loading, error } = useGetEvents();

    return (
        <Grid container spacing={3} >
            <Grid size={12}>
                <Box sx={{ textAlign: "center", pt:10}}>
                    <Container>
                        <Typography variant="h3" gutterBottom>
                            Welcome to Fishing Memberships NI
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Find a club near you!
                        </Typography>
                        <GetStartedButton />
                    </Container>
                </Box>
            </Grid>

            <Grid size={12}>
                <Container disableGutters maxWidth={false}>
                    <Box sx={{ py: 8 }}>
                        <Typography variant="h4" align="center" sx={{ mb: 3 }} gutterBottom>
                            Upcoming Events
                        </Typography>
                        <Box sx={{ ml: 5, mr: 5 }}>
                            <Grid container spacing={3} alignItems={'center'} justifyContent="space-between">
                                {latestEvents && latestEvents.length > 0 ? (
                                    latestEvents.map((event: any) => (
                                        <Grid size={{xs: 12, sm: 6, md:4}} key={event._id}>
                                            <Box
                                                sx={{
                                                    p: 4,
                                                    textAlign: "center",
                                                    borderRadius: 2,
                                                    boxShadow: 3,
                                                    backgroundColor: 'white',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    height: 550, // Fixed height for the entire Box container
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: {
                                                            xs: '100%',
                                                            sm: '100%',
                                                            md: '50%',
                                                        },
                                                        height: 250, // Fixed height for the image container
                                                        backgroundImage: `url(${event.image ? event.image : Logo})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        borderRadius: 1,
                                                        mb: 2,
                                                    }}
                                                />
                                                <Typography variant="h5" sx={{ mb: 2 }}>
                                                    {event.eventName}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <LocationOnIcon sx={{ mr: 1 }} />
                                                    {event.location}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <PhoneIcon sx={{ mr: 1 }} />
                                                    {event.telephone}
                                                </Typography>
                                                <Typography variant="body1" sx={{ mt: 3 }}>
                                                    {event.description}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))
                                ) : (
                                    <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                                        {error ? (typeof error === 'object' ? error.message : error) : "No events available at the moment."}
                                    </Typography>
                                )}
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
};

export default Home;
