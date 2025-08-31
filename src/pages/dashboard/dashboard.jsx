import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Add, TrendingUp, Message } from '@mui/icons-material';

const chartData = [
  { name: 'Mon', leads: 30 },
  { name: 'Tue', leads: 50 },
  { name: 'Wed', leads: 80 },
  { name: 'Thu', leads: 65 },
  { name: 'Fri', leads: 90 },
];

const MotionPaper = motion(Paper);

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Header */}
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        sx={{
          background: 'linear-gradient(90deg, #4F46E5, #9333EA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Welcome Back, Govarthan 👋
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3}>
        {[
          {
            title: 'Total Leads',
            value: '120',
            color: 'linear-gradient(135deg, #4F46E5, #3B82F6)',
            icon: <TrendingUp />,
            change: '+12% this week',
          },
          {
            title: 'All Conversations',
            value: '32',
            color: 'linear-gradient(135deg, #10B981, #059669)',
            icon: <Message />,
            change: '+5 today',
          },
          {
            title: 'Avg Duration',
            value: '45',
            color: 'linear-gradient(135deg, #9333EA, #7E22CE)',
            icon: <TrendingUp />,
            change: '+8% this month',
          },
          {
            title: 'Avg Cost',
            value: '32',
            color: 'linear-gradient(135deg, #F59E0B, #D97706)',
            icon: <Message />,
            change: '+5 today',
          },
        ].map((card, index) => (
          <Grid key={index} size={3}>
            <MotionPaper
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              sx={{
                p: 3,
                borderRadius: 2,
                background: card.color,
                color: 'white',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {card.title}
                </Typography>
                <IconButton
                  sx={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    '&:hover': { background: 'rgba(255,255,255,0.3)' },
                  }}
                >
                  {card.icon}
                </IconButton>
              </Box>
              <Typography variant="h3" fontWeight="bold" mt={1}>
                {card.value}
              </Typography>
              <Typography variant="body2" mt={1}>
                {card.change}
              </Typography>
            </MotionPaper>
          </Grid>
        ))}
      </Grid>

      {/* Chart & Activity */}
      <Grid container spacing={3} mt={3}>
        {/* Chart */}
        <Grid size={8}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'white',
              boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
            }}
          >
            <Typography variant="h6" mb={2} fontWeight="bold">
              Lead Growth (Weekly)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="leads" stroke="#4F46E5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </MotionPaper>
        </Grid>

        {/* Recent Activity */}
        <Grid size={4}>
          <MotionPaper
            whileHover={{ scale: 1.02 }}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'white',
              boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
              height: '100%',
            }}
          >
            <Typography variant="h6" mb={2} fontWeight="bold">
              Recent Conversations
            </Typography>
            <Box>
              {[1, 2, 3].map((item) => (
                <Box
                  key={item}
                  display="flex"
                  alignItems="center"
                  mb={2}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                  }}
                >
                  <Avatar sx={{ bgcolor: '#4F46E5', mr: 2 }}>U</Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      User {item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      “Hey, I need help with a lead”
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Add />}
              sx={{
                mt: 2,
                background: 'linear-gradient(90deg, #4F46E5, #9333EA)',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(90deg, #4338CA, #7E22CE)',
                },
              }}
            >
              New Conversation
            </Button>
          </MotionPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
