'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Typography, Box, TextField, Grid, Paper } from '@mui/material';

export default function AdminItemEdit({ params }) {
  const [item, setItem] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    const res = await fetch('/api/items');
    const data = await res.json();
    const foundItem = data.find(item => item.id === params.id);
    if (foundItem) {
      setItem({
        ...foundItem,
        tags: foundItem.tags.join(','),
        image: foundItem.image.join(',')
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const res = await fetch('/api/items', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...item,
        tags: item.tags.split(','),
        image: item.image.split(',')
      })
    });

    if (res.ok) {
      router.push('/admin/item');
    }
  };

  if (!item) {
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
          Edit Item: {item.name}
        </Typography>

        <Paper sx={{ p: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ID"
                name="id"
                value={item.id}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={item.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={item.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tags (comma separated)"
                name="tags"
                value={item.tags}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Image URLs (comma separated)"
                name="image"
                value={item.image}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Rating"
                name="rating"
                type="number"
                value={item.rating}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Distributor"
                name="distributor"
                value={item.distributor}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Inventory"
                name="inventory"
                type="number"
                value={item.inventory}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={item.price}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleUpdate} variant="contained">
                Update Item
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}