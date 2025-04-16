"use client"

import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Loader from "../ui/Loader"

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useContext(AuthContext)

  if (loading) {
    return <Loader />
  }

  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/login" />
}

export default AdminRoute
