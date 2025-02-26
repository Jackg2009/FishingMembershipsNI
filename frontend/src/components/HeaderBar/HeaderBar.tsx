import React from "react";
import {AppBar, Toolbar, Container,} from "@mui/material";
import SiteLogo from "./components/SiteLogo";
import MobileMenu from "./components/MobileMenu";
import DesktopMenu from "./components/DesktopMenu";
import ProfileMenu from "./components/ProfileMenu";

const pages = ["Home", "Clubs", "Forum"];

const HeaderBar = () => {
	
	return (
		<AppBar position="static">
			<Container maxWidth={false}>
				<Toolbar disableGutters>
					<SiteLogo/>
					
					<MobileMenu pages={pages}/>
					
					<DesktopMenu pages={pages}/>
					
					<ProfileMenu/>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default HeaderBar;
