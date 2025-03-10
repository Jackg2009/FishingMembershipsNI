import {Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth/useAuth";
import theme from "../../../theme/theme";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ProfileMenu = () => {
	const {isAuthenticated, logout, user} = useAuth();

	const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();
	
	const handleCloseUserMenu = (setting: string) => {
		setUserMenu(null);
		if (setting === "Profile") {
			navigate("/profile");
		}
		if (setting === "Logout"){
			logout()
			navigate("/signin");
			
		}
	};
	
	if (!isAuthenticated)
		return (
			<Button sx={{color:'white', }}
				onClick={() => navigate('/signin')}

			>Sign In</Button>
		)
	
	return (
		<Box sx={{flexGrow: 0}}>
			<Tooltip title="Open settings">
				<IconButton onClick={(e) => setUserMenu(e.currentTarget)} sx={{p: 0}}>
					<Avatar alt={user?.forename} src="/static/images/avatar/2.jpg"/>
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={userMenu}
				open={Boolean(userMenu)}
				onClose={() => setUserMenu(null)}
				sx={{mt: "45px"}}
			>
				{settings.map((setting) => (
					<MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
						<Typography textAlign="center">{setting}</Typography>
					</MenuItem>
				))}
			</Menu>
		</Box>
	)
}

export default ProfileMenu