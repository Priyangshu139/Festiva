'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Typography, Box, TextField, Grid, Paper } from '@mui/material';

export default function AdminBundleEdit({ params }) {
  const [bundle, setBundle] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchBundle();
  }, []);

  const fetchBundle = async () => {
    const res = await fetch('/api/festival-bundles');
    const data = await res.json();
    const foundBundle = data.find(b => b.name === params.name);
    if (foundBundle) {
      setBundle({
        ...foundBundle,
        item: foundBundle.item.join(','),
        image: foundBundle.image.join(','),
        quantity: foundBundle.quantity.join(',')
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBundle(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const res = await fetch('/api/festival-bundles', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...bundle,
        item: bundle.item.split(','),
        image: bundle.image.split(','),
        quantity: bundle.quantity.split(',').map(Number)
      })
    });

    if (res.ok) {
      router.push('/admin/bundle');
    }
  };

  if (!bundle) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Loading...
          </Typography>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Edit Bundle: {bundle.name}
        </Typography>

        <Paper sx={{ p: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={bundle.name}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Festival"
                name="fest"
                value={bundle.fest}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={bundle.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Items (comma separated)"
                name="item"
                value={bundle.item}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantities (comma separated)"
                name="quantity"
                value={bundle.quantity}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Image URLs (comma separated)"
                name="image"
                value={bundle.image}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={bundle.price}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleUpdate} variant="contained">
                Update Bundle
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}