import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import { CloudUpload, Delete, Check } from '@mui/icons-material';

// Mock OCR extraction function
const extractMedicinesFromReceipt = (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate OCR extraction with realistic mock medicines
      resolve([
        {
          id: 101,
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
          quantity: 1,
        },
        {
          id: 102,
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
          quantity: 2,
        },
      ]);
    }, 2000);
  });
};

export default function ReceiptUploader({ onMedicinesExtracted = () => {} }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [extractedMedicines, setExtractedMedicines] = useState([]);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    setError(null);
    setLoading(true);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result);
    };
    reader.readAsDataURL(file);

    try {
      const medicines = await extractMedicinesFromReceipt(file);
      setExtractedMedicines(medicines);
      onMedicinesExtracted(medicines);
    } catch (err) {
      setError('Failed to extract medicines from receipt. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMedicine = (id) => {
    const updated = extractedMedicines.filter((m) => m.id !== id);
    setExtractedMedicines(updated);
    if (updated.length === 0) {
      onMedicinesExtracted([]);
      setPreview(null);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Upload Medical Receipt
      </Typography>

      <Paper className="receipt-uploader" sx={{ p: 4, textAlign: 'center', border: '2px dashed #0ea5a9' }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {!loading && extractedMedicines.length === 0 && (
          <>
            <CloudUpload sx={{ fontSize: 64, color: '#0ea5a9', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Upload your medical receipt
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Our smart OCR technology will automatically extract medicines from your receipt
            </Typography>
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              onClick={() => fileInputRef.current?.click()}
              size="large"
            >
              Choose File
            </Button>
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 2 }}>
              Supported formats: JPG, PNG, PDF (Max 5MB)
            </Typography>
          </>
        )}

        {loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography>Extracting medicines from receipt...</Typography>
          </Box>
        )}
      </Paper>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {preview && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Receipt Preview
          </Typography>
          <Box
            component="img"
            src={preview}
            alt="Receipt preview"
            sx={{ maxWidth: '100%', maxHeight: 300, borderRadius: 1, border: '1px solid #e5e7eb' }}
          />
        </Box>
      )}

      {extractedMedicines.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            <Check sx={{ mr: 1 }} />
            Successfully extracted {extractedMedicines.length} medicines from your receipt
          </Alert>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Medicine Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Brand</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Dosage</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {extractedMedicines.map((medicine) => (
                  <TableRow key={medicine.id}>
                    <TableCell sx={{ fontWeight: 500 }}>{medicine.name}</TableCell>
                    <TableCell>{medicine.brand}</TableCell>
                    <TableCell>{medicine.dosage}</TableCell>
                    <TableCell>₹{medicine.price}</TableCell>
                    <TableCell>{medicine.quantity}</TableCell>
                    <TableCell>
                      {medicine.requiresPrescription ? (
                        <Chip label="Rx" size="small" color="warning" variant="outlined" />
                      ) : (
                        <Chip label="OTC" size="small" color="success" variant="outlined" />
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => handleRemoveMedicine(medicine.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="text"
            onClick={() => {
              setExtractedMedicines([]);
              setPreview(null);
              fileInputRef.current?.click();
            }}
            sx={{ mt: 2 }}
          >
            Upload Another Receipt
          </Button>
        </Box>
      )}
    </Box>
  );
}
