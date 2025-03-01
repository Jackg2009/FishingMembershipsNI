import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Container, Paper, Typography, Grid, Card, CardContent, Avatar, Button, Skeleton } from '@mui/material';
import { LocationOn, People, AssignmentInd } from '@mui/icons-material';
import getClubs from '../hooks/GetClubs';
import { useAuth } from "../hooks/useAuth";
import useGetApplications from '../hooks/useGetApplications';

const Club = () => {
	const { clubId } = useParams();
	const navigate = useNavigate();
	const { clubs, loading, error } = getClubs();
	const { user } = useAuth(); // Get user info
	const { applied, applying, handleApply, error: applicationError } = useGetApplications(user, clubId);

	const club = clubs.find((club) => club._id === clubId);

	if (loading) return <Skeleton variant={'rectangular'} width={'100%'} height={'100vh'} />;
	if (error) return <div>Error: {error.message}</div>;
	if (!club) return <div>Error: Club not found</div>;

	return (
		<Container maxWidth="md" sx={{ mt: 5 }}>
			<Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
				{/* Back to Clubs Button */}
				<Button variant="outlined" onClick={() => navigate('/clubs')} sx={{ mb: 2 }}>
					Back to clubs
				</Button>

				{/* Club Name & Description */}
				<Typography variant="h4" gutterBottom textAlign="center">{club.name}</Typography>
				<Typography variant="subtitle1" color="text.secondary" textAlign="center">{club.description}</Typography>

				{/* Location */}
				<Grid container alignItems="center" sx={{ mt: 2, justifyContent: "center" }}>
					<LocationOn color="primary" />
					<Typography variant="h6" sx={{ ml: 1 }}>{club.location || "No location specified"}</Typography>
				</Grid>

				{/* Members & Committee */}
				<Grid container spacing={3} sx={{ mt: 4 }}>
					{/* Current Members */}
					<Grid item xs={12} md={6}>
						<Card elevation={2} sx={{ borderRadius: 2 }}>
							<CardContent>
								<Typography variant="h6" gutterBottom>
									<People /> Current Members
								</Typography>
								{club.members?.length > 0 ? (
									club.members.map((member) => (
										<Grid container alignItems="center" sx={{ mt: 1 }} key={member.id}>
											<Avatar sx={{ mr: 1 }}>{member.name.charAt(0)}</Avatar>
											<Typography>{member.name}</Typography>
										</Grid>
									))
								) : (
									<Typography color="text.secondary">No members yet</Typography>
								)}
							</CardContent>
						</Card>
					</Grid>

					{/* Committee Members */}
					<Grid item xs={12} md={6}>
						<Card elevation={2} sx={{ borderRadius: 2 }}>
							<CardContent>
								<Typography variant="h6" gutterBottom>
									<AssignmentInd /> Committee Members
								</Typography>
								{club.committee?.length > 0 ? (
									club.committee.map((member) => (
										<Grid container alignItems="center" sx={{ mt: 1 }} key={member.id}>
											<Avatar sx={{ mr: 1 }}>{member.name.charAt(0)}</Avatar>
											<Typography>{member.name} - {member.role}</Typography>
										</Grid>
									))
								) : (
									<Typography color="text.secondary">No committee members listed</Typography>
								)}
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				{/* Apply Button (Disabled if Already Applied) */}
				{user && (
					<Button
						variant="contained"
						color="primary"
						sx={{ display: 'block', margin: '20px auto' }}
						onClick={handleApply}
						disabled={applied || applying} // Disable if applied or submitting
					>
						{applied ? "Applied" : applying ? "Applying..." : "Apply to Join"}
					</Button>
				)}
			</Paper>
		</Container>
	);
}

export default Club;
