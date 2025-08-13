'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({
      phone: '',
      bundle: [],
      item: [],
      total: 0,
      quantity: [],
      distributorIndex: []
    });

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.item.indexOf(item.name);
      if (existingItemIndex !== -1) {
        const newQuantity = [...prevCart.quantity];
        newQuantity[existingItemIndex] += 1;
        return {
          ...prevCart,
          quantity: newQuantity,
          total: prevCart.total + item.price
        };
      }

      return {
        ...prevCart,
        bundle: [...prevCart.bundle, item.name],
        item: [...prevCart.item, item.name],
        quantity: [...prevCart.quantity, 1],
        total: prevCart.total + item.price
      };
    });
  };

  const removeFromCart = (itemName) => {
    setCart(prevCart => {
      const itemIndex = prevCart.item.indexOf(itemName);
      if (itemIndex === -1) return prevCart;

      const newQuantity = [...prevCart.quantity];
      const newTotal = prevCart.total - prevCart.bundle[itemIndex].price * newQuantity[itemIndex];

      return {
        ...prevCart,
        bundle: prevCart.bundle.filter((_, i) => i !== itemIndex),
        item: prevCart.item.filter((_, i) => i !== itemIndex),
        quantity: prevCart.quantity.filter((_, i) => i !== itemIndex),
        total: newTotal
      };
    });
  };

  const updateQuantity = (itemName, quantity) => {
    setCart(prevCart => {
      const itemIndex = prevCart.item.indexOf(itemName);
      if (itemIndex === -1) return prevCart;

      const newQuantity = [...prevCart.quantity];
      newQuantity[itemIndex] = quantity;

      const priceDifference = prevCart.bundle[itemIndex].price * (quantity - prevCart.quantity[itemIndex]);
      const newTotal = prevCart.total + priceDifference;

      return {
        ...prevCart,
        quantity: newQuantity,
        total: newTotal
      };
    });
  };

  const setPhoneNumber = (phone) => {
    setCart(prevCart => ({ ...prevCart, phone }));
  };

  const value = {
    ...cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    setPhoneNumber,
    cartCount: cart.quantity.reduce((count, qty) => count + qty, 0)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}