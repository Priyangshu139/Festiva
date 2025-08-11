'use client';

import { ShoppingCartIcon, UserIcon, ArchiveBoxIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-orange-600">Festiva</a>
          </div>

        

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-gray-700 hover:text-orange-600">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              {isSearchOpen && (
                <form onSubmit={handleSearch} className="absolute right-0 mt-2 w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                </form>
              )}
            </div>
            <a href="/orders" className="p-2 text-gray-700 hover:text-orange-600 hidden md:block">
              <ArchiveBoxIcon className="h-6 w-6" />
            </a>
            <a href="/cart" className="relative p-2 text-gray-700 hover:text-orange-600">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>
            <a href="/account" className="p-2 text-gray-700 hover:text-orange-600 hidden md:block">
              <UserIcon className="h-6 w-6" />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-2 p-2 text-gray-700"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">Home</a>
              <a href="/diwali" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">Diwali</a>
              <a href="/holi" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">Holi</a>
              <a href="/navratri" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">Navratri</a>
              <a href="/orders" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">Orders</a>
              <a href="/account" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">Account</a>
               <form onSubmit={handleSearch} className="relative px-3 py-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm"
                  />
                </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}