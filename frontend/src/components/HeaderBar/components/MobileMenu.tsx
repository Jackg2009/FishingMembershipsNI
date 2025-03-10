import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React, { useState } from "react";

interface MobileMenu {
	pages: string[];
}

const MobileMenu = (props: MobileMenu) => {
	const { pages } = props;
	const [navMenu, setNavMenu] = useState<null | HTMLElement>(null);

	return (
		<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
			<IconButton color="inherit" onClick={(e) => setNavMenu(e.currentTarget)}>
				<MenuIcon />
			</IconButton>
			<Menu
				anchorEl={navMenu}
				open={Boolean(navMenu)}
				onClose={() => setNavMenu(null)}
				sx={{ display: { xs: "block", md: "none" } }}
			>
				{pages.map((page) => {
					// If the page is "Home", set the link to "/"
					const linkTo = page === "Home" ? "/" : `/${page.toLowerCase()}`;

					return (
						<Link to={linkTo} style={{ textDecoration: "none", color: "inherit", width: '100%' }}>
							<MenuItem key={page} onClick={() => setNavMenu(null)} sx={{ width: '100%' }}>
								<Typography textAlign="center">{page}</Typography>
							</MenuItem>
						</Link>
					);
				})}
			</Menu>
		</Box>
	);
};

export default MobileMenu;
