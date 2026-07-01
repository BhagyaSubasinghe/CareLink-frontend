import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Alert,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from '@mui/material';
import { Mail, Lock, CheckCircle, ArrowBack } from '@mui/icons-material';
import api from '../services/api';

export default function ForgotPasswordDialog({ open, onClose }) {
  const [step, setStep] = useState(0); // 0: email, 1: verify code, 2: new password, 3: success
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetToken, setResetToken] = useState('');

  const handleReset = () => {
    setStep(0);
    setEmail('');
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
    setResetToken('');
    setError('');
    setLoading(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  // Step 1: Send Reset Email
  const handleSendResetEmail = async () => {
    setError('');
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email: email.trim().toLowerCase() });
      setStep(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Code
  const handleVerifyCode = async () => {
    setError('');
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }
    if (verificationCode.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/verify-otp', {
        email: email.trim().toLowerCase(),
        otp: verificationCode.trim()
      });

      setResetToken(response.data.resetToken || '');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Set New Password
  const handleSetNewPassword = async () => {
    setError('');
    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password should be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
      setError('Password must include uppercase, lowercase, number, and special character (!@#$%^&*).');
      return;
    }

    if (!resetToken) {
      setError('Reset session expired. Please restart the password reset process.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/reset-password', {
        resetToken,
        password: newPassword,
        confirmPassword
      });

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {step > 0 && (
            <Button
              variant="text"
              size="small"
              startIcon={<ArrowBack />}
              onClick={() => setStep(step - 1)}
              disabled={loading}
            >
              Back
            </Button>
          )}
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
            {step === 0 && 'Reset Password'}
            {step === 1 && 'Verify Code'}
            {step === 2 && 'Set New Password'}
            {step === 3 && 'Success'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Stepper */}
        <Stepper activeStep={step} sx={{ mb: 3 }}>
          <Step>
            <StepLabel>Email</StepLabel>
          </Step>
          <Step>
            <StepLabel>Verify</StepLabel>
          </Step>
          <Step>
            <StepLabel>Password</StepLabel>
          </Step>
          <Step>
            <StepLabel>Done</StepLabel>
          </Step>
        </Stepper>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Step 0: Email */}
        {step === 0 && (
          <Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Enter your email address and we'll send you a code to reset your password.
            </Typography>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              size="small"
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              placeholder="your@email.com"
            />
          </Box>
        )}

        {/* Step 1: Verification Code */}
        {step === 1 && (
          <Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              We've sent a verification code to <strong>{email}</strong>
            </Typography>
            <TextField
              fullWidth
              label="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              variant="outlined"
              size="small"
              disabled={loading}
              placeholder="Enter 6-digit code"
              inputProps={{ maxLength: 6 }}
            />
            <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
              Didn't receive the code?{' '}
              <Button
                variant="text"
                size="small"
                sx={{ textTransform: 'none', p: 0 }}
                onClick={handleSendResetEmail}
              >
                Resend
              </Button>
            </Typography>
          </Box>
        )}

        {/* Step 2: New Password */}
        {step === 2 && (
          <Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Enter your new password below.
            </Typography>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
              size="small"
              disabled={loading}
              sx={{ mb: 1.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              placeholder="Enter new password"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              size="small"
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              placeholder="Confirm password"
            />
          </Box>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CheckCircle sx={{ fontSize: 80, color: '#10b981', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Password Reset Successful!
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Your password has been successfully reset. You can now login with your new password.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={handleClose} variant="text" disabled={loading}>
          {step === 3 ? 'Close' : 'Cancel'}
        </Button>
        {step < 3 && (
          <Button
            onClick={
              step === 0
                ? handleSendResetEmail
                : step === 1
                ? handleVerifyCode
                : handleSetNewPassword
            }
            variant="contained"
            disabled={loading}
            sx={{
              background: 'linear-gradient(135deg, #0ea5a9 0%, #0d9488 100%)',
            }}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : step === 0 ? (
              'Send Code'
            ) : step === 1 ? (
              'Verify'
            ) : (
              'Reset Password'
            )}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
