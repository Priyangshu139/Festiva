'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

const UserInfo = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [mobile, setMobile] = useState(user.mobile);

  const handleSave = () => {
    onUpdate({ ...user, mobile });
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
      <div className="mt-4">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.name}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
            <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <div className="flex items-center gap-4">
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                  <Button onClick={handleSave} size="sm">Save</Button>
                  <Button onClick={() => setIsEditing(false)} variant="secondary" size="sm">Cancel</Button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span>{user.mobile}</span>
                  <button onClick={() => setIsEditing(true)} className="font-medium text-orange-600 hover:text-orange-500">
                    Edit
                  </button>
                </div>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

const AddressCard = ({ address, onEdit, onDelete }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-start">
    <div>
      <p className="font-semibold">{address.name}</p>
      <p>{address.street}</p>
      <p>{address.city}, {address.state} {address.pin}</p>
      <p>Phone: {address.phone}</p>
    </div>
    <div className="flex gap-4">
      <button onClick={() => onEdit(address)} className="text-sm font-medium text-orange-600 hover:text-orange-500">Edit</button>
      <button onClick={() => onDelete(address.id)} className="text-sm font-medium text-red-600 hover:text-red-500">Delete</button>
    </div>
  </div>
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
    <form onSubmit={handleSubmit} className="bg-white shadow sm:rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">{address ? 'Edit Address' : 'Add New Address'}</h3>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number</label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        <div className="sm:col-span-6">
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street address</label>
          <input type="text" name="street" id="street" value={formData.street} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
          <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="pin" className="block text-sm font-medium text-gray-700">PIN code</label>
          <input type="text" name="pin" id="pin" value={formData.pin} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Address</Button>
      </div>
    </form>
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <UserInfo user={user} onUpdate={handleUpdateUser} />

          <div className="bg-white shadow sm:rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Saved Addresses</h3>
              <Button onClick={() => { setIsAdding(true); setEditingAddress(null); }}>Add New Address</Button>
            </div>
            {isAdding || editingAddress ? (
              <AddressForm 
                address={editingAddress}
                onSave={handleSaveAddress}
                onCancel={() => { setIsAdding(false); setEditingAddress(null); }}
              />
            ) : (
              <div className="space-y-4">
                {addresses.map(address => (
                  <AddressCard 
                    key={address.id} 
                    address={address} 
                    onEdit={setEditingAddress} 
                    onDelete={handleDeleteAddress} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}