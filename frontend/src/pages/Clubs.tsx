import React, { useEffect, useState } from 'react';
import {
	Button, FormControl, InputAdornment, Paper, Skeleton, Table, TableBody,
	TableCell, TableContainer, TableHead, TableRow, TextField
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useCreateClub from "../hooks/CreateClub";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useGetClubs from "../hooks/GetClubs";

const Clubs = () => {
	const navigate = useNavigate();
	const { clubs, loading, error } = useGetClubs();
	const { createClub } = useCreateClub();
	const { user } = useAuth();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearchChange = (event: { target: { value: React.SetStateAction<string> } }) => {
		setSearchTerm(event.target.value);
	};

	const filteredClubs = clubs.filter(
		(club) =>
			club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			club.description.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		try {
			const newClub = await createClub({ name, description });
			console.log('Club added successfully:', newClub);
		} catch (error) {
			console.error('Error adding club:', error);
		}
	};

	// Show loading state
	if (loading) {
		return <Skeleton variant="rectangular" width={'100%'} height={'100vh'} />;
	}

	// Show error state
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			<Grid container spacing={2}>
				{/* Club List */}
				<Grid size={8}>
					<Container maxWidth={false}>
						<Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
							<Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>Clubs</Typography>

							<TextField
								fullWidth
								variant="outlined"
								placeholder="Search clubs by name or location..."
								value={searchTerm}
								onChange={handleSearchChange}
								sx={{ mb: 2 }}
								slotProps={{
									input: {
										startAdornment: (
											<InputAdornment position="start">
												<Search />
											</InputAdornment>
										)
									}
								}}
							/>

							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="clubs table">
									<TableHead>
										<TableRow>
											<TableCell>
												<Typography variant="subtitle2">Club Name</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="subtitle2">Location</Typography>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{filteredClubs.map((club) => (
											<TableRow key={club._id}>
												<TableCell
													component="th"
													scope="row"
													sx={{ color: 'lightblue', cursor: 'pointer' }}
													onClick={() => navigate('/clubs/' + club._id)}
												>
													{club.name}
												</TableCell>
												<TableCell sx={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>
													{club.description}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>
					</Container>
				</Grid>

				{/* Create Club Form */}
				<Grid size={4}>
					<Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Paper elevation={3} sx={{ padding: 3, width: '100%', marginTop: 5 }}>
							<Typography variant="h5" align="center" gutterBottom>Add Club</Typography>
							<FormControl fullWidth>
								<TextField
									id="outlined-basic"
									label="Club Name"
									variant="outlined"
									margin="normal"
									fullWidth
									onChange={(event) => setName(event.target.value)}
								/>
								<TextField
									id="outlined-multiline-flexible"
									label="Description"
									multiline
									rows={4}
									variant="outlined"
									margin="normal"
									fullWidth
									onChange={(event) => setDescription(event.target.value)}
								/>
								<Button variant="contained" onClick={handleSubmit}>Add Club</Button>
							</FormControl>
						</Paper>
					</Container>
				</Grid>
			</Grid>
		</>
	);
}

export default Clubs;
