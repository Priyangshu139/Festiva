'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Typography, Box, TextField, Grid, Paper, List, ListItem, ListItemText, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function AdminOrderEdit({ params }) {
  const [order, setOrder] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const res = await fetch('/api/orders');
    const data = await res.json();
    const foundOrder = data.find(o => o.transactionId === params.id);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const res = await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });

    if (res.ok) {
      router.push('/admin/orders');
    }
  };

  if (!order) {
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
          Edit Order: {order.transactionId}
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Transaction ID"
                name="transactionId"
                value={order.transactionId}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                name="date"
                value={order.date}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                value={order.phone}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                name="address"
                value={order.address}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={order.status}
                  onChange={handleInputChange}
                  label="Status"
                >
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total"
                name="total"
                type="number"
                value={order.total}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Items in this order
          </Typography>
          <List>
            {[...order.bundle, ...order.item].map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item}
                  secondary={`Qty: ${order.quantity[index]}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Box sx={{ mt: 4 }}>
          <Button onClick={handleUpdate} variant="contained">
            Update Order
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}