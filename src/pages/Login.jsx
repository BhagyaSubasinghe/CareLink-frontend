import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Mail,
  Lock,
} from '@mui/icons-material';

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

import ForgotPasswordDialog from '../components/ForgotPasswordDialog';
import './Login.css';

import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password
      }
    );

    console.log("Login success:", res.data);

    // store token if backend sends it
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    navigate("/dashboard");

  } catch (err) {
    console.log(err.response?.data || err.message);

    setErrors({
      password: err.response?.data?.message || "Invalid login"
    });

  } finally {
    setLoading(false);
  }
};
  // Social login handlers
  const handleGoogleLogin = () => {
    console.log('Google login initiated');
    alert('Google login would be initiated here');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login initiated');
    alert('Facebook login would be initiated here');
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Card className="login-card">
        <CardContent>
          {/* Header */}
          <Box className="login-header">
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Login to access your CareLink account
            </Typography>
          </Box>

          {/* Social Login */}
          <Box className="social-login">
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              className="social-btn google-btn"
              sx={{ mb: 1 }}
            >
              Login with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Facebook sx={{ color: '#1877F2' }} />}
              onClick={handleFacebookLogin}
              className="social-btn facebook-btn"
            >
              Login with Facebook
            </Button>
          </Box>

          <Divider sx={{ my: 2 }}>
            <Typography variant="caption" color="textSecondary">
              or login with email
            </Typography>
          </Divider>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              size="medium"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              placeholder="your@email.com"
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              size="medium"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Enter your password"
            />

            {/* Remember Me & Forgot Password */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
                mb: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size="small"
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
              <Button
                variant="text"
                size="small"
                onClick={() => setForgotPasswordOpen(true)}
                sx={{
                  color: '#0ea5a9',
                  textTransform: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
              >
                Forgot password?
              </Button>
            </Box>

            {/* Submit Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{
                mt: 1,
                mb: 2,
                background: 'linear-gradient(135deg, #0ea5a9 0%, #0d9488 100%)',
                fontWeight: 600,
                fontSize: '1rem',
                py: 1.5,
                textTransform: 'none',
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Register Link */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{
                  color: '#0ea5a9',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Register here
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </Container>
  );
}
