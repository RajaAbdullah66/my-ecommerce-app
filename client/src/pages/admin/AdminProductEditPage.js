"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import api from "../../utils/api"
import Loader from "../../components/ui/Loader"
import Message from "../../components/ui/Message"
import AdminSidebar from "../../components/admin/AdminSidebar"
import { toast } from "react-toastify"

const AdminProductEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = id !== "new"

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    stock: "",
    featured: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState(["Electronics", "Fashion", "Home", "Sports"])

  useEffect(() => {
    if (isEditMode) {
      fetchProduct()
    }
  }, [id, isEditMode])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const { data } = await api.get(`/api/products/${id}`)
      setFormData({
        name: data.name,
        price: data.price,
        image: data.image,
        description: data.description,
        category: data.category,
        stock: data.stock,
        featured: data.featured,
      })
    } catch (error) {
      setError("Failed to load product")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      // Validate form data
      if (
        !formData.name ||
        !formData.price ||
        !formData.image ||
        !formData.description ||
        !formData.category ||
        formData.stock === ""
      ) {
        toast.error("Please fill in all fields")
        return
      }

      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      }

      if (isEditMode) {
        await api.put(`/api/admin/products/${id}`, productData)
        toast.success("Product updated successfully")
      } else {
        await api.post("/api/admin/products", productData)
        toast.success("Product created successfully")
      }

      navigate("/admin/products")
    } catch (error) {
      toast.error(isEditMode ? "Failed to update product" : "Failed to create product")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{isEditMode ? "Edit Product" : "Add New Product"}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <AdminSidebar />

        <div className="flex-grow">
          <button
            onClick={() => navigate("/admin/products")}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <FaArrowLeft className="mr-2" /> Back to Products
          </button>

          {loading && !formData.name ? (
            <Loader />
          ) : error ? (
            <Message variant="error">{error}</Message>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="stock" className="block text-gray-700 font-medium mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="featured" className="text-gray-700 font-medium">
                    Featured Product
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-blue-700 transition duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader size="sm" />
                  ) : (
                    <>
                      <FaSave className="mr-2" />
                      {isEditMode ? "Update Product" : "Create Product"}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminProductEditPage
