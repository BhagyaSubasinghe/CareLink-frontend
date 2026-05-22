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
import Footer from '../components/Footer';
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

        {/* Upload Prescription Section */}
        <Box className="upload-prescription-box">
          <Box className="upload-icon">
            <CloudUpload sx={{ fontSize: '3rem', color: '#0ea5a9' }} />
          </Box>
          <Typography variant="h6" className="upload-title">
            Upload Prescription
          </Typography>
          <Typography variant="body2" className="upload-description">
            Drag and drop your medical prescription here or click to browse.
          </Typography>
          <Button
            variant="contained"
            className="upload-button"
            onClick={() => setTabValue(1)}
            sx={{
              mt: 2,
              backgroundColor: '#0ea5a9',
              '&:hover': {
                backgroundColor: '#0d9097',
              },
            }}
          >
            Select Document
          </Button>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        className="pharmacy-tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Search Medicines" icon={<Search />} iconPosition="start" />
        <Tab label="Upload Receipt" icon={<CloudUpload />} iconPosition="start" />
        <Tab label="Check Availability" icon={<Check />} iconPosition="start" />
        <Tab label="Top Rated" icon={<Star />} iconPosition="start" />
        <Tab label="Find Pharmacies" icon={<LocationOn />} iconPosition="start" />
      </Tabs>

      {/* Tab Content */}
      <Box className="pharmacy-content">
        {/* Tab 1: Search Medicines */}
        {tabValue === 0 && (
          <Box>
            <Box className="search-section">
              <TextField
                fullWidth
                placeholder="Search by medicine name, brand, or condition..."
                value={searchQuery}
                onChange={handleSearch}
                variant="outlined"
                size="large"
                className="medicine-search-field"
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: '#0ea5a9' }} />,
                }}
              />
              <Box className="filter-chips">
                <Chip
                  label="All"
                  onClick={() => setPrescriptionFilter('all')}
                  variant={prescriptionFilter === 'all' ? 'filled' : 'outlined'}
                />
                <Chip
                  label="OTC Only"
                  onClick={() => setPrescriptionFilter('otc')}
                  variant={prescriptionFilter === 'otc' ? 'filled' : 'outlined'}
                />
                <Chip
                  label="Prescription Only"
                  onClick={() => setPrescriptionFilter('rx')}
                  variant={prescriptionFilter === 'rx' ? 'filled' : 'outlined'}
                />
                <TextField
                  select
                  size="small"
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                  variant="outlined"
                  className="sort-select"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </TextField>
              </Box>
            </Box>

            {searchQuery && searchResults.length === 0 && (
              <Alert severity="info">
                No medicines found matching "{searchQuery}". Try searching by brand or condition.
              </Alert>
            )}

            <Grid container spacing={2} className="medicines-grid">
              {filteredMedicines.map((medicine) => (
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

        {/* Tab 2: Upload Receipt */}
        {tabValue === 1 && (
          <Box>
            <ReceiptUploader onMedicinesExtracted={handleReceiptUpload} />
          </Box>
        )}

        {/* Tab 3: Check Availability */}
        {tabValue === 2 && (
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

        {/* Tab 4: Top Rated */}
        {tabValue === 3 && (
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

        {/* Tab 5: Find Pharmacies */}
        {tabValue === 4 && <PharmacyLocator />}
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
    <Footer />
    </>
  );
}

export default Pharmacy;
