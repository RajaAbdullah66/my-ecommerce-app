import { Link, useLocation } from "react-router-dom"
import { FaHome, FaBox, FaUsers, FaShoppingCart, FaCog } from "react-icons/fa"

const AdminSidebar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center p-2 rounded-md ${
                isActive("/admin/dashboard") ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              <FaHome className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className={`flex items-center p-2 rounded-md ${
                isActive("/admin/products") ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              <FaBox className="mr-3" />
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`flex items-center p-2 rounded-md ${
                isActive("/admin/users") ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              <FaUsers className="mr-3" />
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className={`flex items-center p-2 rounded-md ${
                isActive("/admin/orders") ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              <FaShoppingCart className="mr-3" />
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className={`flex items-center p-2 rounded-md ${
                isActive("/admin/settings") ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              <FaCog className="mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AdminSidebar
