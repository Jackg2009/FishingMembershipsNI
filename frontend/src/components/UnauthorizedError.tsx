// // UnauthorizedError.tsx
// import React from 'react';
// import { Box, Typography, Button } from '@mui/material';
// import { useHistory } from 'react-router-dom';
//
// const UnauthorizedError = () => {
//     const history = useHistory();
//
//     const handleLoginRedirect = () => {
//         // Redirect to login page
//         history.push('/login');
//     };
//
//     return (
//         <Box sx={{ textAlign: 'center', padding: '20px' }}>
//             <Typography variant="h6" gutterBottom>
//                 Oops! Your session has expired or you're not authorized to view this page.
//             </Typography>
//             <Typography variant="body1" paragraph>
//                 Please log in again to continue or contact support if you think this is a mistake.
//             </Typography>
//             <Button variant="contained" color="primary" onClick={handleLoginRedirect}>
//                 Go to Login
//             </Button>
//         </Box>
//     );
// };
//
// export default UnauthorizedError;
