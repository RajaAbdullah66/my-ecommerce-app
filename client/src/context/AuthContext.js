"use client"

import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify"
import api from "../utils/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      setUser(JSON.parse(userInfo))
    }
    setLoading(false)
  }, [])

  // Register user
  const register = async (name, email, password) => {
    try {
      setLoading(true)
      const { data } = await api.post("/api/users/register", {
        name,
        email,
        password,
      })

      setUser(data)
      localStorage.setItem("userInfo", JSON.stringify(data))
      toast.success("Registration successful")
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true)
      const { data } = await api.post("/api/users/login", {
        email,
        password,
      })

      setUser(data)
      localStorage.setItem("userInfo", JSON.stringify(data))
      toast.success("Login successful")
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = () => {
    setUser(null)
    localStorage.removeItem("userInfo")
    toast.success("Logged out successfully")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
