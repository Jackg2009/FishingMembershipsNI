import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../../theme/theme";
import {themeColors} from "../../theme/styles";

const GetStartedButton = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('user_token'); // Check if the user is logged in

    const handleButtonClick = () => {
        if (token) {
            // If the user is logged in, navigate to the clubs page
            navigate('/clubs');
        } else {
            // If the user is not logged in, navigate to the signup page
            navigate('/signup');
        }
    };

    return (
        <Button
            variant="contained"
            size="large"
            sx={{ mt: 3}}
            onClick={handleButtonClick}
        >
            Get Started
        </Button>
    );
};

export default GetStartedButton;