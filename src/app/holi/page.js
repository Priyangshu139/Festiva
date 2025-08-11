'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/Card';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';

const holiBundles = [
  {
    id: 'herbal-colors',
    name: 'Herbal Colors Pack',
    description: 'Play safe with these skin-friendly organic colors.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1610630875035-f9d7bc2c2aed?w=400&h=300&fit=crop',
    items: [
        { name: 'Rose Pink Gulal', quantity: '100g', description: 'Made from rose petals.' },
        { name: 'Turmeric Yellow Gulal', quantity: '100g', description: 'A bright and natural yellow.' },
        { name: 'Neem Green Gulal', quantity: '100g', description: 'Infused with the goodness of neem.' },
        { name: 'Orchid Blue Gulal', quantity: '100g', description: 'A vibrant and playful blue.' },
    ]
  },
  {
    id: 'pichkari-set',
    name: 'Water Gun (Pichkari) Set',
    description: 'Drench your friends with these fun water guns.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1583339522870-0d9f212334aa?w=400&h=300&fit=crop',
    items: [
        { name: 'Pressure Pichkari', quantity: 1, description: 'A large water gun for maximum fun.' },
        { name: 'Designer Pichkari', quantity: 1, description: 'A smaller, stylish water gun.' },
    ]
  },
  {
    id: 'gujiya-box',
    name: 'Gujiya Sweet Box',
    description: 'The essential sweet treat for Holi celebrations.',
    price: 649,
    image: 'https://images.unsplash.com/photo-1616521621978-7a5a5a5a5a5a?w=400&h=300&fit=crop',
    items: [
        { name: 'Handmade Khoya Gujiyas', quantity: '1kg', description: 'Stuffed with sweetened khoya and dry fruits.' },
    ]
  },
  {
    id: 'complete-holi',
    name: 'Complete Holi Bash Bundle',
    description: 'Everything you need for the ultimate Holi party.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1610630875035-f9d7bc2c2aed?w=400&h=300&fit=crop',
    items: [
        { name: 'Herbal Colors Pack', quantity: 1, description: 'A set of 4 organic colors.' },
        { name: 'Pichkari Set', quantity: 1, description: 'One large and one small pichkari.' },
        { name: 'Gujiya Sweet Box', quantity: 1, description: 'A 1kg box of delicious gujiyas.' },
        { name: 'Eco-friendly Water Balloons', quantity: '100 pcs', description: 'Biodegradable water balloons.' },
    ]
  }
];

export default function HoliPage() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Holi Collection
          </h1>
          <p className="text-xl mb-6">
            Celebrate the festival of colors with our vibrant collection
          </p>
        </div>
      </section>

      {/* Bundles Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Holi Bundles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {holiBundles.map((bundle) => (
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
                            <p className="text-sm font-bold text-pink-600 ml-2">x{item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-pink-600">
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