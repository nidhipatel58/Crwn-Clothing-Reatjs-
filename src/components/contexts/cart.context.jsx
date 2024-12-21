import { createContext, useState, useEffect } from "react";

function addCartItem(cartItems, productToAdd) {
  // Find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // If found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // If not found, add new item with quantity 1
  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeItemToCart = (cartItems, CartItemToRemove) => {
  // Find if cartItems contains CartItemToRemove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === CartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== CartItemToRemove.id);
  }

  //  return all cartItem with matching cartItem with reduced quanity
  return cartItems.map((cartItem) =>
    cartItem.id === CartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, CartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== CartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartItems: [],
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItem, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItem.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItem]);

  useEffect(() => {
    const newCartTotal = cartItem.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItem]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItem, productToAdd));
  };

  const removeItemFromCart = (CartItemToRemove) => {
    setCartItems(removeItemToCart(cartItem, CartItemToRemove));
  };

  const clearItemFromCart = (CartItemToClear) => {
    setCartItems(clearCartItem(cartItem, CartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItem,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
