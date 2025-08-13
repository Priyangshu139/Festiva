'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

export default async function EditBundlePage({ params }) {
  const { phone, id } = await params;
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBundle();
  }, [phone, id]);

  const fetchBundle = async () => {
    try {
      const res = await fetch(`/api/distributors/${phone}/bundles/${decodeURIComponent(id)}`);
      if (res.ok) {
        const data = await res.json();
        setBundle(data);
      } else {
        console.error('Failed to fetch bundle');
      }
    } catch (error) {
      console.error('Error fetching bundle:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/distributors/${phone}/bundles/${decodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bundle)
      });

      if (res.ok) {
        router.push(`/distributor/${phone}/bundle`);
      } else {
        const errorData = await res.json();
        console.error('Failed to update bundle:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating bundle:', error);
    }
  };

  const handleChange = (field, value) => {
    setBundle(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (!bundle) {
    return <Container>Bundle not found</Container>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Bundle: {bundle.name}
      </Typography>

      <Box mb={4}>
        <TextField
          label="Name"
          value={bundle.name}
          onChange={(e) => handleChange('name', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={bundle.description}
          onChange={(e) => handleChange('description', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Item IDs (comma separated)"
          value={bundle.item.join(',')}
          onChange={(e) => handleChange('item', e.target.value.split(','))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URLs (comma separated)"
          value={bundle.image.join(',')}
          onChange={(e) => handleChange('image', e.target.value.split(','))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Festival ID"
          value={bundle.fest}
          onChange={(e) => handleChange('fest', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          type="number"
          value={bundle.price}
          onChange={(e) => handleChange('price', Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantities (comma separated)"
          value={bundle.quantity.join(',')}
          onChange={(e) => handleChange('quantity', e.target.value.split(',').map(Number))}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Bundle
        </Button>
        <Button variant="outlined" onClick={() => router.push(`/distributor/${phone}/bundle`)} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
}