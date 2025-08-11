'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Header({ cartCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-orange-600">Festiva</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">
              Home
            </a>
            <a href="/diwali" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">
              Diwali
            </a>
            <a href="/holi" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">
              Holi
            </a>
            <a href="/navratri" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">
              Navratri
            </a>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center">
            <a href="/cart" className="relative p-2 text-gray-700 hover:text-orange-600">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-4 p-2 text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-gray-700 hover:text-orange-600">
                Home
              </a>
              <a href="/diwali" className="block px-3 py-2 text-gray-700 hover:text-orange-600">
                Diwali
              </a>
              <a href="/holi" className="block px-3 py-2 text-gray-700 hover:text-orange-600">
                Holi
              </a>
              <a href="/navratri" className="block px-3 py-2 text-gray-700 hover:text-orange-600">
                Navratri
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}