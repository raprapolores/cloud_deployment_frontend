import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      if(response.data.role === "student") {
        navigate('/dashboard');
      } else {
        navigate('/admin');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>
        <Typography variant="body2" align="center" mt={2}>
          Don't have an account?{' '}
          <Button color="primary" onClick={() => navigate('/register')}>
            Register here
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
