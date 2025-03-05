import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import {themeColors} from "../../../theme/styles";

interface DesktopMenu {
	pages: string[];
}

const DesktopMenu = (props: DesktopMenu) => {
	const { pages } = props;

	return (
		<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
			{pages.map((page) => {
				// If the page is "Home", set the link to "/"
				const linkTo = page === "Home" ? "/" : `/${page.toLowerCase()}`;

				return (
					<Link to={linkTo} style={{ textDecoration: "none", color: "inherit",}}>
						<Button
							sx={{
								my: 2,
								color: "white",
								display: "block",
								width: "100%",
								"&:hover": {
									backgroundColor: themeColors.fishing.dark, // Set background to black on hover
								},
							}}
						>
							{page}
						</Button>
					</Link>
				);
			})}
		</Box>
	);
};

export default DesktopMenu;