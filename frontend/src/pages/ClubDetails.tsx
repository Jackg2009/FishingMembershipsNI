import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Container, Paper, Typography, Grid2 as Grid, Card, CardContent, Avatar, Button, Skeleton } from '@mui/material';
import { Event, LocationOn, People, AssignmentInd } from '@mui/icons-material';
import getClubs from '../hooks/useGetClubs/useGetClubs';
import { useAuth } from "../hooks/useAuth/useAuth";
import useGetApplications from '../hooks/useGetApplications/useGetApplications';
import EventForm from '../components/EventForm/EventForm';

const ClubDetails = () => {
	const { clubId } = useParams();
	const navigate = useNavigate();
	const { clubs, loading, error } = getClubs();
	const { user } = useAuth();
	const { applied, applying, handleApply } = useGetApplications(user, clubId);

	const club = clubs.find((club) => club.id === clubId);

	if (loading) return <Skeleton variant={'rectangular'} width={'100%'} height={'100vh'} />;
	if (error) return <div>Error: {error.message}</div>;
	if (!club) return <div>Error: Club not found</div>;

	const visibleEvents = club.events?.filter(event => !event.isPrivate || club.members?.some(m => m.id === user?.id)) || [];

	return (
		<Container maxWidth="md" sx={{ mt: 5 }}>
			<Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
				<Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
					<Grid>
						<Button variant="outlined" onClick={() => navigate('/clubs')} sx={{ mb: 2 }}>Back to clubs</Button>
					</Grid>
					<Grid>
						{user && club.committee.some((member) => member.id === user.id) && (
							<Button
								variant="outlined"
								onClick={() => navigate(`/clubs/${clubId}/admin`)}
								sx={{ mb: 2 }}
							>
								Go to Club Admin Page
							</Button>
						)}
					</Grid>
				</Grid>

				<Typography variant="h4" gutterBottom textAlign="center">{club.name}</Typography>
				<Typography variant="subtitle1" color="text.secondary" textAlign="center">{club.description}</Typography>

				<Grid container alignItems="center" sx={{ mt: 2, justifyContent: "center" }}>
					<LocationOn color="primary" />
					<Typography variant="h6" sx={{ ml: 1 }}>{club.location || "No location specified"}</Typography>
				</Grid>

				{/* Members & Committee */}
				<Grid container spacing={3} sx={{ mt: 4 }}>
					<Grid size={{xs: 12, md: 6}}>
						<Card elevation={2} sx={{ borderRadius: 2 }}>
							<CardContent>
								<Typography variant="h6" gutterBottom><People /> Current Members</Typography>
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

					<Grid size={{xs: 12, md: 6}}>
						<Card elevation={2} sx={{ borderRadius: 2 }}>
							<CardContent>
								<Typography variant="h6" gutterBottom><AssignmentInd /> Committee Members</Typography>
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

				{/* Events Section */}
				<Typography variant="h5" sx={{ mt: 4 }}>
					<Event sx={{ verticalAlign: 'middle', mr: 1 }} /> Events
				</Typography>

				{visibleEvents.length > 0 ? (
					visibleEvents.map((event) => (
						<Card key={event._id} sx={{ mt: 2 }}>
							<CardContent>
								<Typography variant="h6">{event.name}</Typography>
								<Typography color="text.secondary">{new Date(event.date).toDateString()}</Typography>
								<Typography color={event.isPrivate ? "error" : "primary"}>
									{event.isPrivate ? "Private Event" : "Public Event"}
								</Typography>
							</CardContent>
						</Card>
					))
				) : (
					<Typography color="text.secondary" sx={{ mt: 2 }}>No events scheduled.</Typography>
				)}

				<EventForm clubId={clubId} user={user} committeeMembers={club.committee} />

				{user && (
					<Button variant="contained" color="primary" sx={{ display: 'block', margin: '20px auto' }} onClick={handleApply} disabled={applied || applying}>
						{applied ? "Applied" : applying ? "Applying..." : "Apply to Join"}
					</Button>
				)}
			</Paper>
		</Container>
	);
};

export default ClubDetails;