import React from "react";
import {Box, Button, Container, Grid2 as Grid, Typography} from "@mui/material";
import {themeColors} from "../theme/styles";
import {useNavigate} from "react-router-dom";


const Landing = () => {
    const navigate = useNavigate();
    return (
        <Grid container spacing={3} sx={{bgcolor: themeColors.fishing.dark}}>
            <Grid size={{xs: 12}}>
                <Box sx={{bgcolor: themeColors.fishing.dark, color: "white", py: 8, textAlign: "center"}}>
                    <Container>
                        <Typography variant="h3" gutterBottom>
                            Welcome to Fishing Memberships NI
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Find a club near you!
                        </Typography>
                        <Button variant="contained" color="primary" size="large" sx={{mt: 3}} onClick={() => navigate('/signin')}>
                            Get Started
                        </Button>
                    </Container>
                </Box>
            </Grid>
            
            <Grid size={{xs: 12}}>
                <Container disableGutters maxWidth={false} sx={{margin: 'auto', bgcolor: themeColors.fishing.main}}>
                    <Box sx={{py: 8}}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Features
                        </Typography>
                        <Box sx={{ml: 5, mr: 5}}>
                            <Grid container spacing={3} alignItems={'center'} justifyContent="space-between">
                                {[1, 2, 3].map((feature) => (
                                    <Grid size={{xs: 12, sm: 6, md: 4}} key={feature}>
                                        <Box sx={{p: 4, textAlign: "center", borderRadius: 2, boxShadow: 3}}>
                                            <Typography variant="h5">Feature {feature}</Typography>
                                            <Typography variant="body1" sx={{mt: 1}}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Grid>
            
            <Grid size={{xs: 12}}>
                <Box sx={{bgcolor: "grey.900", color: "white", py: 3, mt: 3.3, textAlign: "center"}}>
                    <Container>
                        <Typography variant="body2">© {new Date().getFullYear()} Fishing Memberships NI</Typography>
                    </Container>
                </Box>
            </Grid>
        
        </Grid>
    );
};

export default Landing;
