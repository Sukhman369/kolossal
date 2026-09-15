'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartItem } from '../lib/commerce/types';
import { commerce } from '../lib/commerce';

interface CartContextType {
  cart: Cart;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  isAdding: boolean;
}

const initialCart: Cart = {
  id: 'cart_local',
  items: [],
  subtotal: { amount: 0, currencyCode: 'USD' },
  itemCount: 0,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(initialCart);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Initialize cart on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kolossal_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        queueMicrotask(() => {
          setCart(parsed);
        });
      }
    } catch {
      // Ignore localStorage error
    }
  }, []);

  const saveCart = (updatedCart: Cart) => {
    setCart(updatedCart);
    try {
      localStorage.setItem('kolossal_cart', JSON.stringify(updatedCart));
    } catch {
      // Ignore
    }
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = async (item: Omit<CartItem, 'id'>) => {
    setIsAdding(true);
    try {
      const updated = await commerce.addToCart(cart.id, item);
      saveCart(updated);
      setIsOpen(true);
    } finally {
      setIsAdding(false);
    }
  };

  const removeItem = async (lineItemId: string) => {
    const updated = await commerce.removeFromCart(cart.id, lineItemId);
    saveCart(updated);
  };

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    const updated = await commerce.updateCartItemQuantity(cart.id, lineItemId, quantity);
    saveCart(updated);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        isAdding,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
