import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Dialog,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Mail,
  Lock,
  Person,
  Phone,
  Check,
  Close,
} from '@mui/icons-material';
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
    // Clear error for this field when user starts typing
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

    // Simulate API call
    setTimeout(() => {
      console.log('Register:', formData);
      setSuccess(true);
      setLoading(false);

      // Redirect after success
      setTimeout(() => {
        navigate('/login', { state: { email: formData.email } });
      }, 2000);
    }, 1500);
  };

  // Social login handlers
  const handleGoogleRegister = () => {
    console.log('Google registration initiated');
    // In production: initiate Google OAuth flow
    alert('Google registration would be initiated here');
  };

  const handleFacebookRegister = () => {
    console.log('Facebook registration initiated');
    // In production: initiate Facebook OAuth flow
    alert('Facebook registration would be initiated here');
  };

  if (success) {
    return (
      <Container maxWidth="sm" className="register-container">
        <Box className="success-state">
          <Check sx={{ fontSize: 80, color: '#10b981', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Registration Successful!
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Your account has been created successfully. Redirecting to login...
          </Typography>
          <LinearProgress sx={{ mb: 2 }} />
          <Typography variant="caption" color="textSecondary">
            You will be redirected shortly
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" className="register-container">
      <Card className="register-card">
        <CardContent>
          {/* Header */}
          <Box className="register-header">
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              Create Account
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Join CareLink to manage your health and find doctors easily
            </Typography>
          </Box>

          {/* Social Login */}
          <Box className="social-login">
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              onClick={handleGoogleRegister}
              className="social-btn google-btn"
              sx={{ mb: 1 }}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Facebook />}
              onClick={handleFacebookRegister}
              className="social-btn facebook-btn"
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
            {/* Name Fields */}
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
                size="medium"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#6b7280' }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="John"
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
                size="medium"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#6b7280' }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Doe"
              />
            </Box>

            {/* Email Field */}
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
              size="medium"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              placeholder="john@example.com"
            />

            {/* Phone Field */}
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              variant="outlined"
              size="medium"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              placeholder="9876543210"
            />

            {/* Password Field */}
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
              placeholder="Enter a strong password"
            />

            {/* Password Strength Indicator */}
            {formData.password && (
              <Box sx={{ mt: 1.5, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Password Strength
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color:
                        passwordStrengthLabel.color === 'error'
                          ? '#ef4444'
                          : passwordStrengthLabel.color === 'warning'
                          ? '#f59e0b'
                          : passwordStrengthLabel.color === 'info'
                          ? '#3b82f6'
                          : '#10b981',
                    }}
                  >
                    {passwordStrengthLabel.label}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={passwordStrength}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor:
                        passwordStrengthLabel.color === 'error'
                          ? '#ef4444'
                          : passwordStrengthLabel.color === 'warning'
                          ? '#f59e0b'
                          : passwordStrengthLabel.color === 'info'
                          ? '#3b82f6'
                          : '#10b981',
                    },
                  }}
                />

                {/* Requirements Checklist */}
                <Box sx={{ mt: 1.5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  {Object.entries(PASSWORD_REQUIREMENTS).map(([key, req]) => {
                    const isMet = req.regex.test(formData.password);
                    return (
                      <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {isMet ? (
                          <Check sx={{ fontSize: '1rem', color: '#10b981' }} />
                        ) : (
                          <Close sx={{ fontSize: '1rem', color: '#9ca3af' }} />
                        )}
                        <Typography
                          variant="caption"
                          sx={{
                            color: isMet ? '#10b981' : '#9ca3af',
                            textDecoration: isMet ? 'line-through' : 'none',
                          }}
                        >
                          {req.label}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}

            {/* Confirm Password Field */}
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Re-enter your password"
            />

            {/* Terms Agreement */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeToTerms}
                  onChange={(e) => {
                    setAgreeToTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors((prev) => ({ ...prev, terms: '' }));
                    }
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

            {/* Submit Button */}
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
                fontSize: '1rem',
                py: 1.5,
                textTransform: 'none',
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Login Link & Forgot Password */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{' '}
              <Link
                to="/login"
                style={{ color: '#0ea5a9', textDecoration: 'none', fontWeight: 600 }}
              >
                Login here
              </Link>
            </Typography>
          </Box>

          {/* Forgot Password Link */}
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

      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </Container>
  );
}
