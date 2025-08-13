'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { List, ListItem, ListItemText, TextField, Button, Container, Typography, Box } from '@mui/material';

import React from 'react';

export default function DistributorItemPage({ params }) {
  const unwrappedParams = React.use(Promise.resolve(params));
  const { phone } = unwrappedParams;
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    tags: '',
    image: '',
    rating: 0,
    distributor: phone,
    inventory: 0,
    price: 0
  });
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, [phone]);

  const fetchItems = async () => {
    try {
      const res = await fetch(`/api/distributors/${phone}/items`);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      } else {
        console.error('Failed to fetch items');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      const res = await fetch(`/api/distributors/${phone}/items`, {
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
          name: '',
          description: '',
          tags: '',
          image: '',
          rating: 0,
          distributor: phone,
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
      const res = await fetch(`/api/distributors/${phone}/items`, {
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

  const handleEdit = (id) => {
    router.push(`/distributor/${phone}/item/${id}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Items for Distributor {phone}
      </Typography>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Add New Item
        </Typography>
        <TextField
          label="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tags (comma separated)"
          value={newItem.tags}
          onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URLs (comma separated)"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rating"
          type="number"
          value={newItem.rating}
          onChange={(e) => setNewItem({ ...newItem, rating: Number(e.target.value) })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Inventory"
          type="number"
          value={newItem.inventory}
          onChange={(e) => setNewItem({ ...newItem, inventory: Number(e.target.value) })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          type="number"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Add Item
        </Button>
      </Box>

      <List>
        {items.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText
              primary={item.name}
              secondary={
                <>
                  <div>{item.description}</div>
                  <div>Price: ₹{item.price}</div>
                  <div>Inventory: {item.inventory}</div>
                </>
              }
            />
            <Button onClick={() => handleEdit(item.id)}>Edit</Button>
            <Button onClick={() => handleDelete(item.id)} color="secondary">
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}