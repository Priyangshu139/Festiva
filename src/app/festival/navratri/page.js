'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/Card';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import { Container, Grid, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const navratriBundles = [
  {
    id: 'garba-outfit',
    name: 'Traditional Garba Outfit',
    description: 'Look your best for the Garba nights.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1608754482805-6f0a3040a8b2?w=400&h=300&fit=crop',
    items: [
        { name: 'Embroidered Chaniya Choli or Kurta', quantity: 1, description: 'Vibrant and comfortable for dancing.' },
        { name: 'Bandhani Dupatta', quantity: 1, description: 'A traditional and colorful scarf.' },
    ]
  },
  {
    id: 'dandiya-sticks',
    name: 'Decorated Dandiya Sticks',
    description: 'Dance the night away with these beautiful dandiyas.',
    price: 399,
    image: 'https://images.unsplash.com/photo-1540492889253-96f1d6f5b017?w=400&h=300&fit=crop',
    items: [
        { name: 'Hand-painted Wooden Dandiya Sticks', quantity: '1 Pair', description: 'Lightweight and easy to handle.' },
    ]
  },
  {
    id: 'pooja-kit',
    name: 'Navratri Pooja Kit',
    description: 'All the essentials for your daily pooja.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1603807022287-78de1b3f3a3a?w=400&h=300&fit=crop',
    items: [
        { name: 'Red Mata ki Chunri', quantity: 1, description: 'A sacred cloth for the goddess.' },
        { name: 'Brass Diya and Akhand Jyot', quantity: 1, description: 'For continuous light.' },
        { name: 'Sandalwood Incense Sticks', quantity: '1 pack', description: 'For a divine fragrance.' },
    ]
  },
  {
    id: 'complete-navratri',
    name: 'Complete Navratri Celebration Bundle',
    description: 'Get ready for a complete Navratri experience.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1608754482805-6f0a3040a8b2?w=400&h=300&fit=crop',
    items: [
        { name: 'Traditional Garba Outfit', quantity: 1, description: 'A complete outfit for the festivities.' },
        { name: 'Decorated Dandiya Sticks', quantity: '1 Pair', description: 'To dance the night away.' },
        { name: 'Navratri Pooja Kit', quantity: 1, description: 'All your pooja essentials.' },
    ]
  }
];

export default function NavratriPage() {
  const { addToCart } = useCart();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'blue.500', color: 'white', py: 6 }}>
        <Container>
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            Navratri Collection
          </Typography>
          <Typography variant="h5" component="p" align="center">
            Dance the nights away with our festive Navratri collection
          </Typography>
        </Container>
      </Box>

      {/* Bundles Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Navratri Bundles
        </Typography>

        <Grid container spacing={4}>
          {navratriBundles.map((bundle) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={bundle.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 4 } }}>
                <CardImage src={bundle.image} alt={bundle.name} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <CardTitle>{bundle.name}</CardTitle>
                  <CardDescription>{bundle.description}</CardDescription>
                  <Box sx={{ my: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      What's Included:
                    </Typography>
                    <List sx={{ listStyleType: 'disc', pl: 2 }}>
                      {bundle.items.map((item, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', py: 0.5 }}>
                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                {item.name} - {item.description}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" color="text.secondary">
                                x{item.quantity}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Box sx={{ mt: 'auto' }}>
                    <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', color: 'blue.600' }}>
                      ₹{bundle.price}
                    </Typography>
                    <Button
                      onClick={() => addToCart(bundle)}
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}