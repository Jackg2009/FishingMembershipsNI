import React, { useState } from 'react';
import {
	Container,
	Grid2 as Grid,
	Typography,
	Avatar,
	Paper,
	Box,
	Divider,
	List,
	ListItem,
	ListItemText,
	Button,
	TextField,
} from '@mui/material';
import {IUser, useAuth} from '../../hooks/useAuth';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
	const { user } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [editedUser, setEditedUser] = useState<IUser>({
		id: '',
		email: '',
		forename: '',
		surname: '',
		dob: '',
		contactNumber: 0,
		fishingLicense: 0,
		isAdmin: false,
	});
	
	if (!user) return null;
	
	const handleEditClick = () => {
		if (!isEditing) {
			setEditedUser({ ...user });
			setIsEditing(true);
		} else {
			handleSave()
		}
	};
	
	const handleInputChange = (field: string, value: string | number) => {
		setEditedUser({
			...editedUser,
			[field]: value,
		});
	};
	
	const handleSave = () => {
		console.log('Saving updated user:', editedUser);
		// Add your save logic here (e.g., API call)
		setIsEditing(false);
	};
	
	const displayUser = isEditing ? editedUser : user;
	
	return (
		<Container maxWidth="md">
			<Paper
				elevation={3}
				sx={{
					padding: 3,
					marginTop: 3,
					position: 'relative',
				}}
			>
			
				
				<Grid container spacing={3}>
					<Grid size={{xs: 12}}>
						<Button
							variant="outlined"
							startIcon={<EditIcon />}
							onClick={handleEditClick}
							sx={{
								position: 'absolute',
								top: 16,
								right: 16,
							}}
						>
							{isEditing ? 'Save' : 'Edit'}
						</Button>
					</Grid>
					<Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
						<Avatar
							sx={{
								width: 100,
								height: 100,
								margin: '0 auto',
							}}
							alt={displayUser?.forename}
							// src={displayUser?.avatarUrl}
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
					
					<Grid size={{ xs: 12, md: 8 }}>
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
										<ListItemText primary="Licnese Number" secondary={displayUser?.fishingLicense} />
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
											sx={{mt:1}}
											label="Contact Number"
											value={displayUser?.contactNumber || ''}
											onChange={(e) => handleInputChange('contactNumber', e.target.value)}
										/>
									) : (
										<ListItemText
											primary="Contact Number"
											secondary={displayUser?.contactNumber}
										/>
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