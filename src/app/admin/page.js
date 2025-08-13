'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const adminSections = [
  { name: 'Items', path: '/admin/item' },
  { name: 'Festivals', path: '/admin/fest' },
  { name: 'Bundles', path: '/admin/bundle' },
  { name: 'Distributors', path: '/admin/distributor' },
  { name: 'Orders', path: '/admin/orders' }
];

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>

        <Grid container spacing={3}>
          {adminSections.map((section) => (
            <Grid item xs={12} sm={6} md={4} key={section.path}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  {section.name}
                </Typography>
                <Button
                  onClick={() => router.push(section.path)}
                  variant="contained"
                  fullWidth
                >
                  Manage {section.name}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}