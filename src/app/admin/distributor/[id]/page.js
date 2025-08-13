'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Typography, Box, TextField, Grid, Paper } from '@mui/material';

export default function AdminDistributorEdit({ params }) {
  const [distributor, setDistributor] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchDistributor();
  }, []);

  const fetchDistributor = async () => {
    // In a real app, this would fetch from an API
    // For now, we'll use mock data
    const mockDistributors = [
      { id: '1', name: 'Diwali Decor Ltd.', phone: '9988776655', address: '123 Diwali St', email: 'diwali@example.com' },
      { id: '2', name: 'Holi Colors Inc.', phone: '9988776644', address: '456 Holi Ave', email: 'holi@example.com' }
    ];

    const foundDistributor = mockDistributors.find(d => d.id === params.id);
    if (foundDistributor) {
      setDistributor(foundDistributor);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDistributor(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    // In a real app, this would PUT to an API
    router.push('/admin/distributor');
  };

  if (!distributor) {
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
          Edit Distributor: {distributor.name}
        </Typography>

        <Paper sx={{ p: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ID"
                name="id"
                value={distributor.id}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={distributor.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                value={distributor.phone}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={distributor.email}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={distributor.address}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleUpdate} variant="contained">
                Update Distributor
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}