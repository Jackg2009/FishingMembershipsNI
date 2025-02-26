import {Box, Button, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {Menu as MenuIcon} from "@mui/icons-material";
import {Link} from "react-router-dom";
import React, {useState} from "react";

interface DesktopMenu {
	pages: string[]
}

const DesktopMenu= (props: DesktopMenu) => {
	const {pages} = props;
	
	return (
		<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
			{pages.map((page) => (
				<Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
					<Link to={`/${page.toLowerCase()}`} style={{ textDecoration: "none", color: "inherit" }}>
						{page}
					</Link>
				</Button>
			))}
		</Box>
	
	)
}

export default DesktopMenu;