'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Typography, Box, TextField, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function AdminFestivals() {
  const [festivals, setFestivals] = useState([]);
  const [newFestival, setNewFestival] = useState({
    id: '',
    name: '',
    description: '',
    image: '',
    href: ''
  });
  const router = useRouter();

  useEffect(() => {
    fetchFestivals();
  }, []);

  const fetchFestivals = async () => {
    try {
      const res = await fetch('/api/festival-pages');
      if (res.ok) {
        const data = await res.json();
        setFestivals(data);
      } else {
        console.error('Failed to fetch festivals');
      }
    } catch (error) {
      console.error('Error fetching festivals:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFestival(prev => ({ ...prev, [name]: value }));
  };

  const handleAddFestival = async () => {
    try {
      const res = await fetch('/api/festival-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFestival)
      });

      if (res.ok) {
        setNewFestival({
          id: '',
          name: '',
          description: '',
          image: '',
          href: ''
        });
        fetchFestivals();
      } else {
        const errorData = await res.json();
        console.error('Failed to add festival:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error adding festival:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch('/api/festival-pages', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        fetchFestivals();
      } else {
        const errorData = await res.json();
        console.error('Failed to delete festival:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error deleting festival:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin - Festivals
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add New Festival
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ID"
                name="id"
                value={newFestival.id}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={newFestival.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={newFestival.description}
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
                value={newFestival.image}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="URL Path"
                name="href"
                value={newFestival.href}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleAddFestival} variant="contained">
                Add Festival
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Existing Festivals
          </Typography>
          <List>
            {festivals.map((festival) => (
              <React.Fragment key={festival.id}>
                <ListItem>
                  <ListItemText
                    primary={festival.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" display="block">
                          {festival.description}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Button
                            onClick={() => router.push(`/admin/fest/${festival.id}`)}
                            variant="text"
                            size="small"
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(festival.id)}
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