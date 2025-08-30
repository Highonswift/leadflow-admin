import React from 'react';
import { Box } from '@mui/material';
import Header from '../common/header';
import Sidebar from '../common/sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f9fafb' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
