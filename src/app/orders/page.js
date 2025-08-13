'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Grid, Typography, Box, Paper, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';

const mockOrders = [
  {
    phone: '9876543210',
    bundle: ['Complete Diwali Bundle'],
    item: ['Decorative Brass Diya'],
    total: 1748,
    quantity: [1, 1],
    distributorPhone: '9988776655',
    address: '123 Main St, Mumbai, India',
    status: 'Delivered',
    date: '10 Aug 2025',
    transactionId: 'TXN1234567890',
  },
  {
    phone: '9876543210',
    bundle: ['Complete Holi Bash Bundle'],
    item: [],
    total: 1499,
    quantity: [1],
    distributorPhone: '9988776655',
    address: '123 Main St, Mumbai, India',
    status: 'Shipped',
    date: '05 Aug 2025',
    transactionId: 'TXN1234567891',
  },
  {
    phone: '9876543210',
    bundle: ['Complete Navratri Celebration Bundle'],
    item: [],
    total: 3499,
    quantity: [1],
    distributorPhone: '9988776655',
    address: '123 Main St, Mumbai, India',
    status: 'Processing',
    date: '01 Aug 2025',
    transactionId: 'TXN1234567892',
  },
  {
    phone: '9876543210',
    bundle: [],
    item: ['Traditional Diya Set', 'Rangoli Kit'],
    total: 848,
    quantity: [1, 1],
    distributorIndex: [0],
    address: '123 Main St, Mumbai, India',
    status: 'Cancelled',
    date: '28 Jul 2025',
    transactionId: 'TXN1234567893',
  },
];

const statusColors = {
  Processing: { bgcolor: 'warning.light', color: 'warning.dark' },
  Shipped: { bgcolor: 'info.light', color: 'info.dark' },
  Delivered: { bgcolor: 'success.light', color: 'success.dark' },
  Cancelled: { bgcolor: 'error.light', color: 'error.dark' },
};

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Paper sx={{ mb: 3 }}>
      <Box sx={{ p: 3, cursor: 'pointer' }} onClick={() => setIsExpanded(!isExpanded)}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Order #{order.transactionId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Placed on {order.date}
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              label={order.status}
              sx={{
                bgcolor: statusColors[order.status].bgcolor,
                color: statusColors[order.status].color,
                fontWeight: 'medium',
              }}
              size="small"
            />
            <Typography variant="h6" sx={{ mt: 1, textAlign: 'right' }}>
              ₹{order.total}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {isExpanded && (
        <Box sx={{ borderTop: 1, borderColor: 'divider', p: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Items in this order:
          </Typography>
          <List>
            {[...order.bundle, ...order.item].map((item, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemText
                  primary={item}
                  secondary={`Qty: ${order.quantity[index]}`}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Address:</strong> {order.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Distributor Index:</strong> {order.distributorIndex.join(', ')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Your Phone:</strong> {order.phone}
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default function OrdersPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Your Orders
        </Typography>

        {mockOrders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              You have no past orders.
            </Typography>
            <Button onClick={() => window.location.href = '/'} variant="contained">
              Start Shopping
            </Button>
          </Box>
        ) : (
          <Box>
            {mockOrders.map(order => (
              <OrderCard key={order.transactionId} order={order} />
            ))}
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
}