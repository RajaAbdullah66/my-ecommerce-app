"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import api from "../utils/api"
import ProductCard from "../components/products/ProductCard"
import Loader from "../components/ui/Loader"
import Message from "../components/ui/Message"
import { FaFilter } from "react-icons/fa"

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const location = useLocation()

  useEffect(() => {
    // Extract query parameters
    const params = new URLSearchParams(location.search)
    const categoryParam = params.get("category")
    const searchParam = params.get("search")

    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }

    if (searchParam) {
      setSearchTerm(searchParam)
    }
  }, [location.search])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        // Build query parameters
        let url = "/api/products"
        const params = new URLSearchParams()

        if (selectedCategory) {
          params.append("category", selectedCategory)
        }

        if (searchTerm) {
          params.append("search", searchTerm)
        }

        if (params.toString()) {
          url += `?${params.toString()}`
        }

        const { data } = await api.get(url)
        setProducts(data)

        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((product) => product.category))]
        setCategories(uniqueCategories)
      } catch (error) {
        setError("Failed to load products")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory, searchTerm])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is already handled by the useEffect
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Mobile filter toggle */}
        <button
          className="md:hidden flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md mb-4"
          onClick={toggleFilters}
        >
          <FaFilter />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filters sidebar */}
        <div className={`md:w-1/4 ${showFilters ? "block" : "hidden md:block"}`}>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            {/* Search */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Search</h3>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-3 py-2 border rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all"
                    name="category"
                    checked={selectedCategory === ""}
                    onChange={() => handleCategoryChange("")}
                    className="mr-2"
                  />
                  <label htmlFor="all">All Categories</label>
                </div>

                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={category}
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2"
                    />
                    <label htmlFor={category}>{category}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="md:w-3/4">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error">{error}</Message>
          ) : products.length === 0 ? (
            <Message>No products found</Message>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
