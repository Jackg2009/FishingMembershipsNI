import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Avatar, Paper, Box, Divider, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import { IUser, useAuth } from '../../hooks/useAuth/useAuth';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import useUpdateProfile from "../../hooks/useUpdateProfile/useUpdateProfile";

const Profile = () => {
	const { user, fetchUserData } = useAuth();
	const { updateProfile } = useUpdateProfile();
	const [isEditing, setIsEditing] = useState(false);
	const [editedUser, setEditedUser] = useState<IUser | null>(null); // State initialized to null

	// Only initialize editedUser if user data exists
	useEffect(() => {
		if (user && !editedUser) {
			setEditedUser({ ...user });
		}
	}, [user, editedUser]);

	if (!user) return null;

	// Function to toggle between edit and save mode
	const handleEditClick = () => {
		if (isEditing) {
			handleSave();
		} else {
			setIsEditing(true);
		}
	};

	// Update editedUser on field change
	const handleInputChange = (field: string, value: string | number) => {
		if (editedUser) {
			setEditedUser({
				...editedUser,
				[field]: value,
			});
		}
	};

	// Save the updated user data
	const handleSave = async () => {
		if (!editedUser) return;

		try {
			// Ensure that dob is correctly parsed
			const updatedUser = {
				...editedUser,
				dob: typeof editedUser.dob === "string" ? new Date(editedUser.dob) : editedUser.dob,
			};

			console.log('Saving updated user:', updatedUser);

			// Call updateProfile with the updated data
			await updateProfile(updatedUser);

			// Fetch the updated user data after saving
			await fetchUserData();

			setIsEditing(false);
			console.log('User saved successfully!');
		} catch (error) {
			console.error('Error saving user:', error);
		}
	};

	// Show the user data based on whether we are editing or not
	const displayUser = isEditing ? editedUser : user;

	return (
		<Container maxWidth="md">
			<Paper elevation={3} sx={{ padding: 3, marginTop: 3, position: 'relative' }}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Button
							variant="outlined"
							startIcon={<EditIcon />}
							onClick={handleEditClick}
							sx={{ position: 'absolute', top: 16, right: 16 }}
						>
							{isEditing ? 'Save' : 'Edit'}
						</Button>
					</Grid>
					<Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
						<Avatar
							sx={{
								width: 100,
								height: 100,
								margin: '0 auto',
							}}
							alt={displayUser?.forename}
						/>
						{isEditing ? (
							<>
								<TextField
									fullWidth
									label="Forename"
									value={displayUser?.forename || ''}
									onChange={(e) => handleInputChange('forename', e.target.value)}
									sx={{ mt: 2 }}
								/>
								<TextField
									fullWidth
									label="Surname"
									value={displayUser?.surname || ''}
									onChange={(e) => handleInputChange('surname', e.target.value)}
									sx={{ mt: 2 }}
								/>
								<TextField
									fullWidth
									label="Date of Birth"
									value={moment(displayUser?.dob).format('DD/MM/YYYY') || ''}
									onChange={(e) => handleInputChange('dob', e.target.value)}
									sx={{ mt: 2 }}
								/>
							</>
						) : (
							<>
								<Typography variant="h5" sx={{ mt: 2 }}>
									{`${displayUser?.forename} ${displayUser?.surname}`}
								</Typography>
								<Typography variant="subtitle1" color="text.secondary">
									{moment(displayUser?.dob).format('DD/MM/YYYY')}
								</Typography>
							</>
						)}
					</Grid>

					<Grid item xs={12} md={8}>
						<Box>
							<List dense>
								<ListItem>
									{isEditing ? (
										<TextField
											fullWidth
											label="License Number"
											value={displayUser?.fishingLicense || ''}
											onChange={(e) => handleInputChange('fishingLicense', e.target.value)}
										/>
									) : (
										<ListItemText primary="License Number" secondary={displayUser?.fishingLicense} />
									)}
								</ListItem>
							</List>

							<Divider sx={{ my: 1 }} />

							<List dense>
								<ListItem>
									{isEditing ? (
										<TextField
											fullWidth
											label="Email"
											value={displayUser?.email || ''}
											onChange={(e) => handleInputChange('email', e.target.value)}
										/>
									) : (
										<ListItemText primary="Email" secondary={displayUser?.email} />
									)}
								</ListItem>
								<ListItem>
									{isEditing ? (
										<TextField
											fullWidth
											sx={{ mt: 1 }}
											label="Contact Number"
											value={displayUser?.contactNumber || ''}
											onChange={(e) => handleInputChange('contactNumber', e.target.value)}
										/>
									) : (
										<ListItemText primary="Contact Number" secondary={displayUser?.contactNumber} />
									)}
								</ListItem>
							</List>
						</Box>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default Profile;
