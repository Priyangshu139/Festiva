'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

import React from 'react';

export default function EditFestPage({ params }) {
  const unwrappedParams = React.use(Promise.resolve(params));
  const { phone, id } = unwrappedParams;
  const [festival, setFestival] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchFestival();
  }, [phone, id]);

  const fetchFestival = async () => {
    try {
      const res = await fetch(`/api/distributors/${phone}/festivals/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFestival(data);
      } else {
        console.error('Failed to fetch festival');
      }
    } catch (error) {
      console.error('Error fetching festival:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/distributors/${phone}/festivals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(festival)
      });

      if (res.ok) {
        router.push(`/distributor/${phone}/fest`);
      } else {
        const errorData = await res.json();
        console.error('Failed to update festival:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating festival:', error);
    }
  };

  const handleChange = (field, value) => {
    setFestival(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (!festival) {
    return <Container>Festival not found</Container>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Festival: {festival.name}
      </Typography>

      <Box mb={4}>
        <TextField
          label="Name"
          value={festival.name}
          onChange={(e) => handleChange('name', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={festival.description}
          onChange={(e) => handleChange('description', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URL"
          value={festival.image}
          onChange={(e) => handleChange('image', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL Path"
          value={festival.href}
          onChange={(e) => handleChange('href', e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Festival
        </Button>
        <Button variant="outlined" onClick={() => router.push(`/distributor/${phone}/fest`)} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
}