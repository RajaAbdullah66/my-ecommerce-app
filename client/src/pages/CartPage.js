"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaTrash, FaMinus, FaPlus, FaArrowLeft } from "react-icons/fa"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import Message from "../components/ui/Message"

const CartPage = () => {
  const { cartItems, updateCartQuantity, removeFromCart, clearCart, cartTotal } = useContext(CartContext)
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login?redirect=checkout")
    } else {
      // In a real app, you would navigate to a checkout page
      alert("Checkout functionality would be implemented here")
      clearCart()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <Message>Your cart is empty</Message>
          <Link
            to="/products"
            className="inline-block mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex flex-col sm:flex-row items-center py-4 border-b last:border-b-0">
                    <div className="sm:w-24 mb-4 sm:mb-0">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-auto" />
                    </div>

                    <div className="flex-grow sm:ml-6">
                      <Link to={`/product/${item._id}`} className="text-lg font-semibold hover:text-blue-600">
                        {item.name}
                      </Link>
                      <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center mt-4 sm:mt-0">
                      <button
                        onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                        className="p-1 border rounded-md"
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                        className="p-1 border rounded-md"
                        disabled={item.quantity >= item.stock}
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <div className="ml-6 text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 mt-2">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <Link to="/products" className="flex items-center text-blue-600 hover:text-blue-800">
                <FaArrowLeft className="mr-2" /> Continue Shopping
              </Link>
              <button onClick={clearCart} className="text-red-500 hover:text-red-700">
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 pb-2 border-b">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
