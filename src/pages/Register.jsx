import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // 💡 Axios import කළා backend සම්බන්ධ කරන්න
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
  LinearProgress,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Facebook,
  Mail,
  Lock,
  Person,
  Phone,
  Check,
  Close,
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
import './Register.css';

const PASSWORD_REQUIREMENTS = {
  length: { regex: /.{8,}/, label: 'At least 8 characters' },
  uppercase: { regex: /[A-Z]/, label: 'One uppercase letter' },
  lowercase: { regex: /[a-z]/, label: 'One lowercase letter' },
  number: { regex: /[0-9]/, label: 'One number' },
  special: { regex: /[!@#$%^&*]/, label: 'One special character (!@#$%^&*)' },
};

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    Object.values(PASSWORD_REQUIREMENTS).forEach((req) => {
      if (req.regex.test(password)) strength += 20;
    });
    return strength;
  };

  const getPasswordStrengthLabel = (strength) => {
    if (strength === 0) return { label: 'No password', color: 'default' };
    if (strength < 40) return { label: 'Weak', color: 'error' };
    if (strength < 60) return { label: 'Fair', color: 'warning' };
    if (strength < 80) return { label: 'Good', color: 'info' };
    return { label: 'Strong', color: 'success' };
  };

  const passwordStrength = calculatePasswordStrength(formData.password);
  const passwordStrengthLabel = getPasswordStrengthLabel(passwordStrength);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrength < 60) {
      newErrors.password = 'Password is too weak. Meet more requirements.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  
const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      
      const cleanPhone = formData.phone.replace(/\D/g, ''); 

      const res = await axios.post("http://localhost:5000/api/v1/auth/register", {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: String(cleanPhone),
        password: formData.password,
        confirmPassword: formData.confirmPassword
      },
       {
    withCredentials: true 
  });

      console.log('Register Success:', res.data);
      setSuccess(true);

      setTimeout(() => {
        navigate('/login', { state: { email: formData.email } });
      }, 2000);

    } 
     catch (err) {
    console.error('Register Error Detailed:', err);
    const responseData = err.response?.data;

    // 1. Backend server ekata connect wenna bari nam (CORS hari server down hari nam)
    if (!err.response) {
      setErrors({email:'unable to connect to server' });
      return;
    }

    // 2. Express-validator validation errors thiyenawanam (ex: password short nam)
    if (responseData?.errors && Array.isArray(responseData.errors)) {
      const backendErrors = {};
      responseData.errors.forEach(error => {
        if (error.field) backendErrors[error.field] = error.message;
      });
      setErrors(backendErrors);
    } 
    // 3. Controller eken ena duplicate email/phone messages thiyenawanam
    else if (responseData?.message) {
      const backendMessage = responseData.message;
      if (backendMessage.toLowerCase().includes('email')) {
      
        setErrors({ email: backendMessage }); 
      } else if (backendMessage.toLowerCase().includes('phone')) {
        setErrors({ phone: backendMessage });
      } else {
        setErrors({ email: backendMessage });
      }
    }
    // 4. Unsuspected error ekak nam status code eka pennanna
    else {
      setErrors({ email: `Server error status: ${err.response.status}` });
    }
  } finally {
    setLoading(false);
  }
}
    
   

  // Social login handlers
  const handleGoogleRegister = () => {
    console.log('Google registration initiated');
    alert('Google registration would be initiated here');
  };

  const handleFacebookRegister = () => {
    console.log('Facebook registration initiated');
    alert('Facebook registration would be initiated here');
  };

  if (success) {
    return (
      <Container maxWidth="sm" className="register-container">
        <Box className="success-state" sx={{ textAlign: 'center', mt: 8 }}>
          <Check sx={{ fontSize: 80, color: '#10b981', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Registration Successful!
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Your account has been created successfully. Redirecting to login...
          </Typography>
          <LinearProgress sx={{ mb: 2 }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" className="register-container">
      <Card className="register-card" sx={{ mt: 4, mb: 4 }}>
        <CardContent>
          {/* Header */}
          <Box className="register-header" sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Create Account
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Join CareLink to manage your health and find doctors easily
            </Typography>
          </Box>

          {/* Social Login */}
          <Box className="social-login" sx={{ mb: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleRegister}
              sx={{ mb: 1, textTransform: 'none' }}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Facebook sx={{ color: '#1877F2' }} />}
              onClick={handleFacebookRegister}
              sx={{ textTransform: 'none' }}
            >
              Sign up with Facebook
            </Button>
          </Box>

          <Divider sx={{ my: 2 }}>
            <Typography variant="caption" color="textSecondary">
              or register with email
            </Typography>
          </Divider>

          {/* Form */}
          <form onSubmit={handleSubmit} className="register-form">
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#6b7280' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#6b7280' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {formData.password && (
              <Box sx={{ mt: 1.5, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Password Strength
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: passwordStrengthLabel.color === 'error' ? '#ef4444' : passwordStrengthLabel.color === 'warning' ? '#f59e0b' : passwordStrengthLabel.color === 'info' ? '#3b82f6' : '#10b981' }}>
                    {passwordStrengthLabel.label}
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={passwordStrength} sx={{ height: 6, borderRadius: 3, backgroundColor: '#e5e7eb', '& .MuiLinearProgress-bar': { backgroundColor: passwordStrengthLabel.color === 'error' ? '#ef4444' : passwordStrengthLabel.color === 'warning' ? '#f59e0b' : passwordStrengthLabel.color === 'info' ? '#3b82f6' : '#10b981' } }} />
                
                <Box sx={{ mt: 1.5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  {Object.entries(PASSWORD_REQUIREMENTS).map(([key, req]) => {
                    const isMet = req.regex.test(formData.password);
                    return (
                      <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {isMet ? <Check sx={{ fontSize: '1rem', color: '#10b981' }} /> : <Close sx={{ fontSize: '1rem', color: '#9ca3af' }} />}
                        <Typography variant="caption" sx={{ color: isMet ? '#10b981' : '#9ca3af', textDecoration: isMet ? 'line-through' : 'none' }}>
                          {req.label}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeToTerms}
                  onChange={(e) => {
                    setAgreeToTerms(e.target.checked);
                    if (errors.terms) setErrors((prev) => ({ ...prev, terms: '' }));
                  }}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <Link to="#" style={{ color: '#0ea5a9', textDecoration: 'none', fontWeight: 600 }}>
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="#" style={{ color: '#0ea5a9', textDecoration: 'none', fontWeight: 600 }}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
              sx={{ my: 1.5 }}
            />
            {errors.terms && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.terms}
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{
                mt: 2,
                mb: 2,
                background: 'linear-gradient(135deg, #0ea5a9 0%, #0d9488 100%)',
                fontWeight: 600,
                textTransform: 'none',
                py: 1.5
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#0ea5a9', textDecoration: 'none', fontWeight: 600 }}>
                Login here
              </Link>
            </Typography>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              variant="text"
              size="small"
              onClick={() => setForgotPasswordOpen(true)}
              sx={{ color: '#6b7280', textTransform: 'none' }}
            >
              Forgot password? Reset it here
            </Button>
          </Box>
        </CardContent>
      </Card>

      <ForgotPasswordDialog open={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
    </Container>
  );
}

 