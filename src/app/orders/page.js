'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

const mockOrders = [
  {
    id: 'FEST-001',
    date: '10 Aug 2025',
    status: 'Delivered',
    total: 1748,
    items: [
      { name: 'Complete Diwali Bundle', quantity: 1 },
      { name: 'Decorative Brass Diya', quantity: 1 },
    ],
  },
  {
    id: 'FEST-002',
    date: '05 Aug 2025',
    status: 'Shipped',
    total: 1499,
    items: [
      { name: 'Complete Holi Bash Bundle', quantity: 1 },
    ],
  },
  {
    id: 'FEST-003',
    date: '01 Aug 2025',
    status: 'Processing',
    total: 3499,
    items: [
      { name: 'Complete Navratri Celebration Bundle', quantity: 1 },
    ],
  },
    {
    id: 'FEST-004',
    date: '28 Jul 2025',
    status: 'Cancelled',
    total: 848,
    items: [
      { name: 'Traditional Diya Set', quantity: 1 },
      { name: 'Rangoli Kit', quantity: 1 },
    ],
  },
];

const statusColors = {
  Processing: 'bg-yellow-100 text-yellow-800',
  Shipped: 'bg-blue-100 text-blue-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="p-4 sm:p-6 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-orange-600">Order #{order.id}</p>
            <p className="text-sm text-gray-500">Placed on {order.date}</p>
          </div>
          <div className="text-right">
            <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
              {order.status}
            </p>
            <p className="text-lg font-semibold text-gray-900 mt-1">₹{order.total}</p>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 sm:p-6">
          <h4 className="font-medium text-gray-900">Items in this order:</h4>
          <ul role="list" className="mt-2 divide-y divide-gray-200">
            {order.items.map((item, index) => (
              <li key={index} className="py-2 flex justify-between">
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
        
        {mockOrders.length === 0 ? (
          <div className="text-center py-16 bg-white shadow sm:rounded-lg">
            <p className="text-xl text-gray-600 mb-4">You have no past orders.</p>
            <Button onClick={() => window.location.href = '/'}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {mockOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}