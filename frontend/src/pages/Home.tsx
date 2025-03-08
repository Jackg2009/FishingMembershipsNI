import React from "react";
import {Box, Button, Container, Grid2 as Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useGetEvents from "../hooks/useGetEvents/useGetEvents";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import GetStartedButton from "../components/GetStartedButton/GetStartedButton";
import Logo from '../../public/logo.png'
import EventsList from "../components/EventsList/EventsList"

const Home = () => {
    const { latestEvents, loading, error } = useGetEvents();
    const navigate = useNavigate();

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
                            <EventsList events={latestEvents} navigate={navigate}/>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
};

export default Home;
