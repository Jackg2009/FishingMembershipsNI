import {createTheme} from '@mui/material'
import {themeColors} from "./styles";

export const theme = createTheme({
	palette: {
		primary: themeColors.fishing,
		secondary: themeColors.sand,
		background: {
			default: '#dadada',
			paper: '#FFFFFF',
		},
		text: themeColors.text,
	},
	components: {
		MuiMenu: {
			defaultProps: {
				disableScrollLock: true,
			},
		}
	}
})

export default theme
