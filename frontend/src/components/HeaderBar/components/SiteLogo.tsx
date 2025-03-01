import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Link} from "react-router-dom";

const SiteLogo = () => {
	return (
		<>
			<img
				src="/logo.png" // Change this to the actual path of your logo
				alt="Fishing Memberships NI Logo"
				style={{ width: "40px", height: "auto", marginRight: "8px" }}
			/>
			<Typography
				variant="h6"
				noWrap
				component={Link}
				to="/"
				sx={{
					mr: 2,
					fontFamily: "monospace",
					fontWeight: 700,
					color: "inherit",
					textDecoration: "none",
					flexGrow: { xs: 1, md: 0 },
				}}
			>
				Fishing Memberships NI
			</Typography>
		</>
	)
}

export default SiteLogo;