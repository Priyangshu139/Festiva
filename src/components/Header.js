'use client';

import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, InputBase, Box, Typography } from '@mui/material';
import { ShoppingCart, AccountCircle, Menu as MenuIcon, Search, Archive } from '@mui/icons-material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const router = useRouter();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => router.push('/')}
        >
          Festiva
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit" onClick={() => router.push('/orders')}>
            <Archive />
          </IconButton>

          <IconButton color="inherit" onClick={() => router.push('/cart')}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={() => router.push('/account')}>
            <AccountCircle />
          </IconButton>

          <IconButton color="inherit" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search />
          </IconButton>
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { router.push('/'); handleClose(); }}>Home</MenuItem>
            <MenuItem onClick={() => { router.push('/diwali'); handleClose(); }}>Diwali</MenuItem>
            <MenuItem onClick={() => { router.push('/holi'); handleClose(); }}>Holi</MenuItem>
            <MenuItem onClick={() => { router.push('/navratri'); handleClose(); }}>Navratri</MenuItem>
            <MenuItem onClick={() => { router.push('/orders'); handleClose(); }}>Orders</MenuItem>
            <MenuItem onClick={() => { router.push('/account'); handleClose(); }}>Account</MenuItem>
            <MenuItem onClick={() => { router.push('/cart'); handleClose(); }}>
              Cart ({cartCount})
            </MenuItem>
            <MenuItem>
              <form onSubmit={handleSearch} style={{ width: '100%' }}>
                <InputBase
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ width: '100%', px: 1 }}
                />
              </form>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      {isSearchOpen && (
        <Box sx={{ p: 2, display: { xs: 'none', md: 'block' } }}>
          <form onSubmit={handleSearch}>
            <InputBase
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: '100%',
                px: 2,
                py: 1,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
              }}
            />
          </form>
        </Box>
      )}
    </AppBar>
  );
}