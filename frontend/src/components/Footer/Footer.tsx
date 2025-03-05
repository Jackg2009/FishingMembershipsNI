import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer: React.FC = () => {
    return (
        <Box sx={{ bgcolor: "grey.900", color: "white", py: 3, mt: "auto", textAlign: "center" }}>
            <Container>
                <Typography variant="body2">
                    © {new Date().getFullYear()} Fishing Memberships NI
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;