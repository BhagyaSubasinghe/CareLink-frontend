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
  DirectionsCarOutlined
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
    <>
    <Box sx={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      
      {/* Hero Section - Full Width */}
      <Box sx={{ 
        background: 'linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%)', 
        pt: { xs: 6, md: 8 }, 
        pb: { xs: 10, md: 12 },
        width: '100vw',
        ml: 'calc(50% - 50vw)',
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: '800', mb: 3, color: '#003399' }}>
            Get in Touch
          </Typography>
          <Typography variant="body1" sx={{ color: '#4b5563', lineHeight: 1.6 }}>
            Your health and well-being are our top priorities. Whether you have a question about our services, need to schedule an appointment, or require billing assistance, our dedicated team is here to support you every step of the way.
          </Typography>
        </Container>
      </Box>

      {/* Main Form Section - Centered Container */}
      <Container maxWidth="lg" sx={{ pb: 8, mt: -4 }}>
        <Grid container spacing={4} sx={{ maxWidth: '1000px', mx: 'auto' }}>
          {/* Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#fff', height: '100%' }}>
              <Typography variant="h5" sx={{ mb: 4, fontWeight: '700', color: '#1f2937' }}>
                Send us a Message
              </Typography>

              {submitted && (
              <Alert severity="success" icon={<CheckCircle />} sx={{ mb: 3 }}>
                ✅ Thank you! Your message has been sent successfully. We'll respond within the estimated time.
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="message-form">
              <Stack spacing={2.5}>
                {/* Row 1: Name and Email */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#08306b', mb: 0.5 }}>
                      Full Name
                    </Typography>
                    <TextField
                      fullWidth
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      placeholder="John Doe"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#08306b', mb: 0.5 }}>
                      Email Address
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      placeholder="john@example.com"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                {/* Row 2: Phone and Department */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#08306b', mb: 0.5 }}>
                      Phone Number
                    </Typography>
                    <TextField
                      fullWidth
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      placeholder="+1 (555) 000-0000"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#08306b', mb: 0.5 }}>
                      Department
                    </Typography>
                    <FormControl fullWidth error={!!errors.department}>
                      <Select
                        name="department"
                        value={formData.department || ''}
                        onChange={handleChange}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>General Inquiry</MenuItem>
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
                  </Grid>
                </Grid>

                {/* Message */}
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#08306b', mb: 0.5 }}>
                    Message
                  </Typography>
                  <TextField
                    fullWidth
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    placeholder="How can we help you today?"
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Box>

                {/* Submit Button */}
                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    className="send-button"
                    sx={{
                      backgroundColor: '#08306b',
                      color: 'white',
                      padding: '10px 24px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#06204a',
                      },
                      borderRadius: '6px',
                      mt: 2,
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Grid>

        {/* Quick Contact + Department Directory */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
            <Card className="contact-quick-card" elevation={0} sx={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#003399', color: '#fff', p: { xs: 2, md: 3 } }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: '600', color: '#fff', mb: 3 }}>
                  Quick Contact
                </Typography>

                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', p: 1, borderRadius: '50%', display: 'flex' }}>
                      <Phone sx={{ fontSize: '1.2rem' }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#cde7ff' }}>24/7 Helpline</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>1-800-CARE-LINK</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', p: 1, borderRadius: '50%', display: 'flex' }}>
                      <Email sx={{ fontSize: '1.2rem' }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#cde7ff' }}>Email Support</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>contact@carelink.health</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', p: 1, borderRadius: '50%', display: 'flex' }}>
                      <LocationOn sx={{ fontSize: '1.2rem' }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#cde7ff' }}>Physical Address</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>123 Healthcare Plaza,<br/>Medical District</Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card className="department-directory" elevation={0} sx={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#eef2ff', p: { xs: 2, md: 3 }, border: '1px solid #dbeafe', flexGrow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: '700', color: '#003399' }}>
                  Department Directory
                </Typography>
                <Stack spacing={2} divider={<Box sx={{ height: '1px', backgroundColor: 'rgba(0,51,153,0.1)' }} />}>
                  {[
                    { name: 'Emergency', ext: '911', color: '#d32f2f' },
                    { name: 'Pharmacy', ext: 'Ext. 402', color: '#003399' },
                    { name: 'Laboratory', ext: 'Ext. 515', color: '#003399' },
                    { name: 'Billing Dept.', ext: 'Ext. 209', color: '#003399' },
                  ].map((d) => (
                    <Box key={d.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, pb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>{d.name}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: d.color }}>{d.ext}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
      </Container>

      {/* Locations Section - Full width background container */}
      <Box className="locations-section" sx={{ 
        width: '100vw', 
        ml: 'calc(50% - 50vw)', 
        backgroundColor: '#f4f7ff', 
        py: { xs: 6, md: 10 } 
      }}>
        <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#08306b', mb: 1 }}>
            Our Locations
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Find a CareLink facility near you
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ height: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e2e8f0', minHeight: '350px' }}>
               {/* Map Placeholder image background could be inserted here. Using fallback style */}
               <Box sx={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />
               <Button variant="contained" sx={{ bgcolor: 'white', color: '#08306b', zIndex: 1, borderRadius: '24px', fontWeight: 'bold', '&:hover': { bgcolor: '#f8fafc' } }} startIcon={<LocationOn sx={{ color: '#08306b' }} />}>
                 Interactive Map (Placeholder)
               </Button>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              {[
                { title: 'CareLink Main Campus', addr: '123 Healthcare Plaza, Medical District, NY 10001', tag: 'Open 24/7', tagBg: '#a7f3d0', tagColor: '#065f46' },
                { title: 'CareLink Westside Clinic', addr: '456 West River Dr. Riverside, NY 10023', tag: '8AM - 8PM', tagBg: '#f1f5f9', tagColor: '#475569' },
                { title: 'CareLink Pediatric Center', addr: '88 Kids Care Rd, Medical City, NY 10045', tag: '9AM - 5PM', tagBg: '#f1f5f9', tagColor: '#475569' }
              ].map((loc) => (
                <Card key={loc.title} elevation={0} sx={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <CardContent sx={{ p: '24px !important' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a' }}>{loc.title}</Typography>
                      <Chip label={loc.tag} size="small" sx={{ backgroundColor: loc.tagBg, color: loc.tagColor, fontWeight: 700, fontSize: '0.7rem', height: '22px' }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>{loc.addr}</Typography>
                    
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#08306b' }}>
                        <DirectionsCarOutlined sx={{ fontSize: '1.2rem', mr: 0.5 }} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>Get Directions</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#08306b' }}>
                        <AccessTime sx={{ fontSize: '1.2rem', mr: 0.5 }} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>View Hours</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
        </Container>
      </Box>

    {/* Bottom Emergency Banner */}
    <Box sx={{ 
      backgroundColor: '#003399', 
      color: 'white', 
      py: 4, 
      width: '100vw',
      ml: 'calc(50% - 50vw)',
    }}>
      <Container maxWidth="lg">
        <Grid container alignItems="center" justifyContent="space-between" spacing={3}>
          <Grid item xs={12} md={7}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Need immediate medical attention?
            </Typography>
            <Typography variant="body2" sx={{ color: '#e0f2ff' }}>
              Our emergency rooms are staffed with specialists 24/7.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: 'white', color: '#003399', fontWeight: 'bold', px: 3, '&:hover': { backgroundColor: '#f0f4ff' } }}>
              Find Nearest ER
            </Button>
            <Button variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white', fontWeight: 'bold', px: 3, '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              Call Dispatch
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </Box>
    </>
  );
};

export default Contact;
