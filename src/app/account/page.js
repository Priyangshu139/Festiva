'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Container, Grid, Typography, TextField, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

const UserInfo = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [mobile, setMobile] = useState(user.mobile);

  const handleSave = () => {
    onUpdate({ ...user, mobile });
    setIsEditing(false);
  };

  return (
    <Paper sx={{ p: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" color="text.secondary">Full name</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body1">{user.name}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" color="text.secondary">Mobile Number</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          {isEditing ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                size="small"
                sx={{ flexGrow: 1 }}
              />
              <Button onClick={handleSave} size="small">Save</Button>
              <Button onClick={() => setIsEditing(false)} variant="outlined" size="small">Cancel</Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">{user.mobile}</Typography>
              <Button onClick={() => setIsEditing(true)} variant="text" size="small">Edit</Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

const AddressCard = ({ address, onEdit, onDelete }) => (
  <Paper sx={{ p: 3, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <Box>
      <Typography variant="subtitle1" gutterBottom>{address.name}</Typography>
      <Typography variant="body2">{address.street}</Typography>
      <Typography variant="body2">{address.city}, {address.state} {address.pin}</Typography>
      <Typography variant="body2">Phone: {address.phone}</Typography>
    </Box>
    <Box>
      <Button onClick={() => onEdit(address)} variant="text" size="small" sx={{ mr: 1 }}>Edit</Button>
      <Button onClick={() => onDelete(address.id)} variant="text" size="small" color="error">Delete</Button>
    </Box>
  </Paper>
);

const AddressForm = ({ address, onSave, onCancel }) => {
  const [formData, setFormData] = useState(address || {
    name: '', phone: '', street: '', city: '', state: '', pin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: address?.id || Date.now() });
  };

  return (
    <Paper sx={{ p: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {address ? 'Edit Address' : 'Add New Address'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="Full name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="phone"
              label="Phone number"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="street"
              label="Street address"
              value={formData.street}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="state"
              label="State"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="pin"
              label="PIN code"
              value={formData.pin}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button type="button" variant="outlined" onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained">Save Address</Button>
        </Box>
      </form>
    </Paper>
  );
};

export default function AccountPage() {
  const [user, setUser] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    mobile: '9876543210',
  });
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Priya Sharma', phone: '9876543210', street: '123, Festive Lane', city: 'Mumbai', state: 'Maharashtra', pin: '400001' },
    { id: 2, name: 'Priya Sharma (Work)', phone: '9876543211', street: '456, Commerce Street', city: 'Mumbai', state: 'Maharashtra', pin: '400051' },
  ]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleUpdateUser = (updatedUser) => setUser(updatedUser);

  const handleSaveAddress = (address) => {
    if (addresses.find(a => a.id === address.id)) {
      setAddresses(addresses.map(a => a.id === address.id ? address : a));
    } else {
      setAddresses([...addresses, address]);
    }
    setEditingAddress(null);
    setIsAdding(false);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <UserInfo user={user} onUpdate={handleUpdateUser} />
        </Box>

        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Saved Addresses</Typography>
            <Button onClick={() => { setIsAdding(true); setEditingAddress(null); }}>
              Add New Address
            </Button>
          </Box>

          {isAdding || editingAddress ? (
            <AddressForm
              address={editingAddress}
              onSave={handleSaveAddress}
              onCancel={() => { setIsAdding(false); setEditingAddress(null); }}
            />
          ) : (
            <List>
              {addresses.map(address => (
                <React.Fragment key={address.id}>
                  <AddressCard
                    address={address}
                    onEdit={setEditingAddress}
                    onDelete={handleDeleteAddress}
                  />
                  {addresses.indexOf(address) < addresses.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}