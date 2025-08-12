'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/Card';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import { Container, Grid, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const diwaliBundles = [
  {
    id: 'diya-set',
    name: 'Traditional Diya Set',
    description: 'A classic set for a warm, traditional glow.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=400&h=300&fit=crop',
    items: [
      { name: 'Handcrafted Clay Diyas', quantity: 12, description: 'Earthen lamps, perfect for lighting up your home.' },
      { name: 'Pure Cow Ghee Wicks', quantity: 12, description: 'Ready-to-use wicks for a long-lasting flame.' },
    ]
  },
  {
    id: 'rangoli-kit',
    name: 'Vibrant Rangoli Kit',
    description: 'Unleash your creativity with this complete rangoli set.',
    price: 449,
    image: 'https://images.unsplash.com/photo-1608754482805-6f0a3040a8b2?w=400&h=300&fit=crop',
    items: [
      { name: 'Assorted Organic Colors', quantity: '5 packs', description: 'Skin-friendly, vibrant colors.' },
      { name: 'Intricate Design Stencils', quantity: 3, description: 'Create beautiful patterns with ease.' },
      { name: 'Floating Decorative Diyas', quantity: 4, description: 'Add a touch of elegance to your rangoli.' },
    ]
  },
  {
    id: 'sweet-box',
    name: 'Festive Sweet Box',
    description: 'A delicious assortment of traditional Diwali sweets.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=300&fit=crop',
    items: [
      { name: 'Motichoor Laddu', quantity: '250g', description: 'The quintessential Diwali sweet.' },
      { name: 'Kaju Katli', quantity: '250g', description: 'Rich and delicious cashew fudge.' },
      { name: 'Milk Peda', quantity: '250g', description: 'Creamy and delightful milk sweets.' },
    ]
  },
  {
    id: 'complete-diwali',
    name: 'Grand Diwali Celebration Bundle',
    description: 'Everything you need for a grand celebration.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=400&h=300&fit=crop',
    items: [
      { name: 'Traditional Diya Set', quantity: 1, description: 'Includes 12 diyas and wicks.' },
      { name: 'Vibrant Rangoli Kit', quantity: 1, description: 'Complete with colors and stencils.' },
      { name: 'Festive Sweet Box', quantity: 1, description: 'An assortment of our finest sweets.' },
      { name: 'Pooja Samagri Kit', quantity: 1, description: 'All essentials for your Diwali pooja.' },
    ]
  }
];

export default function DiwaliPage() {
  const { addToCart } = useCart();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'orange.500', color: 'white', py: 6 }}>
        <Container>
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            Diwali Collection
          </Typography>
          <Typography variant="h5" component="p" align="center">
            Light up your home with our curated Diwali essentials
          </Typography>
        </Container>
      </Box>

      {/* Bundles Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Diwali Bundles
        </Typography>

        <Grid container spacing={4}>
          {diwaliBundles.map((bundle) => (
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