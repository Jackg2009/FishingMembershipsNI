import React, {useState} from "react";
import {TextField, Button, Card, CardContent, CardHeader, Typography, Grid2 as Grid, FormControl, Link} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth/useAuth";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login, error, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting form with data:", formData);

        // Attempt to log the user in
        const result = await login(formData.email, formData.password);
        console.log('Login result:', result);

        if (result.success) {
            // Redirect the user to their intended page or home
            const redirectPath = location.state?.from?.pathname || "/";
            navigate(redirectPath, { replace: true });
        } else {
            console.log("Login failed");
        }
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "80vh" }} // Ensures full height centering
        >
            <Grid>
                <Card sx={{ width: 350, padding: 3, boxShadow: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <CardHeader
                        title={
                            <Typography variant="h5" align="center">
                                Sign In
                            </Typography>
                        }
                    />
                    <CardContent sx={{ width: "100%" }}>
                        <FormControl
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                width: "100%", // Ensures inputs stretch properly
                            }}
                        >
                            <TextField
                                type="email"
                                name="email"
                                label="Email Address"
                                variant="outlined"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            <TextField
                                type="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            {error && <Typography color="error" align="center">{error}</Typography>}
                            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                                {loading ? "Signing In..." : "Sign In"}
                            </Button>
                            <Typography variant="body1" align="center">
                                <Link href="/Register">Create an Account</Link>
                            </Typography>
                        </FormControl>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};


export default Login;