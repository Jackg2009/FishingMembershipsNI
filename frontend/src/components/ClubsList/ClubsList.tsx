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
        <Grid container spacing={6} sx={{px: 10, py: 10}}>
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
                        onClick={() => navigate('/clubs/' + club.id)}
                        sx={{
                            height: 500,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            p: 2,
                            boxShadow: 3,
                            borderRadius: 2,
                            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: "0px 20px 40px rgba(0,0,0,0.1)",
                            },
                            cursor: "pointer",
                            textAlign: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CardHeader
                            title={club.name}
                            component="th"
                            scope="row"
                            sx={{
                                color: 'lightblue',
                                cursor: 'pointer',
                                textAlign: 'center',
                            }}
                        >
                            {club.name}
                        </CardHeader>
                        <CardContent sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            overflow: 'hidden',
                        }}>
                            <CardMedia
                                component="img"
                                image={club.clubLogo ? club.clubLogo : Logo}
                                sx={{
                                    width: 150,
                                    height: 150,
                                    objectFit: 'contain',
                                    borderRadius: '50%',
                                    mb: 2,
                                }}
                            />
                            <Typography variant="h5" sx={{mb: 2}}>
                                {club.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    textAlign: 'center',
                                }}>
                                {club.name}
                                <br/>
                                <LocationOnIcon sx={{mr: 1}}/>
                                {club.location}
                                <br/>
                                <PhoneIcon sx={{mr: 1}}/>
                                {club.telephone}
                                <br/>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: '-webkit-box', // Required for line clamping
                                        WebkitBoxOrient: 'vertical', // Specifies the vertical direction
                                        overflow: 'hidden', // Hide overflow
                                        WebkitLineClamp: 3, // Limit the number of lines before truncation (adjust as needed)
                                        textOverflow: 'ellipsis', // Show ellipsis
                                        marginTop: 1, // Adds space between items
                                    }}
                                >
                                    {club.description}
                                </Typography>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ClubsList;
