import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Typography variant="h4" mb={3}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6">Total Leads</Typography>
            <Typography variant="h3" color="primary">120</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6">Conversions</Typography>
            <Typography variant="h3" color="secondary">45</Typography>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
