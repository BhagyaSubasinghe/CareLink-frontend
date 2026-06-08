import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  Chip,
  Rating,
  LinearProgress,
  Alert,
  Button,
} from '@mui/material';
import ReceiptUploader from '../components/ReceiptUploader';
import './Pharmacy.css';

function Pharmacy() {
  const [uploadedMedicines, setUploadedMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedQuery, setCheckedQuery] = useState('');
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);

  const handleMedicinesExtracted = (medicines) => {
    setUploadedMedicines(medicines);
  };

  const getStockStatus = (stock) => {
    if (stock > 100) return { label: 'In Stock', color: 'success' };
    if (stock > 20) return { label: 'Limited Stock', color: 'warning' };
    return { label: 'Low Stock', color: 'error' };
  };

  const totalMedicines = uploadedMedicines.length;
  const totalCost = uploadedMedicines.reduce(
    (sum, medicine) => sum + medicine.price * (medicine.quantity || 1),
    0
  );
  const availableCount = uploadedMedicines.filter((medicine) => medicine.stock > 20).length;
  const normalizedQuery = checkedQuery.trim().toLowerCase();
  const filteredMedicines = uploadedMedicines.filter((medicine) => {
    const query = normalizedQuery;
    if (!query) return true;

    return [medicine.name, medicine.brand, medicine.dosage, medicine.type]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
  });
  const selectedMedicine = uploadedMedicines.find((medicine) => medicine.id === selectedMedicineId) || null;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckAvailability = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    setCheckedQuery(query);
    setAvailabilityChecked(true);

    if (!query) {
      setSelectedMedicineId(null);
      return;
    }

    const matches = uploadedMedicines.filter((medicine) => {
      const normalized = query.toLowerCase();
      return [medicine.name, medicine.brand, medicine.dosage, medicine.type]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalized));
    });

    setSelectedMedicineId(matches[0]?.id || null);
  };

  const handleSelectMedicine = (medicine) => {
    setSelectedMedicineId(medicine.id);
  };

  const clearSelection = () => {
    setSelectedMedicineId(null);
  };

  return (
    <Container className="pharmacy-root">
      <Box className="pharmacy-hero" sx={{ mb: 4 }}>
        <Box className="hero-content">
          <Typography variant="h4" className="hero-title">
            Upload Medical Receipt
          </Typography>
          <Typography variant="body1" className="hero-description">
            Upload your receipt first to extract medicines and review availability.
          </Typography>
        </Box>
      </Box>

      <Box className="pharmacy-content">
        <ReceiptUploader onMedicinesExtracted={handleMedicinesExtracted} />

        <Box className="availability-section" sx={{ mt: 5 }}>
          <Box className="availability-header">
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                Medicine Availability
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Prices and availability extracted from your receipt.
              </Typography>
            </Box>
            {totalMedicines > 0 && (
              <Chip
                label={`${totalMedicines} medicine${totalMedicines === 1 ? '' : 's'} found`}
                sx={{ backgroundColor: '#ecfeff', color: '#0f766e', fontWeight: 600 }}
              />
            )}
          </Box>

          {totalMedicines === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              Upload a receipt to see extracted medicines, stock availability, and pricing.
            </Alert>
          ) : (
            <>
              <Box className="medicine-search-panel" sx={{ mt: 3, mb: 3 }}>
                <Box component="form" onSubmit={handleCheckAvailability} className="medicine-search-form">
                  <TextField
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search medicines by name, brand, dosage, or type"
                    className="medicine-search-field"
                  />
                  <Box className="medicine-search-actions">
                    <Button type="submit" variant="contained" className="check-availability-button">
                      Check Availability
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => {
                        setSearchQuery('');
                        setCheckedQuery('');
                        setAvailabilityChecked(false);
                        setSelectedMedicineId(null);
                      }}
                    >
                      Reset
                    </Button>
                  </Box>
                </Box>
                <Box className="medicine-search-meta">
                  <Typography variant="body2" color="textSecondary">
                    {availabilityChecked
                      ? `Found ${filteredMedicines.length} match${filteredMedicines.length === 1 ? '' : 'es'} for "${checkedQuery}"`
                      : 'Enter a medicine name and check availability'}
                  </Typography>
                  {searchQuery && !availabilityChecked && (
                    <Button size="small" onClick={() => setSearchQuery('')}>
                      Clear search
                    </Button>
                  )}
                </Box>
              </Box>

              {availabilityChecked && (
                <Alert severity={filteredMedicines.length > 0 ? 'success' : 'warning'} sx={{ mb: 3 }}>
                  {filteredMedicines.length > 0
                    ? `${filteredMedicines[0].name} is available in your receipt list. Select a medicine to view price and stock details.`
                    : `No extracted medicines match "${checkedQuery}". Try a different name, brand, or dosage.`}
                </Alert>
              )}

              <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <Card className="availability-summary-card">
                    <CardContent>
                      <Typography variant="caption" color="textSecondary">
                        Medicines Extracted
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f766e' }}>
                        {totalMedicines}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card className="availability-summary-card">
                    <CardContent>
                      <Typography variant="caption" color="textSecondary">
                        Available Medicines
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f766e' }}>
                        {availableCount}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card className="availability-summary-card">
                    <CardContent>
                      <Typography variant="caption" color="textSecondary">
                        Estimated Total Price
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f766e' }}>
                        ₹{totalCost}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {selectedMedicine && (
                <Card className="selected-medicine-card" sx={{ mb: 3 }}>
                  <CardContent>
                    <Box className="selected-medicine-header">
                      <Box>
                        <Typography variant="overline" color="textSecondary">
                          Selected Medicine
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {selectedMedicine.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {selectedMedicine.brand} • {selectedMedicine.dosage} • {selectedMedicine.type}
                        </Typography>
                      </Box>
                      <Button variant="text" onClick={clearSelection}>
                        Clear
                      </Button>
                    </Box>

                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        label={getStockStatus(selectedMedicine.stock).label}
                        color={getStockStatus(selectedMedicine.stock).color}
                        variant="outlined"
                      />
                      <Chip
                        label={selectedMedicine.requiresPrescription ? 'Rx Only' : 'OTC'}
                        variant="outlined"
                      />
                      <Chip label={`₹${selectedMedicine.price} each`} sx={{ backgroundColor: '#ecfeff', color: '#0f766e' }} />
                    </Box>

                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                      {selectedMedicine.uses}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {filteredMedicines.length === 0 ? (
                <Alert severity="warning">
                  No medicines match your search. Try a different name, brand, or dosage.
                </Alert>
              ) : null}

              <Grid container spacing={2}>
                {[...filteredMedicines]
                  .sort((a, b) => b.stock - a.stock || b.rating - a.rating)
                  .map((medicine) => {
                    const stockStatus = getStockStatus(medicine.stock);
                    const isSelected = medicine.id === selectedMedicineId;
                    return (
                      <Grid item xs={12} md={6} key={medicine.id}>
                        <Card
                          className={`availability-card ${isSelected ? 'availability-card-selected' : ''}`}
                          onClick={() => handleSelectMedicine(medicine)}
                          role="button"
                          tabIndex={0}
                        >
                          <CardContent>
                            <Box className="availability-card-top">
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                  {medicine.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                  {medicine.brand} • {medicine.dosage}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                  <Chip
                                    label={stockStatus.label}
                                    color={stockStatus.color}
                                    size="small"
                                    variant="outlined"
                                  />
                                  <Chip
                                    label={medicine.requiresPrescription ? 'Rx Only' : 'OTC'}
                                    size="small"
                                    variant="outlined"
                                  />
                                </Box>
                              </Box>
                              <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f766e' }}>
                                  ₹{medicine.price}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  Qty {medicine.quantity || 1}
                                </Typography>
                              </Box>
                            </Box>

                            <Button
                              size="small"
                              variant={isSelected ? 'contained' : 'outlined'}
                              onClick={(event) => {
                                event.stopPropagation();
                                handleSelectMedicine(medicine);
                              }}
                              sx={{ mt: 2 }}
                            >
                              {isSelected ? 'Selected' : 'Select medicine'}
                            </Button>

                            <Box sx={{ mt: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="caption" color="textSecondary">
                                  Stock level
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  {medicine.stock}
                                </Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={(medicine.stock / 200) * 100}
                                sx={{ height: 8, borderRadius: 999 }}
                              />
                            </Box>

                            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Rating value={medicine.rating} readOnly size="small" />
                              <Typography variant="caption" color="textSecondary">
                                {medicine.reviews} reviews
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Pharmacy;
