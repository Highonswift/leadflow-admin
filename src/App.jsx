import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from './theme';
import { AuthProvider, AuthContext } from './context/authContext';

import AuthLayout from './components/layout/authLayout';
import DashboardLayout from './components/layout/dashboardLayout';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Dashboard from './pages/dashboard/dashboard';
import ProtectedRoute from './components/protectedRoutes';

const DefaultRedirect = () => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

// Wrapper for Auth Routes
const AuthWrapper = () => (
  <AuthLayout>
    <Outlet />
  </AuthLayout>
);

// Wrapper for Dashboard Routes (Protected)
const DashboardWrapper = () => (
  <ProtectedRoute>
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  </ProtectedRoute>
);

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DefaultRedirect />} />

            {/* Auth Routes */}
            <Route element={<AuthWrapper />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Dashboard Routes */}
            <Route element={<DashboardWrapper />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Future nested routes: leads, settings */}
            </Route>

            {/* Catch all (404) */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
