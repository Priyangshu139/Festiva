'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/Card';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';

const diwaliBundles = [
  {
    id: 'diya-set',
    name: 'Traditional Diya Set',
    description: 'A classic set for a warm, traditional glow.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=400&h=300&fit=crop',
    items: [
      { name: 'Handcrafted Clay Diyas', quantity: 12, description: 'Earthen lamps, perfect for lighting up your home.' },
      { name: 'Pure Cow Ghee Wicks', quantity: 12, description: 'Ready-to-use wicks for a long-lasting flame.' },
    ]
  },
  {
    id: 'rangoli-kit',
    name: 'Vibrant Rangoli Kit',
    description: 'Unleash your creativity with this complete rangoli set.',
    price: 449,
    image: 'https://images.unsplash.com/photo-1608754482805-6f0a3040a8b2?w=400&h=300&fit=crop',
    items: [
      { name: 'Assorted Organic Colors', quantity: '5 packs', description: 'Skin-friendly, vibrant colors.' },
      { name: 'Intricate Design Stencils', quantity: 3, description: 'Create beautiful patterns with ease.' },
      { name: 'Floating Decorative Diyas', quantity: 4, description: 'Add a touch of elegance to your rangoli.' },
    ]
  },
  {
    id: 'sweet-box',
    name: 'Festive Sweet Box',
    description: 'A delicious assortment of traditional Diwali sweets.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=300&fit=crop',
    items: [
      { name: 'Motichoor Laddu', quantity: '250g', description: 'The quintessential Diwali sweet.' },
      { name: 'Kaju Katli', quantity: '250g', description: 'Rich and delicious cashew fudge.' },
      { name: 'Milk Peda', quantity: '250g', description: 'Creamy and delightful milk sweets.' },
    ]
  },
  {
    id: 'complete-diwali',
    name: 'Grand Diwali Celebration Bundle',
    description: 'Everything you need for a grand celebration.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=400&h=300&fit=crop',
    items: [
      { name: 'Traditional Diya Set', quantity: 1, description: 'Includes 12 diyas and wicks.' },
      { name: 'Vibrant Rangoli Kit', quantity: 1, description: 'Complete with colors and stencils.' },
      { name: 'Festive Sweet Box', quantity: 1, description: 'An assortment of our finest sweets.' },
      { name: 'Pooja Samagri Kit', quantity: 1, description: 'All essentials for your Diwali pooja.' },
    ]
  }
];

export default function DiwaliPage() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
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
                            <p className="text-sm font-bold text-orange-600 ml-2">x{item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-orange-600">
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