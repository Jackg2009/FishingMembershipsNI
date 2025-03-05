import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {isEmailValid, isPasswordStrong, isPhoneValid, isDOBValid} from '../utils/validation';
import AddressAutocomplete from "../utils/fetchAddress";
import {
    Box,
    Button,
    Stepper,
    Step,
    StepLabel,
    TextField,
    Typography,
    Grid2 as Grid,
    Card,
    CardContent, FormControl,
} from '@mui/material';
import useCreateUser from "../hooks/useCreateUser/useCreateUser";

const Register = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        forename: '',
        surname: '',
        dob: '',
        street: '',
        city: '',
        county: '',
        postcode: '',
        contactNumber: '',
        fishingLicense: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const {createUser, loading, error} = useCreateUser()

    const steps = ['Personal Information', 'Login Details', 'Confirmation'];

    const isStepValid = () => {
        if (activeStep === 0) {
            return (
                formData.forename.trim() !== "" &&
                formData.surname.trim() !== "" &&
                formData.dob.trim() !== "" &&
                formData.street.trim() !== "" &&
                formData.city.trim() !== "" &&
                formData.county.trim() !== "" &&
                formData.postcode.trim() !== ""
            );
        }
        if (activeStep === 1) {
            return (
                formData.username.trim() !== "" &&
                formData.email.trim() !== "" &&
                formData.password.trim() !== "" &&
                formData.confirmPassword.trim() !== "" &&
                formData.password === formData.confirmPassword
            );
        }
        return true;
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value, // Always store as a string
        }));
    };

    const navigate = useNavigate();

    const handleSignInRedirect = () => {
        navigate("/signin"); // Replace with your actual Sign In route
    };

    const handleRegister = async () => {
        try {
            const formattedData = {
                ...formData,
                contactNumber: formData.contactNumber ? Number(formData.contactNumber.replace(/\D/g, '')) : undefined,
                dob: formData.dob ? new Date(formData.dob) : undefined,
            };

            await createUser(formattedData);
            setActiveStep((prevStep) => prevStep + 1);
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    const handleAddressSelect = (address: any) => {
        setFormData({
            ...formData,
            street: address.display_name,
            city: address.address?.city || address.address?.town || "",
            county: address.address?.state || "",
            postcode: address.address?.postcode || "",
        });
    };


    return (
        <>
            <Box sx={{fontFamily: "Arial, sans-serif", py: 6, px: 3, maxWidth: 600, mx: "auto"}}>
                <Typography variant="h4" sx={{fontWeight: "bold", mb: 4, textAlign: "center"}}>
                    Create Your Account
                </Typography>

                <Stepper activeStep={activeStep} sx={{mb: 4}}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Card sx={{p: 3, boxShadow: 3}}>
                    <CardContent>
                        <FormControl onSubmit={handleRegister}>
                            {activeStep === 0 && (
                                <Box>
                                    <Typography variant="h6" sx={{mb: 2}}>
                                        Personal Information
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid size={6}>
                                            <TextField fullWidth label="Forename" name="forename"
                                                       value={formData.forename} onChange={handleInputChange} required/>
                                        </Grid>
                                        <Grid size={6}>
                                            <TextField fullWidth label="Surname" name="surname" value={formData.surname}
                                                       onChange={handleInputChange} required/>
                                        </Grid>
                                        <Grid size={12}>
                                            <TextField
                                                fullWidth
                                                label="Date of Birth"
                                                type="date"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleInputChange}
                                                InputLabelProps={{shrink: true}}
                                                required
                                                error={!isDOBValid(formData.dob) && formData.dob !== ""}
                                                helperText={!isDOBValid(formData.dob) && formData.dob !== "" ? "Date of Birth Invalid" : ""}
                                            />
                                        </Grid>
                                        <Grid size={6}>
                                            <AddressAutocomplete onSelect={handleAddressSelect}/>
                                        </Grid>
                                        <Grid size={6}>
                                            <TextField fullWidth label="City" name="city" value={formData.city}/>
                                        </Grid>
                                        <Grid size={6}>
                                            <TextField fullWidth label="County" name="county" value={formData.county}/>
                                        </Grid>
                                        <Grid size={6}>
                                            <TextField fullWidth label="Postcode" name="postcode"
                                                       value={formData.postcode}/>
                                        </Grid>
                                        <Grid size={6}>
                                            <TextField
                                                fullWidth
                                                label="Contact Number"
                                                name="contactNumber"
                                                value={formData.contactNumber}
                                                onChange={handleInputChange}
                                                error={!isPhoneValid(formData.contactNumber) && formData.contactNumber !== ""}
                                                helperText={!isPhoneValid(formData.contactNumber) && formData.contactNumber !== "" ? "Enter a valid phone number" : ""}
                                            />
                                        </Grid>
                                        <Grid size={6}>
                                            <TextField fullWidth label="Rod License Number" name="fishingLicense"
                                                       value={formData.fishingLicense} onChange={handleInputChange}/>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            {activeStep === 1 && (
                                <Box>
                                    <Typography variant="h6" sx={{mb: 2}}>
                                        Login Details
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid size={12}>
                                            <TextField fullWidth label="Username" name="username"
                                                       value={formData.username} onChange={handleInputChange} required/>
                                        </Grid>
                                        <Grid size={12}>
                                            <TextField
                                                fullWidth
                                                label="Email Address"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                error={!isEmailValid(formData.email) && formData.email !== ""}
                                                helperText={!isEmailValid(formData.email) && formData.email !== "" ? "Enter a valid email" : ""}
                                            />
                                        </Grid>
                                        <Grid size={12}>
                                            <TextField
                                                fullWidth
                                                label="Password"
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                error={!isPasswordStrong(formData.password) && formData.password !== ""}
                                                helperText={!isPasswordStrong(formData.password) && formData.password !== "" ? "Weak password" : ""}
                                                required/>
                                        </Grid>
                                        <Grid size={12}>
                                            <TextField fullWidth label="Confirm Password" type="password"
                                                       name="confirmPassword" value={formData.confirmPassword}
                                                       onChange={handleInputChange} required/>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            {activeStep === 2 && (
                                <Box sx={{textAlign: "center"}}>
                                    <Typography variant="h6" sx={{mb: 2}}>
                                        Account Created Successfully!
                                    </Typography>
                                    <Typography variant="body1">
                                        Welcome, <strong>{formData.forename} {formData.surname}</strong>! You can now
                                        log in using your email and password.
                                    </Typography>
                                </Box>
                            )}

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: activeStep === 2 ? "center" : "space-between",
                                    mt: 4
                                }}
                            >
                                {activeStep !== 2 && (
                                    <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                                        Back
                                    </Button>
                                )}
                                {activeStep === 0 && (
                                    <Button onClick={handleNext} variant="contained" disabled={!isStepValid()}>
                                        Next
                                    </Button>
                                )}
                                {activeStep === 1 && (
                                    <Button onClick={handleRegister} variant="contained"
                                            disabled={!isStepValid() || loading}>
                                        {loading ? "Processing..." : "Register"}
                                    </Button>
                                )}
                                {activeStep === 2 && (
                                    <Button onClick={handleSignInRedirect} variant="contained"
                                            disabled={!isStepValid()}>
                                        Sign In
                                    </Button>
                                )}
                            </Box>
                        </FormControl>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default Register;
