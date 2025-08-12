'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/Card';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import Carousel from '@/components/Carousel';
import { Container, Grid, Typography, Box } from '@mui/material';

const festivals = [
  {
    id: 'diwali',
    name: 'Diwali',
    description: 'Festival of Lights - Celebrate with diyas, rangoli, and sweets',
    image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=400&h=300&fit=crop',
    href: '/diwali'
  },
  {
    id: 'holi',
    name: 'Holi',
    description: 'Festival of Colors - Play with organic colors and enjoy festive treats',
    image: 'https://images.unsplash.com/photo-1610630875035-f9d7bc2c2aed?w=400&h=300&fit=crop',
    href: '/holi'
  },
  {
    id: 'navratri',
    name: 'Navratri',
    description: 'Nine Nights of Devotion - Garba, dandiya, and traditional celebrations',
    image: 'https://images.unsplash.com/photo-1608754482805-6f0a3040a8b2?w=400&h=300&fit=crop',
    href: '/navratri'
  }
];

const individualItems = [
  {
    id: 'decorative-diya',
    name: 'Decorative Brass Diya',
    description: 'Traditional brass diya with intricate designs',
    price: 299,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1603807022287-78de1b3f3a3a?w=300&h=300&fit=crop'
  },
  {
    id: 'organic-gulal',
    name: 'Organic Gulal Pack',
    description: 'Skin-friendly, non-toxic herbal gulal for Holi',
    price: 199,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1610630875035-f9d7bc2c2aed?w=300&h=300&fit=crop'
  },
  {
    id: 'toran',
    name: 'Handmade Door Toran',
    description: 'Beautifully crafted toran to adorn your entrance',
    price: 499,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=300&h=300&fit=crop'
  },
  {
    id: 'pooja-thali',
    name: 'Silver Coated Pooja Thali',
    description: 'Elegant thali for all your pooja needs',
    price: 799,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=300&h=300&fit=crop'
  }
];

export default function Home() {
  const { cartCount, addToCart } = useCart();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />

      {/* Hero Section */}
      <section>
        <Carousel slides={festivals} />
      </section>

      {/* Featured Festivals */}
      <section>
        <Container sx={{ py: 8 }}>
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Featured Festivals
          </Typography>

          <Grid container spacing={4}>
            {festivals.map((festival) => (
              <Grid item xs={12} md={6} key={festival.id}>
                <Card sx={{ height: '100%', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 4 } }}>
                  <CardImage src={festival.image} alt={festival.name} />
                  <CardContent>
                    <CardTitle>{festival.name}</CardTitle>
                    <CardDescription>{festival.description}</CardDescription>
                    <Button
                      onClick={() => window.location.href = festival.href}
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Explore {festival.name}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Individual Items Section */}
      <section>
        <Container sx={{ py: 8, bgcolor: 'background.paper' }}>
          <Box sx={{ position: 'relative', mb: 6 }}>
            <Box sx={{ position: 'absolute', width: '100%', borderTop: '1px solid', borderColor: 'divider' }} />
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h4" component="span" sx={{ bgcolor: 'background.paper', px: 2 }}>
                Shop Individual Items
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {individualItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card sx={{ height: '100%', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 4 } }}>
                  <CardImage src={item.image} alt={item.name} sx={{ aspectRatio: '1' }} />
                  <CardContent>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                        ₹{item.price}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                          ★
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.rating}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      onClick={() => addToCart(item)}
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      <Footer />
    </Box>
  );
}