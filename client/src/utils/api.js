import axios from "axios"

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
})

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      const { token } = JSON.parse(userInfo)
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
