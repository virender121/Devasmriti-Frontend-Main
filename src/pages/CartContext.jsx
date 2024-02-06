

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import instance from '../utils/Api';
import api from '../config/backend';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [selectedPriceId, setSelectedPriceId] = useState([])
  const token = localStorage.getItem("token")
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCountRefresh, setCartCountRefresh] = useState(0)
  const [orderStatus, setOrderStatus] = useState(false)

  // console.log({ t: cartTotal })

  const updateCartTotal = useCallback((newTotal) => {
    setCartTotal(newTotal);
  }, []);

  const decrementCartTotal = useCallback(() => {
    setCartTotal((prevTotal) => prevTotal - 1);
  }, []);

  useEffect(() => {

    const fetchCartData = async () => {
      // console.log('kjkjkj',selectedPriceId)
      try {
        const response = await axios.get(`${api}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'paginate': '0',
          }
        });
        const cartItemCount = response.data.data.total;
        // console.log({ cartItemCount })
        // console.log(response.data.data.data.length)
        setCartTotal(cartItemCount);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, [cartCountRefresh]);

  return (
    <CartContext.Provider value={{ selectedPriceId, setSelectedPriceId, cartTotal, updateCartTotal, decrementCartTotal, setCartCountRefresh, orderStatus, setOrderStatus }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
