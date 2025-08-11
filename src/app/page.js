'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/Card';
import Button from '@/components/Button';
import { useState } from 'react';

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

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400 to-red-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Celebrate Every Festival
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Authentic Indian festival bundles delivered to your doorstep
          </p>
          <Button className="text-lg px-8 py-3">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Featured Festivals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Festivals
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {festivals.map((festival) => (
              <Card key={festival.id} className="hover:shadow-lg transition-shadow">
                <CardImage src={festival.image} alt={festival.name} />
                <CardContent>
                  <CardTitle>{festival.name}</CardTitle>
                  <CardDescription>{festival.description}</CardDescription>
                  <Button 
                    onClick={() => window.location.href = festival.href}
                    className="w-full mt-4"
                  >
                    Explore {festival.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Festiva?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold mb-2">Curated Bundles</h3>
              <p className="text-gray-600">Handpicked items for each festival</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">2-3 days delivery across India</p>
            </div>
            <div>
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Save up to 30% with bundles</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}