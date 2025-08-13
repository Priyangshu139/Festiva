'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import { Container, Grid, Typography, Box, Paper, TextField, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function CartPage() {
  const { bundle, item, total, quantity, removeFromCart, updateQuantity } = useCart();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Your Cart
        </Typography>

        {item.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Your cart is empty.
            </Typography>
            <Button onClick={() => window.location.href = '/'} variant="contained">
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 4 }}>
                <List>
                  {item.map((itemName, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ py: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={4} md={3}>
                            <Box
                              component="img"
                              src={'https://via.placeholder.com/150'} // Replace with actual image
                              alt={itemName}
                              sx={{ width: '100%', height: 'auto', borderRadius: 1 }}
                            />
                          </Grid>
                          <Grid item xs={8} md={9}>
                            <ListItemText
                              primary={itemName}
                              secondary={
                                <>
                                  <Typography component="span" variant="body2" color="text.primary">
                                    ₹{bundle[index]?.price * quantity[index]}
                                  </Typography>
                                  <Box sx={{ mt: 1 }}>
                                    <TextField
                                      label="Quantity"
                                      type="number"
                                      value={quantity[index]}
                                      onChange={(e) => updateQuantity(itemName, parseInt(e.target.value))}
                                      inputProps={{ min: 1 }}
                                      size="small"
                                      sx={{ width: 80, mr: 2 }}
                                    />
                                    <Button
                                      onClick={() => removeFromCart(itemName)}
                                      variant="text"
                                      color="error"
                                      size="small"
                                    >
                                      Remove
                                    </Button>
                                  </Box>
                                </>
                              }
                            />
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">Subtotal:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    ₹{total}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Shipping and taxes calculated at checkout.
                </Typography>
                <Button variant="contained" fullWidth>
                  Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      <Footer />
    </Box>
  );
}