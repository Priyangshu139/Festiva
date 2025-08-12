import { Container, Grid, Typography, Link, Box } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.800', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Festiva
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your one-stop shop for authentic Indian festival bundles and decorations.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>Home</Link>
            <Link href="/diwali" color="inherit" display="block" sx={{ mb: 1 }}>Diwali</Link>
            <Link href="/holi" color="inherit" display="block" sx={{ mb: 1 }}>Holi</Link>
            <Link href="/navratri" color="inherit" display="block" sx={{ mb: 1 }}>Navratri</Link>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: hello@festiva.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +91 98765 43210
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Support: 9 AM - 6 PM IST
            </Typography>
          </Grid>
        </Grid>

        <Box mt={4} pt={2} borderTop={1} borderColor="grey.700" textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © 2024 Festiva. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}