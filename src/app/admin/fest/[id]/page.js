'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Typography, Box, TextField, Grid, Paper } from '@mui/material';

export default function AdminFestivalEdit({ params }) {
  const [festival, setFestival] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchFestival();
  }, []);

  const fetchFestival = async () => {
    const res = await fetch('/api/festival-pages');
    const data = await res.json();
    const foundFestival = data.find(fest => fest.id === params.id);
    if (foundFestival) {
      setFestival(foundFestival);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFestival(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const res = await fetch('/api/festival-pages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(festival)
    });

    if (res.ok) {
      router.push('/admin/fest');
    }
  };

  if (!festival) {
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
          Edit Festival: {festival.name}
        </Typography>

        <Paper sx={{ p: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ID"
                name="id"
                value={festival.id}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={festival.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={festival.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Image URL"
                name="image"
                value={festival.image}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="URL Path"
                name="href"
                value={festival.href}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleUpdate} variant="contained">
                Update Festival
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}