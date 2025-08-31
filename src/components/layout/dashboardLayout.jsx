import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Button,
  Avatar,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dashboard, Chat, Forum, Logout, Menu, People, Add } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../../context/authContext';

const drawerWidth = 260;

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, handleLogout } = React.useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
  { label: 'Assistant', path: '/assistant', icon: <Chat /> },
  { label: 'Conversation', path: '/conversation', icon: <Forum /> },
  { label: 'Leads', path: '/leads', icon: <People /> },          // new
  { label: 'Workflows', path: '/workflows', icon: <Add /> },    // new
];


  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        p: 2,
      }}
    >
      {/* Logo / Title */}
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: 4, color: '#1976d2' }}
      >
        LeadFlow
      </Typography>

      {/* Menu */}
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.label}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                borderRadius: 2,
                color: isActive ? '#fff' : '#333',
                backgroundColor: isActive ? '#1976d2' : 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: isActive ? '#1565c0' : '#f0f4ff',
                },
              }}
            >
              {item.icon && (
                <Box
                  sx={{
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    color: isActive ? '#fff' : '#1976d2',
                  }}
                >
                  {item.icon}
                </Box>
              )}
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>

      {/* User Info */}
      <Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
            {user?.name?.[0] || 'U'}
          </Avatar>
          <Typography variant="body1">{user?.name || 'User'}</Typography>
        </Box>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Logout />}
          fullWidth
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f9fafb' }}>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
        >
          <Menu />
        </IconButton>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            borderRight: '1px solid #e0e0e0',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
<Box
  sx={{
    minHeight: '100vh', 
    p: 3,
    width: { md: `calc(100vw - ${drawerWidth}px)` }, // adjust width on desktop
  }}
>
  {children}
</Box>
    </Box>
  );
};

export default DashboardLayout;
