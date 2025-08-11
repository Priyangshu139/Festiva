'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/Card';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import Carousel from '@/components/Carousel';

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

const individualItems = [
  {
    id: 'decorative-diya',
    name: 'Decorative Brass Diya',
    description: 'Traditional brass diya with intricate designs',
    price: 299,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1603807022287-78de1b3f3a3a?w=300&h=300&fit=crop'
  },
  {
    id: 'organic-gulal',
    name: 'Organic Gulal Pack',
    description: 'Skin-friendly, non-toxic herbal gulal for Holi',
    price: 199,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1610630875035-f9d7bc2c2aed?w=300&h=300&fit=crop'
  },
  {
    id: 'toran',
    name: 'Handmade Door Toran',
    description: 'Beautifully crafted toran to adorn your entrance',
    price: 499,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=300&h=300&fit=crop'
  },
    {
    id: 'pooja-thali',
    name: 'Silver Coated Pooja Thali',
    description: 'Elegant thali for all your pooja needs',
    price: 799,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=300&h=300&fit=crop'
  }
];

export default function Home() {
  const { cartCount, addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section>
        <Carousel slides={festivals} />
      </section>

      {/* Featured Festivals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Festivals
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      {/* Individual Items Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-2xl font-medium text-gray-900">Shop Individual Items</span>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {individualItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardImage src={item.image} alt={item.name} className="aspect-square" />
                <CardContent>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-xl font-bold text-gray-900">₹{item.price}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => addToCart(item)}
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