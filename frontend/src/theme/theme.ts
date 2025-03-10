import {createTheme} from '@mui/material'
import {themeColors} from "./styles";

export const theme = createTheme({
	palette: {
		primary: themeColors.fishing,
		secondary: themeColors.sand,
		background: {
			default: themeColors.fishing.background,
			paper: themeColors.white,
		},
		text: themeColors.text,
	},
	components: {
		MuiMenu: {
			defaultProps: {
				disableScrollLock: true,
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					backgroundColor: themeColors.fishing.secondary,
					"&:hover": {
						backgroundColor: themeColors.fishing.dark,
					},
				},
			},
		},
	},
	typography: {
		fontFamily: '"Poppins", Arial, sans-serif', // ✅ Change to your desired font
	},
});

export default theme
