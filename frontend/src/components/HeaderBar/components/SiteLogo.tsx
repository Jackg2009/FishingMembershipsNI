import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Link} from "react-router-dom";

const SiteLogo = () => {
	return (
		<>
			<AdbIcon sx={{ mr: 1 }} />
			<Typography
				variant="h6"
				noWrap
				component={Link}
				to="/"
				sx={{
					mr: 2,
					fontFamily: "monospace",
					fontWeight: 700,
					letterSpacing: ".3rem",
					color: "inherit",
					textDecoration: "none",
					flexGrow: { xs: 1, md: 0 },
				}}
			>
				LOGO
			</Typography>
		</>
	)
}

export default SiteLogo;