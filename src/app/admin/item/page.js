'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Typography, Box, TextField, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function AdminItems() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    description: '',
    tags: '',
    image: '',
    rating: 0,
    distributor: '',
    inventory: 0,
    price: 0
  });
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/items');
    if (res.ok) {
      const data = await res.json();
      setItems(data);
    } else {
      console.error('Failed to fetch items');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async () => {
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newItem,
          tags: newItem.tags.split(','),
          image: newItem.image.split(',')
        })
      });

      if (res.ok) {
        setNewItem({
          id: '',
          name: '',
          description: '',
          tags: '',
          image: '',
          rating: 0,
          distributor: '',
          inventory: 0,
          price: 0
        });
        fetchItems();
      } else {
        const errorData = await res.json();
        console.error('Failed to add item:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch('/api/items', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        fetchItems();
      } else {
        const errorData = await res.json();
        console.error('Failed to delete item:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin - Items
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add New Item
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ID"
                name="id"
                value={newItem.id}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={newItem.description}
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
                value={newItem.tags}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Image URLs (comma separated)"
                name="image"
                value={newItem.image}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Rating"
                name="rating"
                type="number"
                value={newItem.rating}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Distributor"
                name="distributor"
                value={newItem.distributor}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Inventory"
                name="inventory"
                type="number"
                value={newItem.inventory}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={newItem.price}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleAddItem} variant="contained">
                Add Item
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Existing Items
          </Typography>
          <List>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" display="block">
                          {item.description}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Button
                            onClick={() => router.push(`/admin/item/${item.id}`)}
                            variant="text"
                            size="small"
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.id)}
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