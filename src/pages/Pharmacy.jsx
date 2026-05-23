import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Rating,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search,
  CloudUpload,
  LocalPharmacy,
  TrendingUp,
  LocationOn,
  Star,
  Check,
  Close,
  Info,
} from '@mui/icons-material';
import MedicineCard from '../components/MedicineCard';
import ReceiptUploader from '../components/ReceiptUploader';
import PharmacyLocator from '../components/PharmacyLocator';
import './Pharmacy.css';

const mockMedicines = [
  {
    id: 1,
    name: 'Aspirin 500mg',
    brand: 'Bayer',
    price: 250,
    dosage: '500mg',
    type: 'Tablet',
    stock: 85,
    rating: 4.5,
    reviews: 128,
    uses: 'Pain relief, fever reduction',
    sideEffects: 'Upset stomach, bleeding',
    requiresPrescription: false,
    image: 'paracitamol.jpg',
  },
  {
    id: 2,
    name: 'Amoxicillin 500mg',
    brand: 'Cipla',
    price: 180,
    dosage: '500mg',
    type: 'Capsule',
    stock: 45,
    rating: 4.7,
    reviews: 256,
    uses: 'Bacterial infection treatment',
    sideEffects: 'Allergic reactions, diarrhea',
    requiresPrescription: true,
    image: 'citrazine.jpg',
  },
  {
    id: 3,
    name: 'Paracetamol 650mg',
    brand: 'GSK',
    price: 45,
    dosage: '650mg',
    type: 'Tablet',
    stock: 150,
    rating: 4.6,
    reviews: 342,
    uses: 'Fever, headache, body pain',
    sideEffects: 'Rare liver complications',
    requiresPrescription: false,
    image: 'digital thermometer.jpg',
  },
  {
    id: 4,
    name: 'Metformin 500mg',
    brand: 'Dr. Reddy',
    price: 120,
    dosage: '500mg',
    type: 'Tablet',
    stock: 200,
    rating: 4.8,
    reviews: 512,
    uses: 'Diabetes management',
    sideEffects: 'Gastrointestinal issues',
    requiresPrescription: true,
    image: 'nutrition.jpg',
  },
  {
    id: 5,
    name: 'Atorvastatin 10mg',
    brand: 'Ranbaxy',
    price: 280,
    dosage: '10mg',
    type: 'Tablet',
    stock: 60,
    rating: 4.4,
    reviews: 189,
    uses: 'Cholesterol management',
    sideEffects: 'Muscle pain, liver issues',
    requiresPrescription: true,
    image: 'monitoring.jpg',
  },
  {
    id: 6,
    name: 'Omeprazole 20mg',
    brand: 'Sun Pharma',
    price: 95,
    dosage: '20mg',
    type: 'Capsule',
    stock: 120,
    rating: 4.6,
    reviews: 234,
    uses: 'Acid reflux, GERD',
    sideEffects: 'Headache, nausea',
    requiresPrescription: false,
    image: 'personal care.jpg',
  },
];

