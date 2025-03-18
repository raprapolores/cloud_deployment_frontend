import React from 'react';
import { AppBar, Toolbar, Typography, Button  } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for routing

const Header = () => {
  const navigate = useNavigate();
  
  // Check if the user is logged in by looking for the token in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Library Issuing Book System
        </Typography>

        {isLoggedIn && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
