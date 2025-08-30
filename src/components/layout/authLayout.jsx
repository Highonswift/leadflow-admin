import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';

const AuthLayout = ({ title, children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #6C63FF 0%, #4E4AE8 100%)',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {title && (
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 'bold', color: '#4E4AE8', mb: 1 }}
            >
              {title}
            </Typography>
          )}
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
