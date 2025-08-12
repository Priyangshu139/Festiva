'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/Card';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import { Container, Grid, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const holiBundles = [
  {
    id: 'herbal-colors',
    name: 'Herbal Colors Pack',
    description: 'Play safe with these skin-friendly organic colors.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1610630875035-f9d7bc2c2aed?w=400&h=300&fit=crop',
    items: [
        { name: 'Rose Pink Gulal', quantity: '100g', description: 'Made from rose petals.' },
        { name: 'Turmeric Yellow Gulal', quantity: '100g', description: 'A bright and natural yellow.' },
        { name: 'Neem Green Gulal', quantity: '100g', description: 'Infused with the goodness of neem.' },
        { name: 'Orchid Blue Gulal', quantity: '100g', description: 'A vibrant and playful blue.' },
    ]
  },
  {
    id: 'pichkari-set',
    name: 'Water Gun (Pichkari) Set',
    description: 'Drench your friends with these fun water guns.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1583339522870-0d9f212334aa?w=400&h=300&fit=crop',
    items: [
        { name: 'Pressure Pichkari', quantity: 1, description: 'A large water gun for maximum fun.' },
        { name: 'Designer Pichkari', quantity: 1, description: 'A smaller, stylish water gun.' },
    ]
  },
  {
    id: 'gujiya-box',
    name: 'Gujiya Sweet Box',
    description: 'The essential sweet treat for Holi celebrations.',
    price: 649,
    image: 'https://images.unsplash.com/photo-1616521621978-7a5a5a5a5a5a?w=400&h=300&fit=crop',
    items: [
        { name: 'Handmade Khoya Gujiyas', quantity: '1kg', description: 'Stuffed with sweetened khoya and dry fruits.' },
    ]
  },
  {
    id: 'complete-holi',
    name: 'Complete Holi Bash Bundle',
    description: 'Everything you need for the ultimate Holi party.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1610630875035-f9d7bc2c2aed?w=400&h=300&fit=crop',
    items: [
        { name: 'Herbal Colors Pack', quantity: 1, description: 'A set of 4 organic colors.' },
        { name: 'Pichkari Set', quantity: 1, description: 'One large and one small pichkari.' },
        { name: 'Gujiya Sweet Box', quantity: 1, description: 'A 1kg box of delicious gujiyas.' },
        { name: 'Eco-friendly Water Balloons', quantity: '100 pcs', description: 'Biodegradable water balloons.' },
    ]
  }
];

export default function HoliPage() {
  const { addToCart } = useCart();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'pink.400', color: 'white', py: 6 }}>
        <Container>
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            Holi Collection
          </Typography>
          <Typography variant="h5" component="p" align="center">
            Celebrate the festival of colors with our vibrant collection
          </Typography>
        </Container>
      </Box>

      {/* Bundles Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Holi Bundles
        </Typography>

        <Grid container spacing={4}>
          {holiBundles.map((bundle) => (
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
                    <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', color: 'pink.600' }}>
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