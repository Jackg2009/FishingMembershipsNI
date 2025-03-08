import React, {useState} from 'react';
import {Paper, Typography, TextField, FormControlLabel, Switch, Button} from '@mui/material';
import useCreateEvent from "../../hooks/useCreateEvent/useCreateEvent";
import { Member } from '../../types';

interface EventFormProps {
    clubId: any;
    user: any;
    committeeMembers: Member[];
}

const EventForm: React.FC<EventFormProps> = ({ clubId, user, committeeMembers }) => {
    const { createEvent } = useCreateEvent();
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    // Check if the user is a member of the committee
    const isCommitteeMember = committeeMembers?.some(member => member.id === user?.id);

    const handleCreateEvent = async () => {
        if (!eventName || !eventDate) return alert("Please fill in all fields.");

        try {
            await createEvent({ clubId, name: eventName, date: eventDate, isPrivate });
            alert("Event created successfully!");
            setEventName('');
            setEventDate('');
            setIsPrivate(false);
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event.");
        }
    };

    // Only show the form if the user is in the committee
    if (!isCommitteeMember) return null;

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6">Create Event</Typography>
            <TextField
                label="Event Name"
                fullWidth
                margin="normal"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
            />
            <TextField
                label="Event Date"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
            />
            <FormControlLabel
                control={<Switch checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />}
                label="Private Event"
            />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleCreateEvent}>
                Create Event
            </Button>
        </Paper>
    );
};

export default EventForm;