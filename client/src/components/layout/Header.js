"use client"

import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { CartContext } from "../../context/CartContext"
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from "react-icons/fa"

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useContext(AuthContext)
  const { itemCount } = useContext(CartContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`)
      setSearchTerm("")
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            ShopNow
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/products" className="hover:text-gray-300">
              Products
            </Link>

            {/* Search form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="py-1 px-3 rounded text-black w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
                <FaSearch />
              </button>
            </form>
          </nav>

          {/* User actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <FaShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-gray-300">
                  <FaUser size={18} />
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>

              {/* Search form */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="py-1 px-3 rounded text-black w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
                  <FaSearch />
                </button>
              </form>

              <Link
                to="/cart"
                className="flex items-center space-x-2 hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaShoppingCart size={18} />
                <span>Cart ({itemCount})</span>
              </Link>

              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="text-left hover:text-gray-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
