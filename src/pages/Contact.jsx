import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Paper,
  InputAdornment,
  Rating,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  AccessTime,
  Message,
  CheckCircle,
  Send,
} from '@mui/icons-material';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    subject: '',
    message: '',
    priority: 'medium',
    contactMethod: 'email',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const departments = [
    'General Inquiry',
    'Appointment Support',
    'Technical Issues',
    'Billing & Payments',
    'Medical Records',
    'Feedback',
    'Emergency',
  ];

  const contactMethods = [
    { value: 'email', label: 'Email', icon: '📧' },
    { value: 'phone', label: 'Phone', icon: '☎️' },
    { value: 'chat', label: 'Live Chat', icon: '💬' },
    { value: 'message', label: 'Message', icon: '✉️' },
  ];

  const contactInfo = [
    {
      icon: <Phone sx={{ color: '#0ea5a9', fontSize: '2rem' }} />,
      label: 'Phone',
      value: '+1 (800) 123-4567',
      available: '24/7',
    },
    {
      icon: <Email sx={{ color: '#0ea5a9', fontSize: '2rem' }} />,
      label: 'Email',
      value: 'support@carelink.com',
      available: 'Response in 2-4 hours',
    },
    {
      icon: <LocationOn sx={{ color: '#0ea5a9', fontSize: '2rem' }} />,
      label: 'Address',
      value: '123 Healthcare Ave, Medical City, MC 12345',
      available: 'Mon-Fri 9AM-6PM',
    },
    {
      icon: <Message sx={{ color: '#0ea5a9', fontSize: '2rem' }} />,
      label: 'Live Chat',
      value: 'Available on website',
      available: 'Mon-Sat 10AM-8PM',
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.department) newErrors.department = 'Please select a department';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          department: '',
          subject: '',
          message: '',
          priority: 'medium',
          contactMethod: 'email',
        });
        setSubmitted(false);
      }, 5000);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#4caf50',
      medium: '#ff9800',
      high: '#f44336',
      urgent: '#8b0000',
    };
    return colors[priority];
  };

  const getResponseTime = (department) => {
    const times = {
      'Emergency': '5 minutes',
      'Technical Issues': '1 hour',
      'Appointment Support': '30 minutes',
      'Billing & Payments': '2-4 hours',
      'Medical Records': '24 hours',
      'General Inquiry': '24 hours',
      'Feedback': '48 hours',
    };
    return times[department] || '24-48 hours';
  };

  return (
    <Container maxWidth="lg" className="contact-container">
      {/* Header */}
      <Box className="contact-header" sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2, color: '#1a1a1a' }}>
          Get in Touch
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', maxWidth: '600px', mx: 'auto' }}>
          Have questions? We're here to help! Choose your preferred way to contact us and we'll get back to you as soon as possible.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {/* Contact Methods Cards */}
        {contactInfo.map((info, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card className="contact-card" elevation={2} sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Box sx={{ mb: 2 }}>{info.icon}</Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  {info.label}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: '#1a1a1a', fontWeight: '500' }}>
                  {info.value}
                </Typography>
                <Chip
                  label={info.available}
                  size="small"
                  sx={{ backgroundColor: '#e0f7fa', color: '#0ea5a9' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Form Section */}
      <Grid container spacing={4}>
        {/* Form */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} className="contact-form-wrapper" sx={{ p: 4, borderRadius: '8px' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1a1a1a' }}>
              Send us a Message
            </Typography>

            {submitted && (
              <Alert severity="success" icon={<CheckCircle />} sx={{ mb: 3 }}>
                ✅ Thank you! Your message has been sent successfully. We'll respond within the estimated time.
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                {/* Name */}
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  placeholder="Enter your full name"
                  variant="outlined"
                />

                {/* Email and Phone */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      placeholder="your@email.com"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: '#0ea5a9' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      placeholder="+1 (555) 000-0000"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone sx={{ color: '#0ea5a9' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Department Selection */}
                <FormControl fullWidth error={!!errors.department}>
                  <InputLabel>Department / Category</InputLabel>
                  <Select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    label="Department / Category"
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.department && (
                    <Typography variant="caption" sx={{ color: '#d32f2f', mt: 0.5 }}>
                      {errors.department}
                    </Typography>
                  )}
                </FormControl>

                {/* Response Time Display */}
                {formData.department && (
                  <Paper sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTime sx={{ color: '#0ea5a9', fontSize: '1.2rem' }} />
                      <Typography variant="body2">
                        <strong>Expected Response:</strong> {getResponseTime(formData.department)}
                      </Typography>
                    </Stack>
                  </Paper>
                )}

                {/* Subject */}
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={!!errors.subject}
                  helperText={errors.subject}
                  placeholder="Brief subject of your inquiry"
                  variant="outlined"
                />

                {/* Contact Method Preference */}
                <FormControl fullWidth>
                  <InputLabel>Preferred Contact Method</InputLabel>
                  <Select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    label="Preferred Contact Method"
                  >
                    {contactMethods.map((method) => (
                      <MenuItem key={method.value} value={method.value}>
                        {method.icon} {method.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Priority Level */}
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Priority Level
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {['low', 'medium', 'high', 'urgent'].map((level) => (
                      <Button
                        key={level}
                        variant={formData.priority === level ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, priority: level }))
                        }
                        sx={{
                          borderColor: getPriorityColor(level),
                          color:
                            formData.priority === level ? 'white' : getPriorityColor(level),
                          backgroundColor:
                            formData.priority === level ? getPriorityColor(level) : 'transparent',
                          textTransform: 'capitalize',
                          '&:hover': {
                            backgroundColor:
                              formData.priority === level ? getPriorityColor(level) : 'transparent',
                          },
                        }}
                      >
                        {level}
                      </Button>
                    ))}
                  </Stack>
                </Box>

                {/* Message */}
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  placeholder="Describe your inquiry in detail..."
                  variant="outlined"
                  multiline
                  rows={5}
                  maxRows={8}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#0ea5a9',
                    color: 'white',
                    padding: '12px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#0d8b8f',
                    },
                    borderRadius: '6px',
                    mt: 2,
                  }}
                  startIcon={<Send />}
                >
                  Send Message
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>

        {/* Quick Contact + Department Directory */}
        <Grid item xs={12} md={5}>
          <Card elevation={3} sx={{ mb: 3, borderRadius: '12px', overflow: 'hidden' }}>
            <Box sx={{ background: 'linear-gradient(180deg,#08306b,#0b5ed7)', color: '#fff', p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Quick Contact
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                24/7 Helpline
              </Typography>
            </Box>
            <CardContent sx={{ background: '#0b5ed7', color: '#fff' }}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#cde7ff' }}>Phone</Typography>
                  <Typography variant="h6" sx={{ fontWeight: '900', color: '#fff' }}>1-800-CARELINK</Typography>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: '#cde7ff' }}>Email Support</Typography>
                  <Typography variant="body2" sx={{ color: '#fff' }}>contact@carelink.health</Typography>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: '#cde7ff' }}>Physical Address</Typography>
                  <Typography variant="body2" sx={{ color: '#fff' }}>123 Healthcare Plaza, Medical District</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card elevation={1} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            <CardContent sx={{ background: '#eef8ff' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#08306b' }}>Department Directory</Typography>
              <Stack spacing={1.5}>
                {[
                  { name: 'Emergency', ext: '911' },
                  { name: 'Pharmacy', ext: 'Ext. 402' },
                  { name: 'Laboratory', ext: 'Ext. 515' },
                  { name: 'Billing Dept.', ext: 'Ext. 209' },
                ].map((d) => (
                  <Box key={d.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '8px 10px', borderRadius: '8px', background: '#fff' }}>
                    <Typography variant="body2" sx={{ color: '#08306b' }}>{d.name}</Typography>
                    <Typography variant="body2" sx={{ color: '#2563eb', fontWeight: 700 }}>{d.ext}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
