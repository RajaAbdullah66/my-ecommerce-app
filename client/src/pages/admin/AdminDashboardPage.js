"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaBox, FaUsers, FaShoppingCart, FaDollarSign } from "react-icons/fa"
import api from "../../utils/api"
import Loader from "../../components/ui/Loader"
import Message from "../../components/ui/Message"
import AdminSidebar from "../../components/admin/AdminSidebar"

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    productCount: 0,
    userCount: 0,
    orderCount: 0,
    revenue: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        // In a real app, you would fetch actual stats from the backend
        // For this demo, we'll just simulate some data

        // Get product count
        const { data: products } = await api.get("/api/products")

        // Simulate other stats
        setStats({
          productCount: products.length,
          userCount: 25,
          orderCount: 150,
          revenue: 15000,
        })
      } catch (error) {
        setError("Failed to load dashboard data")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <AdminSidebar />

        <div className="flex-grow">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error">{error}</Message>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                  <div className="rounded-full bg-blue-100 p-3 mr-4">
                    <FaBox className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500">Products</p>
                    <h3 className="text-2xl font-bold">{stats.productCount}</h3>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                  <div className="rounded-full bg-green-100 p-3 mr-4">
                    <FaUsers className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500">Users</p>
                    <h3 className="text-2xl font-bold">{stats.userCount}</h3>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                  <div className="rounded-full bg-purple-100 p-3 mr-4">
                    <FaShoppingCart className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500">Orders</p>
                    <h3 className="text-2xl font-bold">{stats.orderCount}</h3>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                  <div className="rounded-full bg-yellow-100 p-3 mr-4">
                    <FaDollarSign className="text-yellow-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <h3 className="text-2xl font-bold">${stats.revenue.toFixed(2)}</h3>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link
                    to="/admin/products"
                    className="bg-blue-600 text-white py-3 px-4 rounded-md text-center hover:bg-blue-700 transition duration-300"
                  >
                    Manage Products
                  </Link>
                  <Link
                    to="/admin/product/new"
                    className="bg-green-600 text-white py-3 px-4 rounded-md text-center hover:bg-green-700 transition duration-300"
                  >
                    Add New Product
                  </Link>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <div className="border-t">
                  <div className="py-3 border-b">
                    <p className="text-gray-600">New user registered: John Doe</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                  <div className="py-3 border-b">
                    <p className="text-gray-600">New order #1234 received</p>
                    <p className="text-sm text-gray-500">3 hours ago</p>
                  </div>
                  <div className="py-3 border-b">
                    <p className="text-gray-600">Product "Smartphone" updated</p>
                    <p className="text-sm text-gray-500">5 hours ago</p>
                  </div>
                  <div className="py-3">
                    <p className="text-gray-600">New product added: "Bluetooth Speaker"</p>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
