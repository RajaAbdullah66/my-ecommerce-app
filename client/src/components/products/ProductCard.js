"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa"
import { CartContext } from "../../context/CartContext"

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product, 1)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:scale-105">
      <Link to={`/product/${product._id}`}>
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <Link to={`/product/${product._id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center space-x-1 rounded-full p-2 ${
              product.stock > 0
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
