'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
            <Button onClick={() => window.location.href = '/'}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">₹{item.price * item.quantity}</p>
                          </div>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <div className="flex items-center">
                            <label htmlFor={`quantity-${item.id}`} className="mr-2">Qty:</label>
                            <input
                              id={`quantity-${item.id}`}
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                              className="w-16 border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="font-medium text-orange-600 hover:text-orange-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 text-right">
              <p className="text-2xl font-bold text-gray-900">
                Subtotal: ₹{cartTotal}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Button className="w-full sm:w-auto">
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}