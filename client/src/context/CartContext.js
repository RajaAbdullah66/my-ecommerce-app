"use client"

import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cartItems")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    setLoading(false)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }
  }, [cartItems, loading])

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find((item) => item._id === product._id)

    if (existingItem) {
      // Update quantity if item already exists
      setCartItems(
        cartItems.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item)),
      )
    } else {
      // Add new item
      setCartItems([...cartItems, { ...product, quantity }])
    }

    toast.success(`${product.name} added to cart`)
  }

  // Update item quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(cartItems.map((item) => (item._id === productId ? { ...item, quantity } : item)))
  }

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId))
    toast.info("Item removed from cart")
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
    toast.info("Cart cleared")
  }

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
