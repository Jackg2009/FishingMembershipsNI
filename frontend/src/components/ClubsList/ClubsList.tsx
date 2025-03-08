import React from 'react';
import {
    TextField,
    InputAdornment,
    Card, CardHeader, CardContent, Grid2 as Grid, Box, Typography, CardMedia
} from '@mui/material';
import {Search} from '@mui/icons-material';
import {Club} from "../../types/club"
import Logo from "../../../public/logo.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

interface ClubsListProps {
    clubs: Club[];
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    navigate: (path: string) => void;
}

const ClubsList: React.FC<ClubsListProps> = ({clubs, searchTerm, setSearchTerm, navigate}) => {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredClubs = clubs.filter(
        (club) =>
            club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            club.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Grid container spacing={6} sx={{px: 10, py: 10}} >
            <Grid size={{xs: 12}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search clubs by name or location..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{mb: 2}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            {filteredClubs.map((club) => (
                <Grid size={{xs: 4}}>
                    <Card
                        sx={{
                            height: 400,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            p: 2,
                            boxShadow: 3,
                            borderRadius: 2,
                            transition: "transform 0.2s",
                            "&:hover": { transform: "scale(1.02)" },
                            cursor: "pointer",
                            alignItems: 'center',
                        }}
                    >
                        <CardHeader
                            title={club.name}
                            component="th"
                            scope="row"
                            sx={{color: 'lightblue', cursor: 'pointer'}}
                            onClick={() => navigate('/clubs/' + club.id)}
                        >
                            {club.name}
                        </CardHeader>
                        <CardContent>
                            <CardMedia
                                sx={{
                                    width: 250,
                                    height: 250,
                                    backgroundImage: `url(${club.clubLogo ? club.clubLogo : Logo})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 1,
                                    mb: 2,
                                }}
                            />
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                {club.name}
                            </Typography>
                            <Typography variant="body1">
                                <LocationOnIcon sx={{ mr: 1 }} />
                                {club.location}
                            </Typography>
                            <Typography variant="body1">
                                <PhoneIcon sx={{ mr: 1 }} />
                                {club.telephone}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 3 }}>
                                {club.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ClubsList;
