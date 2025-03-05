import React from "react";
import {AppBar, Toolbar, Container,} from "@mui/material";
import SiteLogo from "./components/SiteLogo";
import MobileMenu from "./components/MobileMenu";
import DesktopMenu from "./components/DesktopMenu";
import ProfileMenu from "./components/ProfileMenu";
import {themeColors} from "../../theme/styles";

const pages = ["Home", "Clubs", ""] //Add Forum button back in here

const HeaderBar = () => {
	
	return (
		<AppBar position="static" sx={{bgcolor: themeColors.fishing.secondary, color:'black'}}>
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
