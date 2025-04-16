"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { FaArrowLeft, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa"
import api from "../utils/api"
import { CartContext } from "../context/CartContext"
import Loader from "../components/ui/Loader"
import Message from "../components/ui/Message"
import ProductCard from "../components/products/ProductCard"

const ProductDetailPage = () => {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const { data } = await api.get(`/api/products/${id}`)
        setProduct(data)

        // Fetch related products from the same category
        const { data: allProducts } = await api.get(`/api/products?category=${data.category}`)
        const filtered = allProducts.filter((p) => p._id !== data._id).slice(0, 4)
        setRelatedProducts(filtered)
      } catch (error) {
        setError("Failed to load product details")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  if (loading) return <Loader />
  if (error) return <Message variant="error">{error}</Message>
  if (!product) return <Message>Product not found</Message>

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <FaArrowLeft className="mr-2" /> Back to Products
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="max-w-full h-auto max-h-96 object-contain"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="mb-4">
              <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description:</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Category:</span>
                <span>{product.category}</span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Availability:</span>
                <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                </span>
              </div>
            </div>

            {product.stock > 0 && (
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <span className="font-semibold mr-4">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 border-r">
                      <FaMinus />
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 border-l">
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-3 rounded-md flex items-center justify-center hover:bg-blue-700 transition duration-300"
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailPage
