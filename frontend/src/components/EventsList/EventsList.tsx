import {Box, Card, CardContent, CardHeader, CardMedia, Grid2 as Grid, Typography} from "@mui/material";
import Logo from "../../../public/logo.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import React, {useEffect, useState} from "react";
import {FishingEvent} from "../../types/event";
import {useNavigate} from "react-router-dom";
import API from "../../utils/axios";

interface EventsListProps {
    events: FishingEvent[];
    navigate: (path: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({events, navigate}) => {

    return (
        <Grid container spacing={6} sx={{px: 10, py: 10}} alignItems="center" justifyContent="space-between">
            <Grid size={{xs: 12}} >
                <Typography variant="h4" align="center" gutterBottom>
                    Upcoming Events
                </Typography>
            </Grid>
            {events && events.length > 0 ? (
                events.map((event: FishingEvent) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={event.id}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: 3,
                                borderRadius: 2,
                                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: "0px 20px 40px rgba(0,0,0,0.1)",
                                },
                                cursor: "pointer",
                                textAlign: 'center',
                                height: 430, // Fixed height for the card
                            }}
                        >
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                overflow: 'hidden',
                            }}>
                                <CardHeader
                                    title={event.eventName}
                                    sx={{
                                        color: 'lightblue',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        p: 2,
                                    }}
                                />
                                <CardMedia
                                    component="img"
                                    image={event.image ? event.image : Logo}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        objectFit: 'contain',
                                        borderRadius: '50%',
                                        mb: 2,
                                    }}
                                />
                                <Typography variant="body1">
                                    <LocationOnIcon sx={{mr: 1}}/>
                                    {event.location}
                                </Typography>
                                <Typography variant="body1">
                                    <PhoneIcon sx={{mr: 1}}/>
                                    {event.telephone}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 2,
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        WebkitLineClamp: 3,
                                        textOverflow: 'ellipsis',
                                        maxWidth: '100%',
                                    }}
                                >
                                    {event.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Grid size={{xs: 12}}>
                    <Typography variant="h4" sx={{textAlign: 'center'}}>
                        Log in to view upcoming events!
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default EventsList;
