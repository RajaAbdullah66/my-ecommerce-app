import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Layout components
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

// Pages
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AdminDashboardPage from "./pages/admin/AdminDashboardPage"
import AdminProductsPage from "./pages/admin/AdminProductsPage"
import AdminProductEditPage from "./pages/admin/AdminProductEditPage"

// Context providers
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import AdminRoute from "./components/routes/AdminRoute"

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected routes */}
                <Route path="/admin" element={<AdminRoute />}>
                  <Route path="dashboard" element={<AdminDashboardPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                  <Route path="product/:id/edit" element={<AdminProductEditPage />} />
                  <Route path="product/new" element={<AdminProductEditPage />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer position="bottom-right" />
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
