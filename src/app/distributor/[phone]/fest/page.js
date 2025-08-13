'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { List, ListItem, ListItemText, TextField, Button, Container, Typography, Box } from '@mui/material';

import React from 'react';

export default function DistributorFestPage({ params }) {
  const unwrappedParams = React.use(Promise.resolve(params));
  const { phone } = unwrappedParams;
  const [festivals, setFestivals] = useState([]);
  const [newFestival, setNewFestival] = useState({
    name: '',
    description: '',
    image: '',
    href: '',
    distributor: phone
  });
  const router = useRouter();

  useEffect(() => {
    fetchFestivals();
  }, [phone]);

  const fetchFestivals = async () => {
    try {
      const res = await fetch(`/api/distributors/${phone}/festivals`);
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

  const handleAddFestival = async () => {
    try {
      const res = await fetch(`/api/distributors/${phone}/festivals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFestival)
      });

      if (res.ok) {
        setNewFestival({
          name: '',
          description: '',
          image: '',
          href: '',
          distributor: phone
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
      const res = await fetch(`/api/distributors/${phone}/festivals`, {
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

  const handleEdit = (id) => {
    router.push(`/distributor/${phone}/fest/${id}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Festivals for Distributor {phone}
      </Typography>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Add New Festival
        </Typography>
        <TextField
          label="Name"
          value={newFestival.name}
          onChange={(e) => setNewFestival({ ...newFestival, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={newFestival.description}
          onChange={(e) => setNewFestival({ ...newFestival, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URL"
          value={newFestival.image}
          onChange={(e) => setNewFestival({ ...newFestival, image: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL Path"
          value={newFestival.href}
          onChange={(e) => setNewFestival({ ...newFestival, href: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddFestival}>
          Add Festival
        </Button>
      </Box>

      <List>
        {festivals.map((fest) => (
          <ListItem key={fest.id} divider>
            <ListItemText
              primary={fest.name}
              secondary={
                <>
                  <div>{fest.description}</div>
                  <div>URL: {fest.href}</div>
                </>
              }
            />
            <Button onClick={() => handleEdit(fest.id)}>Edit</Button>
            <Button onClick={() => handleDelete(fest.id)} color="secondary">
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}