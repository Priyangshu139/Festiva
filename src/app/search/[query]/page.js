'use client';

import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '@/components/Card';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

// Mock data - in a real app, this would come from an API
const allItems = [
  // Festivals
  { type: 'Festival', id: 'diwali', name: 'Diwali', description: 'Festival of Lights', image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=400&h=300&fit=crop', href: '/diwali' },
  { type: 'Festival', id: 'holi', name: 'Holi', description: 'Festival of Colors', image: 'https://images.unsplash.com/photo-1610630875035-f9d7bc2c2aed?w=400&h=300&fit=crop', href: '/holi' },
  { type: 'Festival', id: 'navratri', name: 'Navratri', description: 'Nine Nights of Devotion', image: 'https://images.unsplash.com/photo-1608754482805-6f0a3040a8b2?w=400&h=300&fit=crop', href: '/navratri' },
  // Individual Items
  { type: 'Item', id: 'decorative-diya', name: 'Decorative Brass Diya', description: 'Traditional brass diya', price: 299, rating: 4.5, image: 'https://images.unsplash.com/photo-1603807022287-78de1b3f3a3a?w=300&h=300&fit=crop' },
  { type: 'Item', id: 'organic-gulal', name: 'Organic Gulal Pack', description: 'Skin-friendly herbal gulal', price: 199, rating: 4.8, image: 'https://images.unsplash.com/photo-1610630875035-f9d7bc2c2aed?w=300&h=300&fit=crop' },
  { type: 'Item', id: 'toran', name: 'Handmade Door Toran', description: 'To adorn your entrance', price: 499, rating: 4.7, image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=300&h=300&fit=crop' },
  { type: 'Item', id: 'pooja-thali', name: 'Silver Coated Pooja Thali', description: 'Elegant thali for pooja', price: 799, rating: 4.6, image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=300&fit=crop' },
];


export default function SearchPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    Festival: true,
    Item: true,
  });
  const [sortOrder, setSortOrder] = useState('relevance');

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prev => ({ ...prev, [name]: checked }));
  };

  useEffect(() => {
    const query = params.query ? decodeURIComponent(params.query) : '';
    setSearchTerm(query);

    if (query) {
      let results = allItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );

      const activeFilters = Object.keys(filters).filter(key => filters[key]);
      if (activeFilters.length > 0 && activeFilters.length < Object.keys(filters).length) {
        results = results.filter(item => activeFilters.includes(item.type));
      }

      if (sortOrder === 'price-asc') {
        results.sort((a, b) => (a.price || Infinity) - (b.price || Infinity));
      } else if (sortOrder === 'price-desc') {
        results.sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (sortOrder === 'rating-desc') {
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [params.query, filters, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results {searchTerm && `for "${searchTerm}"`}
          </h1>
          <p className="text-gray-600">
            {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Type</h3>
              <div className="space-y-2">
                {Object.keys(filters).map(filter => (
                  <div key={filter} className="flex items-center">
                    <input
                      id={`filter-${filter}`}
                      name={filter}
                      type="checkbox"
                      checked={filters[filter]}
                      onChange={handleFilterChange}
                      className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <label htmlFor={`filter-${filter}`} className="ml-3 text-sm text-gray-600">
                      {filter}
                    </label>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Sort by</h3>
              <Menu as="div" className="relative inline-block text-left w-full">
                <div>
                  <Menu.Button className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {sortOrder.replace('-', ' ')}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={() => setSortOrder('relevance')} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm`}>Relevance</button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={() => setSortOrder('price-asc')} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm`}>Price: Low to High</button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={() => setSortOrder('price-desc')} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm`}>Price: High to Low</button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={() => setSortOrder('rating-desc')} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm`}>Rating</button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {searchResults.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardImage src={item.image} alt={item.name} className={item.type === 'Item' ? 'aspect-square' : ''} />
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <CardTitle>{item.name}</CardTitle>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.type === 'Festival' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {item.type}
                        </span>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                      {item.type === 'Item' ? (
                        <>
                          <div className="flex justify-between items-center mt-4">
                            <p className="text-xl font-bold text-gray-900">₹{item.price}</p>
                            <div className="flex items-center">
                              <span className="text-yellow-500">★</span>
                              <span className="ml-1 text-gray-600">{item.rating}</span>
                            </div>
                          </div>
                          <Button onClick={() => addToCart(item)} className="w-full mt-4">
                            Add to Cart
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => window.location.href = item.href} className="w-full mt-4">
                          Explore {item.name}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">No results found for your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}