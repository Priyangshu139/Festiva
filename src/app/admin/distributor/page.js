'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Typography, Box, TextField, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function AdminDistributors() {
  const [distributors, setDistributors] = useState([]);
  const [newDistributor, setNewDistributor] = useState({
    id: '',
    name: '',
    phone: '',
    address: '',
    email: ''
  });
  const router = useRouter();

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      const res = await fetch('/api/distributors');
      if (res.ok) {
        const data = await res.json();
        setDistributors(data);
      } else {
        console.error('Failed to fetch distributors');
      }
    } catch (error) {
      console.error('Error fetching distributors:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDistributor(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDistributor = async () => {
    try {
      const res = await fetch('/api/distributors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDistributor)
      });

      if (res.ok) {
        setNewDistributor({
          id: '',
          name: '',
          phone: '',
          address: '',
          email: ''
        });
        fetchDistributors();
      } else {
        const errorData = await res.json();
        console.error('Failed to add distributor:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error adding distributor:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch('/api/distributors', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        fetchDistributors();
      } else {
        const errorData = await res.json();
        console.error('Failed to delete distributor:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error deleting distributor:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin - Distributors
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add New Distributor
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ID"
                name="id"
                value={newDistributor.id}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={newDistributor.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                value={newDistributor.phone}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={newDistributor.email}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={newDistributor.address}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleAddDistributor} variant="contained">
                Add Distributor
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Existing Distributors
          </Typography>
          <List>
            {distributors.map((distributor) => (
              <React.Fragment key={distributor.id}>
                <ListItem>
                  <ListItemText
                    primary={distributor.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" display="block">
                          {distributor.phone} - {distributor.email}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Button
                            onClick={() => router.push(`/distributor/${distributor.phone}/item`)}
                            variant="text"
                            size="small"
                            sx={{ mr: 1 }}
                          >
                            Manage Items
                          </Button>
                          <Button
                            onClick={() => router.push(`/distributor/${distributor.phone}/fest`)}
                            variant="text"
                            size="small"
                            sx={{ mr: 1 }}
                          >
                            Manage Festivals
                          </Button>
                          <Button
                            onClick={() => router.push(`/distributor/${distributor.phone}/bundle`)}
                            variant="text"
                            size="small"
                            sx={{ mr: 1 }}
                          >
                            Manage Bundles
                          </Button>
                          <Button
                            onClick={() => router.push(`/distributor/${distributor.phone}/orders`)}
                            variant="text"
                            size="small"
                            sx={{ mr: 1 }}
                          >
                            View Orders
                          </Button>
                          <Button
                            onClick={() => handleDelete(distributor.id)}
                            variant="text"
                            color="error"
                            size="small"
                          >
                            Delete
                          </Button>
                        </Box>
                      </>
                    }
                    secondaryTypographyProps={{ component: 'div' }}
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