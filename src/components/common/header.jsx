import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ boxShadow: 'none', zIndex: 1201 }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          LeadFlow Dashboard
        </Typography>
        <Box>
          <Typography variant="body1">Welcome, User</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
