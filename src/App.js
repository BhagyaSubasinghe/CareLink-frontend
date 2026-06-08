import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import BookAppointment from './pages/BookAppointment';
import AppointmentSuccess from './pages/AppointmentSuccess';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import Pharmacy from './pages/Pharmacy';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageDoctors from './pages/admin/ManageDoctors';
import ManageAppointments from './pages/admin/ManageAppointments';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Box minHeight="100vh" display="flex" flexDirection="column" bgcolor="#fff" color="#222">
        <Navbar />
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<BookAppointment />} />
            <Route path="/appointment-success" element={<AppointmentSuccess />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
            <Route path="/admin/doctors" element={<AdminRoute><ManageDoctors /></AdminRoute>} />
            <Route path="/admin/appointments" element={<AdminRoute><ManageAppointments /></AdminRoute>} />
          </Routes>
        </Container>
        <Footer />
        <ChatWidget />
      </Box>
    </BrowserRouter>
  );
}

export default App;
