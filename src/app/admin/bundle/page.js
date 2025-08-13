'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Typography, Box, TextField, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function AdminBundles() {
  const [bundles, setBundles] = useState([]);
  const [newBundle, setNewBundle] = useState({
    name: '',
    description: '',
    item: '',
    image: '',
    fest: '',
    price: 0,
    quantity: ''
  });
  const router = useRouter();

  useEffect(() => {
    fetchBundles();
  }, []);

  const fetchBundles = async () => {
    try {
      const res = await fetch('/api/festival-bundles');
      if (res.ok) {
        const data = await res.json();
        setBundles(data);
      } else {
        console.error('Failed to fetch bundles');
      }
    } catch (error) {
      console.error('Error fetching bundles:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBundle(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBundle = async () => {
    try {
      const res = await fetch('/api/festival-bundles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newBundle,
          item: newBundle.item.split(','),
          image: newBundle.image.split(','),
          quantity: newBundle.quantity.split(',').map(Number)
        })
      });

      if (res.ok) {
        setNewBundle({
          name: '',
          description: '',
          item: '',
          image: '',
          fest: '',
          price: 0,
          quantity: ''
        });
        fetchBundles();
      } else {
        const errorData = await res.json();
        console.error('Failed to add bundle:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error adding bundle:', error);
    }
  };

  const handleDelete = async (name) => {
    try {
      const res = await fetch('/api/festival-bundles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      if (res.ok) {
        fetchBundles();
      } else {
        const errorData = await res.json();
        console.error('Failed to delete bundle:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error deleting bundle:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin - Festival Bundles
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add New Bundle
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={newBundle.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Festival"
                name="fest"
                value={newBundle.fest}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={newBundle.description}
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
                value={newBundle.item}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantities (comma separated)"
                name="quantity"
                value={newBundle.quantity}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Image URLs (comma separated)"
                name="image"
                value={newBundle.image}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={newBundle.price}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleAddBundle} variant="contained">
                Add Bundle
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Existing Bundles
          </Typography>
          <List>
            {bundles.map((bundle) => (
              <React.Fragment key={bundle.name}>
                <ListItem>
                  <ListItemText
                    primary={bundle.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" display="block">
                          {bundle.description}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Button
                            onClick={() => router.push(`/admin/bundle/${bundle.name}`)}
                            variant="text"
                            size="small"
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(bundle.name)}
                            variant="text"
                            color="error"
                            size="small"
                          >
                            Delete
                          </Button>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}