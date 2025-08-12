'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Grid, Typography, Box, Paper, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';

const mockOrders = [
  {
    id: 'FEST-001',
    date: '10 Aug 2025',
    status: 'Delivered',
    total: 1748,
    items: [
      { name: 'Complete Diwali Bundle', quantity: 1 },
      { name: 'Decorative Brass Diya', quantity: 1 },
    ],
  },
  {
    id: 'FEST-002',
    date: '05 Aug 2025',
    status: 'Shipped',
    total: 1499,
    items: [
      { name: 'Complete Holi Bash Bundle', quantity: 1 },
    ],
  },
  {
    id: 'FEST-003',
    date: '01 Aug 2025',
    status: 'Processing',
    total: 3499,
    items: [
      { name: 'Complete Navratri Celebration Bundle', quantity: 1 },
    ],
  },
  {
    id: 'FEST-004',
    date: '28 Jul 2025',
    status: 'Cancelled',
    total: 848,
    items: [
      { name: 'Traditional Diya Set', quantity: 1 },
      { name: 'Rangoli Kit', quantity: 1 },
    ],
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
              Order #{order.id}
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
            {order.items.map((item, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemText
                  primary={item.name}
                  secondary={`Qty: ${item.quantity}`}
                />
              </ListItem>
            ))}
          </List>
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
              <OrderCard key={order.id} order={order} />
            ))}
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
}