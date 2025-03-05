import {createTheme} from '@mui/material'
import {themeColors} from "./styles";

export const theme = createTheme({
	palette: {
		primary: themeColors.fishing,
		secondary: themeColors.sand,
		background: {
			default: themeColors.background,  // Should be the grey color
			paper: themeColors.white,         // Paper elements like cards, etc.
		},
		text: themeColors.text,
	},
	components: {
		MuiMenu: {
			defaultProps: {
				disableScrollLock: true,
			},
		},
	},
});

export default theme
