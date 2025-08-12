'use client';

import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/Card';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import { Container, Grid, Typography, Box, Paper, FormControlLabel, Checkbox, Menu, MenuItem, Chip } from '@mui/material';
import { ExpandMore as ChevronDownIcon } from '@mui/icons-material';

// Mock data - in a real app, this would come from an API
const allItems = [
  // Festivals
  { type: 'Festival', id: 'diwali', name: 'Diwali', description: 'Festival of Lights', image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=400&h=300&fit=crop', href: '/diwali' },
  { type: 'Festival', id: 'holi', name: 'Holi', description: 'Festival of Colors', image: 'https://images.unsplash.com/photo-1610630875035-f9d7bc2c2aed?w=400&h=300&fit=crop', href: '/holi' },
  { type: 'Festival', id: 'navratri', name: 'Navratri', description: 'Nine Nights of Devotion', image: 'https://images.unsplash.com/photo-1608754482805-6f0a3040a8b2?w=400&h=300&fit=crop', href: '/navratri' },
  // Individual Items
  { type: 'Item', id: 'decorative-diya', name: 'Decorative Brass Diya', description: 'Traditional brass diya', price: 299, rating: 4.5, image: 'https://images.unsplash.com/photo-1603807022287-78de1b3f3a3a?w=300&h=300&fit=crop' },
  { type: 'Item', id: 'organic-gulal', name: 'Organic Gulal Pack', description: 'Skin-friendly herbal gulal', price: 199, rating: 4.8, image: 'https://images.unsplash.com/photo-1610630875035-f9d7bc2c2aed?w=300&h=300&fit=crop' },
  { type: 'Item', id: 'toran', name: 'Handmade Door Toran', description: 'To adorn your entrance', price: 499, rating: 4.7, image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=300&h=300&fit=crop' },
  { type: 'Item', id: 'pooja-thali', name: 'Silver Coated Pooja Thali', description: 'Elegant thali for pooja', price: 799, rating: 4.6, image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=300&fit=crop' },
];

export default function SearchPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    Festival: true,
    Item: true,
  });
  const [sortOrder, setSortOrder] = useState('relevance');
  const [sortAnchorEl, setSortAnchorEl] = useState(null);

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prev => ({ ...prev, [name]: checked }));
  };

  useEffect(() => {
    const query = params.query ? decodeURIComponent(params.query) : '';
    setSearchTerm(query);

    if (query) {
      let results = allItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );

      const activeFilters = Object.keys(filters).filter(key => filters[key]);
      if (activeFilters.length > 0 && activeFilters.length < Object.keys(filters).length) {
        results = results.filter(item => activeFilters.includes(item.type));
      }

      if (sortOrder === 'price-asc') {
        results.sort((a, b) => (a.price || Infinity) - (b.price || Infinity));
      } else if (sortOrder === 'price-desc') {
        results.sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (sortOrder === 'rating-desc') {
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [params.query, filters, sortOrder]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Search Results {searchTerm && `for "${searchTerm}"`}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Filters */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, position: 'sticky', top: 80 }}>
              <Typography variant="h6" gutterBottom>
                Filter by Type
              </Typography>
              <Box>
                {Object.keys(filters).map(filter => (
                  <FormControlLabel
                    key={filter}
                    control={
                      <Checkbox
                        checked={filters[filter]}
                        onChange={handleFilterChange}
                        name={filter}
                        color="primary"
                      />
                    }
                    label={filter}
                  />
                ))}
              </Box>

              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                Sort by
              </Typography>
              <Button
                variant="outlined"
                onClick={(e) => setSortAnchorEl(e.currentTarget)}
                endIcon={<ChevronDownIcon />}
                fullWidth
              >
                {sortOrder.replace('-', ' ')}
              </Button>
              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={() => setSortAnchorEl(null)}
              >
                <MenuItem onClick={() => { setSortOrder('relevance'); setSortAnchorEl(null); }}>Relevance</MenuItem>
                <MenuItem onClick={() => { setSortOrder('price-asc'); setSortAnchorEl(null); }}>Price: Low to High</MenuItem>
                <MenuItem onClick={() => { setSortOrder('price-desc'); setSortAnchorEl(null); }}>Price: High to Low</MenuItem>
                <MenuItem onClick={() => { setSortOrder('rating-desc'); setSortAnchorEl(null); }}>Rating</MenuItem>
              </Menu>
            </Paper>
          </Grid>

          {/* Results */}
          <Grid item xs={12} md={9}>
            {searchResults.length > 0 ? (
              <Grid container spacing={3}>
                {searchResults.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card sx={{ height: '100%', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 4 } }}>
                      <CardImage src={item.image} alt={item.name} sx={item.type === 'Item' ? { aspectRatio: '1' } : {}} />
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <CardTitle>{item.name}</CardTitle>
                          <Chip
                            label={item.type}
                            size="small"
                            color={item.type === 'Festival' ? 'primary' : 'success'}
                          />
                        </Box>
                        <CardDescription>{item.description}</CardDescription>
                        {item.type === 'Item' ? (
                          <>
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
                          </>
                        ) : (
                          <Button
                            onClick={() => window.location.href = item.href}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                          >
                            Explore {item.name}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No results found for your search.
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}