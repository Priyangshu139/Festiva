'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Typography, Box, Grid, Paper, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';

const statusColors = {
  Processing: { bgcolor: 'warning.light', color: 'warning.dark' },
  Shipped: { bgcolor: 'info.light', color: 'info.dark' },
  Delivered: { bgcolor: 'success.light', color: 'success.dark' },
  Cancelled: { bgcolor: 'error.light', color: 'error.dark' },
  Pending: { bgcolor: 'grey.400', color: 'grey.900' }, // Added Pending status
  default: { bgcolor: 'grey.300', color: 'grey.800' }, // Fallback for unknown statuses
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDelete = async (transactionId) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId })
      });

      if (res.ok) {
        fetchOrders();
      } else {
        const errorData = await res.json();
        console.error('Failed to delete order:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin - Orders
        </Typography>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Existing Orders
          </Typography>
          <List>
            {orders.map((order) => (
              <React.Fragment key={order.transactionId}>
                <ListItem>
                  <ListItemText
                    primary={`Order #${order.transactionId}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" display="block">
                          {order.date} - ₹{order.total}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Chip
                            label={order.status}
                            sx={{
                              bgcolor: (statusColors[order.status] || statusColors.default).bgcolor,
                              color: (statusColors[order.status] || statusColors.default).color,
                              fontWeight: 'medium',
                              mr: 1
                            }}
                            size="small"
                          />
                          <Button
                            onClick={() => router.push(`/admin/orders/${order.transactionId}`)}
                            variant="text"
                            size="small"
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(order.transactionId)}
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