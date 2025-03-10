import React from "react";
import {Box, Button, Container, Grid2 as Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useGetEvents from "../hooks/useGetEvents/useGetEvents";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import GetStartedButton from "../components/GetStartedButton/GetStartedButton";
import Logo from '../../public/logo.png'
import EventsList from "../components/EventsList/EventsList"
import {useAuth} from "../hooks/useAuth/useAuth";

const Home = () => {
    const { latestEvents, loading, error } = useGetEvents();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();


    return (
        <Grid container spacing={3} >
            {isAuthenticated ? (
                <Grid size={12}>
                    <Container disableGutters maxWidth={false}>
                        <Box sx={{ py: 4 }}>
                            <Box >
                                <EventsList events={latestEvents} navigate={navigate}/>
                            </Box>
                        </Box>
                    </Container>
                </Grid>
            ) : (
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
            )}
        </Grid>
    );
};

export default Home;
