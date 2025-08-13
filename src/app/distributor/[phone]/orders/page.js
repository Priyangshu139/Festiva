'use client';

import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Container, Typography } from '@mui/material';

import React from 'react';

export default function DistributorOrdersPage({ params }) {
  const unwrappedParams = React.use(Promise.resolve(params));
  const { phone } = unwrappedParams;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, [phone]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/distributors/${phone}/orders`);
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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Orders for Distributor {phone}
      </Typography>

      <List>
        {orders.map((order) => (
          <ListItem key={order.transactionId} divider>
            <ListItemText
              primary={`Order #${order.transactionId}`}
              secondary={
                <>
                  <div>Phone: {order.phone}</div>
                  <div>Total: ₹{order.total}</div>
                  <div>Items: {order.items.length}</div>
                  <div>Bundles: {order.bundles.length}</div>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}