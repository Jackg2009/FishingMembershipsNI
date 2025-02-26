import React, {useState} from 'react'
import {
	Autocomplete, Button, FormControl, InputAdornment, Paper, Skeleton, Table, TableBody,
	TableCell, TableContainer, TableHead, TableRow, TextField
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import getClubs from '../hooks/GetClubs';
import useCreateClub from "../hooks/CreateClub";
import {Search} from "@mui/icons-material";
import {useNavigate, useParams} from "react-router-dom";

const Club = () => {
	const {clubId} = useParams();
	const navigate = useNavigate();
	const {clubs, loading, error} = getClubs(); // Call the hook

	const club = clubs.find((club) => club._id === clubId);

	if (loading) {
		return <Skeleton variant={'rectangular'} width={'100%'} height={'100vh'}/>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if(!club) return <div>Error: Club not found</div>;



	return (
			<Grid container spacing={2}>
				<Grid size={12}>
					<Container maxWidth="md">
						<Paper elevation={3} sx={{padding: 3, marginTop: 5}}>
							<Button onClick={() => navigate('/clubs')}>Back to clubs</Button>
							<Typography variant="h5" gutterBottom sx={{textAlign: 'center'}}>Club {club.name}</Typography>
							<Typography variant="h5" gutterBottom sx={{textAlign: 'center', wordBreak: 'break-all'}}>Club {club.description}</Typography>
						</Paper>
					</Container>
				</Grid>
			</Grid>
	);
}

export default Club