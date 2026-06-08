import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ title, value, icon, link, navigate }) => (
  <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      {icon}
    </Box>
    <Typography variant="h3" component="div" sx={{ mb: 2, flexGrow: 1 }}>
      {value}
    </Typography>
    <Button variant="outlined" onClick={() => navigate(link)}>
      Manage
    </Button>
  </Paper>
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DashboardCard 
            title="Total Users" 
            value="150" 
            icon={<PeopleIcon color="primary" fontSize="large" />} 
            link="/admin/users"
            navigate={navigate}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard 
            title="Total Doctors" 
            value="24" 
            icon={<LocalHospitalIcon color="secondary" fontSize="large" />} 
            link="/admin/doctors"
            navigate={navigate}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard 
            title="Appointments Today" 
            value="35" 
            icon={<EventAvailableIcon color="success" fontSize="large" />} 
            link="/admin/appointments"
            navigate={navigate}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
