import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  IconButton,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialAppointments = [
  { id: 101, patientName: 'John Doe', doctorName: 'Dr. Sarah Connor', date: '2023-11-15', time: '10:00 AM', status: 'Confirmed' },
  { id: 102, patientName: 'Jane Smith', doctorName: 'Dr. Michael Chang', date: '2023-11-16', time: '02:30 PM', status: 'Pending' },
  { id: 103, patientName: 'Bob Wilson', doctorName: 'Dr. Emily Chen', date: '2023-11-16', time: '11:15 AM', status: 'Cancelled' },
  { id: 104, patientName: 'Alice Brown', doctorName: 'Dr. James Wilson', date: '2023-11-17', time: '09:00 AM', status: 'Confirmed' },
];

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleDelete = (id) => {
    setAppointments(appointments.filter(app => app.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'success';
      case 'Pending': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Manage Appointments
        </Typography>
        <Button variant="contained" color="primary">
          Add New Appointment
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="appointments table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{appointment.id}</TableCell>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <Chip 
                    label={appointment.status} 
                    color={getStatusColor(appointment.status)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" aria-label="delete" onClick={() => handleDelete(appointment.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageAppointments;
