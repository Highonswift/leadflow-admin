import { Stack, TextField, Button, InputAdornment, Typography, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';

const Signup = () => {
  const { handleSignup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await handleSignup({ name, email, password });
    setLoading(false);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Signup failed. Try again.');
    }
  };
  return (
    <Stack spacing={3} component="form" onSubmit={onSubmit} sx={{ width: '100%', textAlign: 'center', p: 3, borderRadius: 3, bgcolor: '#fff' }}>
      <Typography variant="h4" fontWeight="bold" color="primary">Create Account</Typography>
      <Typography variant="body2" color="text.secondary" mb={1}>Sign up to get started</Typography>

      <TextField
        label="Name"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon color="primary" />
            </InputAdornment>
          ),
        }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        type='text'
      />
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
        {loading ? 'Signing up...' : 'Sign Up'}
      </Button>

      <Link component={RouterLink} to="/login" underline="hover" color="secondary">
        Already have an account? Login
      </Link>
    </Stack>
  );
};

export default Signup;
