"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../utils/api"
import ProductCard from "../components/products/ProductCard"
import Loader from "../components/ui/Loader"
import Message from "../components/ui/Message"
import HeroSection from "../components/home/HeroSection"
import CategorySection from "../components/home/CategorySection"

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        const { data } = await api.get("/api/products/featured")
        setFeaturedProducts(data)
      } catch (error) {
        setError("Failed to load featured products")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div>
      <HeroSection />

      <CategorySection />

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error">{error}</Message>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  to="/products"
                  className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  View All Products
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