function Pharmacy() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [uploadedMedicines, setUploadedMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [medicineDialogOpen, setMedicineDialogOpen] = useState(false);
  const [priceSort, setPriceSort] = useState('asc');
  const [prescriptionFilter, setPrescriptionFilter] = useState('all');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Smart Feature: Smart Search with suggestions
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 0) {
      const results = mockMedicines.filter(
        (medicine) =>
          medicine.name.toLowerCase().includes(query) ||
          medicine.brand.toLowerCase().includes(query) ||
          medicine.uses.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Smart Feature: Filter by prescription requirement
  const getFilteredMedicines = () => {
    let medicines = searchResults.length > 0 ? searchResults : mockMedicines;

    if (prescriptionFilter === 'rx') {
      medicines = medicines.filter((m) => m.requiresPrescription);
    } else if (prescriptionFilter === 'otc') {
      medicines = medicines.filter((m) => !m.requiresPrescription);
    }

    // Sort by price
    return medicines.sort((a, b) =>
      priceSort === 'asc' ? a.price - b.price : b.price - a.price
    );
  };

  // Smart Feature: Add to cart
  const handleAddToCart = (medicine, quantity) => {
    const existingItem = cart.find((item) => item.id === medicine.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...medicine, quantity }]);
    }
  };

  // Smart Feature: Process receipt upload
  const handleReceiptUpload = (medicines) => {
    setUploadedMedicines(medicines);
    setTabValue(2); // Go to availability check tab
  };

  // Smart Feature: Check stock status
  const getStockStatus = (stock) => {
    if (stock > 100) return { label: 'In Stock', color: 'success' };
    if (stock > 20) return { label: 'Limited Stock', color: 'warning' };
    return { label: 'Low Stock', color: 'error' };
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchResults([]);
    setSearchQuery('');
  };

  const filteredMedicines = getFilteredMedicines();
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
    <Container className="pharmacy-root">
      {/* Hero Section */}
      <Box className="pharmacy-hero">
        <Box className="hero-content">
          <Typography variant="h4" className="hero-title">
            Your Neighborhood Clinical Pharmacy
          </Typography>
          <Typography variant="body1" className="hero-description">
            Accurate dispensing, verified availability, and hassle-free delivery. Simply upload your prescription for a quick check.
          </Typography>
        </Box>
      </Box>

      {/* Browse Categories Section */}
      <Box className="browse-categories-section" sx={{ mt: 5, mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              Browse Categories
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Surgically-selected healthcare essentials.
            </Typography>
          </Box>
          <Button variant="text" sx={{ color: '#0ea5a9', fontWeight: 600 }}>
            View All Catalog →
          </Button>
        </Box>
        <Grid container spacing={2}>
          {[
            { name: 'OTC Medicine', image: 'OTC medicine.jpg' },
            { name: 'Personal Care', image: 'personal care.jpg' },
            { name: 'Monitoring', image: 'monitoring.jpg' },
            { name: 'Nutrition', image: 'nutrition.jpg' },
          ].map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  cursor: 'pointer',
                  height: '200px',
                  backgroundImage: `url('${require(`../assest/pharmacy/${category.image}`)}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'flex-end',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    zIndex: 1,
                  },
                }}
              >
                <Box sx={{ p: 2, zIndex: 2, width: '100%' }}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    {category.name}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Commonly Prescribed Section */}
      <Box className="commonly-prescribed-section" sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Commonly Prescribed
        </Typography>
        <Grid container spacing={3}>
          {mockMedicines.slice(0, 3).map((medicine) => (
            <Grid item xs={12} sm={6} md={4} key={medicine.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <Box
                  sx={{
                    height: '200px',
                    backgroundImage: `url('${require(`../assest/pharmacy/${medicine.image}`)}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <Chip
                    label={medicine.requiresPrescription ? 'RX Only' : 'OTC'}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      backgroundColor: '#10b981',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5 }}>
                    {medicine.type}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {medicine.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2, flex: 1 }}>
                    {medicine.uses}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 700 }}>
                      ₹{medicine.price}
                    </Typography>
                    <Rating value={medicine.rating} readOnly size="small" />
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: '#0ea5a9',
                      '&:hover': {
                        backgroundColor: '#0d9097',
                      },
                    }}
                    onClick={() => handleAddToCart(medicine, 1)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        className="pharmacy-tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Upload Receipt" icon={<CloudUpload />} iconPosition="start" />
        <Tab label="Check Availability" icon={<Check />} iconPosition="start" />
        <Tab label="Top Rated" icon={<Star />} iconPosition="start" />
        <Tab label="Find Pharmacies" icon={<LocationOn />} iconPosition="start" />
      </Tabs>

      {/* Tab Content */}
      <Box className="pharmacy-content">
        {/* Tab 1: Upload Receipt */}
        {tabValue === 0 && (
          <Box>
            <ReceiptUploader onMedicinesExtracted={handleReceiptUpload} />
          </Box>
        )}

        {/* Tab 2: Check Availability */}
        {tabValue === 1 && (
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Uploaded Medicines Availability
            </Typography>
            {uploadedMedicines.length === 0 ? (
              <Alert severity="warning">
                No medicines uploaded yet. Please upload a receipt first.
              </Alert>
            ) : (
              <Grid container spacing={2}>
                {uploadedMedicines.map((medicine) => {
                  const stockStatus = getStockStatus(medicine.stock);
                  return (
                    <Grid item xs={12} key={medicine.id}>
                      <Card className="availability-card">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {medicine.name}
                              </Typography>
                              <Typography color="textSecondary" sx={{ mb: 1 }}>
                                {medicine.brand} • {medicine.dosage}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                                <Chip
                                  icon={stockStatus.label.includes('In Stock') ? <Check /> : <Info />}
                                  label={stockStatus.label}
                                  color={stockStatus.color}
                                  size="small"
                                  variant="outlined"
                                />
                                {medicine.requiresPrescription && (
                                  <Chip label="Requires Prescription" size="small" variant="outlined" />
                                )}
                              </Box>
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="caption">Stock Level</Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={(medicine.stock / 200) * 100}
                                  sx={{ mt: 0.5 }}
                                />
                              </Box>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="h5" sx={{ color: '#10b981', fontWeight: 700 }}>
                                ₹{medicine.price}
                              </Typography>
                              <Rating value={medicine.rating} readOnly size="small" sx={{ mt: 1 }} />
                              <Typography variant="caption" color="textSecondary">
                                ({medicine.reviews} reviews)
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        )}

        {/* Tab 3: Top Rated */}
        {tabValue === 2 && (
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Top Rated Medicines
            </Typography>
            <Grid container spacing={2}>
              {mockMedicines
                .sort((a, b) => b.rating - a.rating)
                .map((medicine) => (
                  <Grid item xs={12} sm={6} md={4} key={medicine.id}>
                    <MedicineCard
                      medicine={medicine}
                      onViewDetails={() => {
                        setSelectedMedicine(medicine);
                        setMedicineDialogOpen(true);
                      }}
                      onAddToCart={handleAddToCart}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}

        {/* Tab 4: Find Pharmacies */}
        {tabValue === 3 && <PharmacyLocator />}
      </Box>

      {/* Medicine Details Dialog */}
      <Dialog open={medicineDialogOpen} onClose={() => setMedicineDialogOpen(false)} maxWidth="sm" fullWidth>
        {selectedMedicine && (
          <>
            <DialogTitle sx={{ fontWeight: 600 }}>{selectedMedicine.name}</DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Brand
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>{selectedMedicine.brand}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Dosage
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>{selectedMedicine.dosage}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Type
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>{selectedMedicine.type}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Price
                    </Typography>
                    <Typography sx={{ fontWeight: 500, color: '#10b981' }}>₹{selectedMedicine.price}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="textSecondary">
                    Uses
                  </Typography>
                  <Typography sx={{ mb: 1 }}>{selectedMedicine.uses}</Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="textSecondary">
                    Possible Side Effects
                  </Typography>
                  <Typography sx={{ mb: 1 }}>{selectedMedicine.sideEffects}</Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Rating value={selectedMedicine.rating} readOnly sx={{ mb: 1 }} />
                  <Typography variant="caption" color="textSecondary">
                    {selectedMedicine.reviews} customer reviews
                  </Typography>
                </Box>

                {selectedMedicine.requiresPrescription && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    This medicine requires a valid prescription to purchase.
                  </Alert>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setMedicineDialogOpen(false)}>Close</Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleAddToCart(selectedMedicine, 1);
                  setMedicineDialogOpen(false);
                }}
              >
                Add to Cart
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
    </>
  );
}

export default Pharmacy;
