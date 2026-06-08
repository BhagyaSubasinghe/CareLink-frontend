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

const initialDoctors = [
  { id: 1, name: 'Dr. Sarah Connor', specialty: 'Cardiologist', email: 'sarah.c@carelink.com', status: 'Available' },
  { id: 2, name: 'Dr. Michael Chang', specialty: 'Dermatologist', email: 'm.chang@carelink.com', status: 'On Leave' },
  { id: 3, name: 'Dr. Emily Chen', specialty: 'Pediatrician', email: 'emily.chen@carelink.com', status: 'Available' },
  { id: 4, name: 'Dr. James Wilson', specialty: 'Neurologist', email: 'j.wilson@carelink.com', status: 'Available' },
];

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState(initialDoctors);

  const handleDelete = (id) => {
    setDoctors(doctors.filter(doc => doc.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Manage Doctors
        </Typography>
        <Button variant="contained" color="primary">
          Add New Doctor
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="doctors table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Specialty</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{doctor.id}</TableCell>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={doctor.status} 
                    color={doctor.status === 'Available' ? 'success' : 'warning'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" aria-label="delete" onClick={() => handleDelete(doctor.id)}>
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

export default ManageDoctors;
