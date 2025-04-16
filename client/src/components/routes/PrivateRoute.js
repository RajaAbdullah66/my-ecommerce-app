"use client"

import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Loader from "../ui/Loader"

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext)

  if (loading) {
    return <Loader />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
