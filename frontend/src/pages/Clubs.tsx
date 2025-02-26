import React, {useEffect, useState} from 'react'
import {
	Button, FormControl, InputAdornment, Paper, Skeleton, Table, TableBody,
	TableCell, TableContainer, TableHead, TableRow, TextField
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import getClubs from '../hooks/GetClubs';
import useCreateClub from "../hooks/CreateClub";
import {Search} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const Clubs = () => {
	const navigate = useNavigate();
	const {clubs, loading, error} = getClubs(); // Call the hook
	const {createClub} = useCreateClub();
	const {user} = useAuth();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [applyingClub, setApplyingClub] = useState<string | null>(null); // Track which club is being applied to.
	const [clubApplications, setClubApplications] = useState<string[]>([]);

	
	const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
		setSearchTerm(event.target.value);
	};
	
	const filteredClubs = clubs.filter(
		(club) =>
			club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			club.description.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Fetch user's club applications
	useEffect(() => {
		if (user) {
			fetch(`${import.meta.env.VITE_API_URL}/user/applications`, {
				headers: { Authorization: `Bearer ${localStorage.getItem("user_token")}` },
			})
				.then((res) => res.json())
				.then((data) => setClubApplications(data.applications || []))
				.catch((err) => console.error("Error fetching applications:", err));
		}
	}, [user]);

	const handleApply = async (clubId: string) => {
		if (!user) {
			alert("You need to be logged in to apply!");
			return;
		}

		setApplyingClub(clubId);

		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/clubs/apply`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("user_token")}`,
				},
				body: JSON.stringify({ clubId }),
			});

			const data = await response.json();
			if (response.ok) {
				alert("Application submitted successfully!");
				// Optionally update state to disable the button
				setClubApplications((prev) => [...prev, clubId]);
			} else {
				alert(data.message || "Failed to apply. Please try again.");
			}
		} catch (err) {
			console.error("Error applying to club:", err);
			alert("Error applying to club. Please try again.");
		} finally {
			setApplyingClub(null);
		}
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		try {
			const newClub = await createClub({name, description});
			console.log('Club added successfully:', newClub);
		} catch (error) {
			console.error('Error adding club:', error);
		}
	};

	// Show loading state
	if (loading) {
		return <Skeleton variant={'rectangular'} width={'100%'} height={'100vh'} />;
	}

	// Show error state
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	
	return (
		<>
			<Grid container spacing={2}>
				<Grid size={8}>
					<Container maxWidth={false}>
						<Paper elevation={3} sx={{padding: 3, marginTop: 5}}>
							<Typography variant="h5" gutterBottom sx={{textAlign: 'center'}}>Clubs</Typography>
							
							
							<TextField
								fullWidth
								variant="outlined"
								placeholder="Search clubs by name or location..."
								value={searchTerm}
								onChange={handleSearchChange}
								sx={{mb: 2}}
								slotProps={{
									input: {
										startAdornment: (
											<InputAdornment position="start">
												<Search/>
											</InputAdornment>
										)
									}
								}}
							/>
							
							<TableContainer component={Paper}>
								<Table sx={{minWidth: 650}} aria-label="clubs table">
									<TableHead>
										<TableRow>
											<TableCell>
												<Typography variant="subtitle2">Name</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="subtitle2">Description</Typography>
											</TableCell>
											<TableCell>
												<Button>Join Club</Button>
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
												<TableCell>
													{/* Disable Apply button if the user is already applying or has already applied */}
													<Button
														variant="contained"
														color="primary"
														onClick={() => handleApply(club._id)}
														disabled={applyingClub === club._id} // Disable if applying to this club
													>
														{applyingClub === club._id ? 'Applying...' : 'Apply'}
													</Button>
												</TableCell>
											</TableRow>
										))}
										{filteredClubs.length === 0 && (
											<TableRow>
												<TableCell colSpan={3} align="center">
													<Typography variant="body2">
														{filteredClubs.length === 0 ? 'No clubs available' : 'No clubs match your search'}
													</Typography>
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
							
							
							{/*<Autocomplete*/}
							{/*	disablePortal*/}
							{/*	options={clubs}*/}
							{/*	getOptionLabel={(option) => `${option.name} ${option.description}`}*/}
							{/*	renderInput={(params) => <TextField {...params} label="Fishing Clubs"/>}*/}
							{/*/>*/}
						</Paper>
					</Container>
				</Grid>
				<Grid size={4}>
					<Container maxWidth={false} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<Paper elevation={3} sx={{padding: 3, width: '100%', marginTop: 5}}>
							<Typography variant="h5" align="center" gutterBottom>Add Club</Typography>
							<FormControl fullWidth>
								<TextField
									id="outlined-basic"
									label="Club Name"
									variant="outlined"
									margin="normal"
									fullWidth
									onChange={(event) => setName(event.target.value)} // Add this line
								/>
								<TextField
									id="outlined-multiline-flexible"
									label="Description"
									multiline
									rows={4}
									variant="outlined"
									margin="normal"
									fullWidth
									onChange={(event) => setDescription(event.target.value)} // Add this line
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

export default Clubs