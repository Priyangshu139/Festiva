'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { List, ListItem, ListItemText, TextField, Button, Container, Typography, Box } from '@mui/material';

export default function DistributorBundlePage({ params }) {
  const { phone } = params;
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
  }, [phone]);

  const fetchBundles = async () => {
    try {
      const res = await fetch(`/api/distributors/${phone}/bundles`);
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

  const handleAddBundle = async () => {
    try {
      const res = await fetch(`/api/distributors/${phone}/bundles`, {
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
      const res = await fetch(`/api/distributors/${phone}/bundles`, {
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

  const handleEdit = (name) => {
    router.push(`/distributor/${phone}/bundle/${encodeURIComponent(name)}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Bundles for Distributor {phone}
      </Typography>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Add New Bundle
        </Typography>
        <TextField
          label="Name"
          value={newBundle.name}
          onChange={(e) => setNewBundle({ ...newBundle, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={newBundle.description}
          onChange={(e) => setNewBundle({ ...newBundle, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Item IDs (comma separated)"
          value={newBundle.item}
          onChange={(e) => setNewBundle({ ...newBundle, item: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URLs (comma separated)"
          value={newBundle.image}
          onChange={(e) => setNewBundle({ ...newBundle, image: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Festival ID"
          value={newBundle.fest}
          onChange={(e) => setNewBundle({ ...newBundle, fest: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          type="number"
          value={newBundle.price}
          onChange={(e) => setNewBundle({ ...newBundle, price: Number(e.target.value) })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantities (comma separated)"
          value={newBundle.quantity}
          onChange={(e) => setNewBundle({ ...newBundle, quantity: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddBundle}>
          Add Bundle
        </Button>
      </Box>

      <List>
        {bundles.map((bundle) => (
          <ListItem key={bundle.name} divider>
            <ListItemText
              primary={bundle.name}
              secondary={
                <>
                  <div>{bundle.description}</div>
                  <div>Price: ₹{bundle.price}</div>
                  <div>Festival: {bundle.fest}</div>
                </>
              }
            />
            <Button onClick={() => handleEdit(bundle.name)}>Edit</Button>
            <Button onClick={() => handleDelete(bundle.name)} color="secondary">
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}