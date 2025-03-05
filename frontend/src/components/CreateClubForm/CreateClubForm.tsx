import React from 'react';
import { Button, FormControl, TextField, Paper, Typography, Container } from '@mui/material';

interface CreateClubFormProps {
    handleSubmit: (event: React.FormEvent) => void;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const CreateClubForm: React.FC<CreateClubFormProps> = ({ handleSubmit, setName, setDescription }) => {
    return (
        <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ padding: 3, width: '100%', marginTop: 5 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Add Club
                </Typography>
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
                    <Button variant="contained" onClick={handleSubmit}>
                        Add Club
                    </Button>
                </FormControl>
            </Paper>
        </Container>
    );
};

export default CreateClubForm;
