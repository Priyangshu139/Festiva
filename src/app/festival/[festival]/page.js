'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/Card';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import { Container, Grid, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import festivalBundles from '@/data/festivalBundles';

export default function FestivalPage() {
  const { festival } = useParams();
  const { addToCart } = useCart();

  // Filter bundles by festival name
  const filteredBundles = festivalBundles.filter(bundle => bundle.fest === festival);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'orange.500', color: 'white', py: 6 }}>
        <Container>
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            {festival.charAt(0).toUpperCase() + festival.slice(1)} Collection
          </Typography>
          <Typography variant="h5" component="p" align="center">
            Celebrate {festival} with our curated essentials
          </Typography>
        </Container>
      </Box>

      {/* Bundles Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          {festival.charAt(0).toUpperCase() + festival.slice(1)} Bundles
        </Typography>

        <Grid container spacing={4}>
          {filteredBundles.map((bundle) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={bundle.name}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 4 } }}>
                <CardImage src={bundle.image[0]} alt={bundle.name} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <CardTitle>{bundle.name}</CardTitle>
                  <CardDescription>{bundle.description}</CardDescription>
                  <Box sx={{ my: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      What's Included:
                    </Typography>
                    <List sx={{ listStyleType: 'disc', pl: 2 }}>
                      {bundle.item.map((item, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', py: 0.5 }}>
                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                {item} - {bundle.quantity[index]} pcs
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Box sx={{ mt: 'auto' }}>
                    <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', color: 'orange.600' }}>
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