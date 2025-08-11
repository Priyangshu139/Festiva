'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/Card';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';

const navratriBundles = [
  {
    id: 'garba-outfit',
    name: 'Traditional Garba Outfit',
    description: 'Look your best for the Garba nights.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1608754482805-6f0a3040a8b2?w=400&h=300&fit=crop',
    items: [
        { name: 'Embroidered Chaniya Choli or Kurta', quantity: 1, description: 'Vibrant and comfortable for dancing.' },
        { name: 'Bandhani Dupatta', quantity: 1, description: 'A traditional and colorful scarf.' },
    ]
  },
  {
    id: 'dandiya-sticks',
    name: 'Decorated Dandiya Sticks',
    description: 'Dance the night away with these beautiful dandiyas.',
    price: 399,
    image: 'https://images.unsplash.com/photo-1540492889253-96f1d6f5b017?w=400&h=300&fit=crop',
    items: [
        { name: 'Hand-painted Wooden Dandiya Sticks', quantity: '1 Pair', description: 'Lightweight and easy to handle.' },
    ]
  },
  {
    id: 'pooja-kit',
    name: 'Navratri Pooja Kit',
    description: 'All the essentials for your daily pooja.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1603807022287-78de1b3f3a3a?w=400&h=300&fit=crop',
    items: [
        { name: 'Red Mata ki Chunri', quantity: 1, description: 'A sacred cloth for the goddess.' },
        { name: 'Brass Diya and Akhand Jyot', quantity: 1, description: 'For continuous light.' },
        { name: 'Sandalwood Incense Sticks', quantity: '1 pack', description: 'For a divine fragrance.' },
    ]
  },
  {
    id: 'complete-navratri',
    name: 'Complete Navratri Celebration Bundle',
    description: 'Get ready for a complete Navratri experience.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1608754482805-6f0a3040a8b2?w=400&h=300&fit=crop',
    items: [
        { name: 'Traditional Garba Outfit', quantity: 1, description: 'A complete outfit for the festivities.' },
        { name: 'Decorated Dandiya Sticks', quantity: '1 Pair', description: 'To dance the night away.' },
        { name: 'Navratri Pooja Kit', quantity: 1, description: 'All your pooja essentials.' },
    ]
  }
];

export default function NavratriPage() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Navratri Collection
          </h1>
          <p className="text-xl mb-6">
            Dance the nights away with our festive Navratri collection
          </p>
        </div>
      </section>

      {/* Bundles Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Navratri Bundles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {navratriBundles.map((bundle) => (
              <Card key={bundle.id} className="hover:shadow-lg transition-shadow">
                <CardImage src={bundle.image} alt={bundle.name} />
                <CardContent className="flex flex-col p-4">
                  <CardTitle>{bundle.name}</CardTitle>
                  <CardDescription>{bundle.description}</CardDescription>
                  <div className="my-4 flex-grow">
                    <h4 className="text-sm font-bold text-gray-800 mb-2">What's Included:</h4>
                    <div className="space-y-2">
                      {bundle.items.map((item, index) => (
                        <div key={index} className="p-2 bg-gray-100 rounded-md">
                           <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-sm text-gray-700">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                            <p className="text-sm font-bold text-blue-600 ml-2">x{item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{bundle.price}
                    </p>
                    <Button
                      onClick={() => addToCart(bundle)}
                      className="w-full mt-2"
                    >
                      Add to Cart
                    </Button>
                  </div>
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