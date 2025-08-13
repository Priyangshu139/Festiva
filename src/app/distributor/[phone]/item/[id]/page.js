'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

import React from 'react';

export default function EditItemPage({ params }) {
  const unwrappedParams = React.use(Promise.resolve(params));
  const { phone, id } = unwrappedParams;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchItem();
  }, [phone, id]);

  const fetchItem = async () => {
    try {
      const res = await fetch(`/api/distributors/${phone}/items/${id}`);
      if (res.ok) {
        const data = await res.json();
        setItem(data);
      } else {
        console.error('Failed to fetch item');
      }
    } catch (error) {
      console.error('Error fetching item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/distributors/${phone}/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });

      if (res.ok) {
        router.push(`/distributor/${phone}/item`);
      } else {
        const errorData = await res.json();
        console.error('Failed to update item:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleChange = (field, value) => {
    setItem(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (!item) {
    return <Container>Item not found</Container>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Item: {item.name}
      </Typography>

      <Box mb={4}>
        <TextField
          label="Name"
          value={item.name}
          onChange={(e) => handleChange('name', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={item.description}
          onChange={(e) => handleChange('description', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tags (comma separated)"
          value={item.tags.join(',')}
          onChange={(e) => handleChange('tags', e.target.value.split(','))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URLs (comma separated)"
          value={item.image.join(',')}
          onChange={(e) => handleChange('image', e.target.value.split(','))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rating"
          type="number"
          value={item.rating}
          onChange={(e) => handleChange('rating', Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Inventory"
          type="number"
          value={item.inventory}
          onChange={(e) => handleChange('inventory', Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          type="number"
          value={item.price}
          onChange={(e) => handleChange('price', Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Item
        </Button>
        <Button variant="outlined" onClick={() => router.push(`/distributor/${phone}/item`)} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
}