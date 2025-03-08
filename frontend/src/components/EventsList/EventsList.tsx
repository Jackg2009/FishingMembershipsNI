import {Box, Grid2 as Grid, Typography} from "@mui/material";
import Logo from "../../../public/logo.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import React from "react";
import {FishingEvent} from "../../types/event";

interface EventsListProps {
    events: FishingEvent[];
    navigate: (path: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({events, navigate}) => {

    return (
        <Grid container spacing={3} alignItems="center" justifyContent="space-between">
            {events && events.length > 0 ? (
                events.map((event: FishingEvent) => (
                    <Grid size={{xs: 12, sm: 6, md:4}} key={event.id}>
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
                <Grid size={{xs: 12}}>
                    <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                        No events available at the moment.
                    </Typography>
                </Grid>
            )}
        </Grid>

    );
};

export default EventsList;
