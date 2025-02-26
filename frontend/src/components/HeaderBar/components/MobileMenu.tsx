import {Box, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {Menu as MenuIcon} from "@mui/icons-material";
import {Link} from "react-router-dom";
import React, {useState} from "react";

interface MobileMenu {
	pages: string[]
}

const MobileMenu= (props: MobileMenu) => {
	const {pages} = props;
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
				{pages.map((page) => (
					<MenuItem key={page} onClick={() => setNavMenu(null)}>
						<Link to={`/${page.toLowerCase()}`} style={{ textDecoration: "none", color: "inherit" }}>
							<Typography textAlign="center">{page}</Typography>
						</Link>
					</MenuItem>
				))}
			</Menu>
		</Box>
	
	)
}

export default MobileMenu;