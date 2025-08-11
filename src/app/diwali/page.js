'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/Card';
import Button from '@/components/Button';
import { useState } from 'react';

const diwaliBundles = [
  {
    id: 'diya-set',
    name: 'Traditional Diya Set',
    description: 'Set of 12 handcrafted clay diyas with ghee wicks',
    price: 299,
    image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=400&h=300&fit=crop'
  },
  {
    id: 'rangoli-kit',
    name: 'Rangoli Kit',
    description: 'Complete rangoli kit with colored powders, stencils, and diyas',
    price: 449,
    image: 'https://images.unsplash.com/photo-1608754482805-6f0a3040a8b2?w=400&h=300&fit=crop'
  },
  {
    id: 'sweet-box',
    name: 'Festive Sweet Box',
    description: 'Assorted traditional sweets - laddu, barfi, and peda',
    price: 599,
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=300&fit=crop'
  },
  {
    id: 'complete-diwali',
    name: 'Complete Diwali Bundle',
    description: 'Everything you need - diyas, rangoli, sweets, and pooja items',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=400&h=300&fit=crop'
  }
];

export default function DiwaliPage() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartCount(prev => prev + 1);
    setCartItems(prev => [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Diwali Collection
          </h1>
          <p className="text-xl mb-6">
            Light up your home with our curated Diwali essentials
          </p>
        </div>
      </section>

      {/* Bundles Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Diwali Bundles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diwaliBundles.map((bundle) => (
              <Card key={bundle.id} className="hover:shadow-lg transition-shadow">
                <CardImage src={bundle.image} alt={bundle.name} />
                <CardContent>
                  <CardTitle>{bundle.name}</CardTitle>
                  <CardDescription>{bundle.description}</CardDescription>
                  <p className="text-2xl font-bold text-orange-600 mt-2">
                    ₹{bundle.price}
                  </p>
                  <Button 
                    onClick={() => addToCart(bundle)}
                    className="w-full mt-4"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}