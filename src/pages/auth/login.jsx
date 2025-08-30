import { Stack, TextField, Button, InputAdornment, Typography, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await handleLogin({ email, password });
    setLoading(false);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };
  return (
    <Stack spacing={3} component="form" onSubmit={onSubmit} sx={{ width: '100%', textAlign: 'center', p: 3, borderRadius: 3, bgcolor: '#fff' }}>
      <Typography variant="h4" fontWeight="bold" color="primary">Sign In</Typography>
      <Typography variant="body2" color="text.secondary" mb={1}>Welcome back! Please login.</Typography>

      <TextField
        label="Email"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon color="primary" />
            </InputAdornment>
          ),
        }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type='email'
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon color="primary" />
            </InputAdornment>
          ),
        }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
 {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" size="large" fullWidth type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      <Link component={RouterLink} to="/signup" underline="hover" color="secondary">
        Don't have an account? Sign Up
      </Link>
    </Stack>
  );
};

export default Login;
