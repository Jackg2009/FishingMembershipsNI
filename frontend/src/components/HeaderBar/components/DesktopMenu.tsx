import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

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
					<Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
						<Link to={linkTo} style={{ textDecoration: "none", color: "inherit" }}>
							{page}
						</Link>
					</Button>
				);
			})}
		</Box>
	);
};

export default DesktopMenu;