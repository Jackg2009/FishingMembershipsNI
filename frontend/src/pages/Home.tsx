import React from "react";
import {Box, Container, Grid2 as Grid, Typography} from "@mui/material";
import {themeColors} from "../theme/styles";
import { useAuth } from "../hooks/useAuth";


const Home = () => {
	const {user} = useAuth();
	return (
		<Grid container spacing={3} sx={{ backgroundColor: themeColors.fishing.dark }}>
			<Grid size={{xs: 12}}>
				<Box sx={{ backgroundColor: themeColors.fishing.dark , color: "white", py: 8, textAlign: "center"}}>
					<Container>
						<Typography variant="h3" gutterBottom>
							Welcome {user?.forename ?? ''}
						</Typography>
					</Container>
				</Box>
			</Grid>

		
		</Grid>
	);
};

export default Home;
