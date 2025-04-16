import mongoose from "mongoose"
import dotenv from "dotenv"
import Product from "../models/Product.js"
import User from "../models/User.js"

dotenv.config()

// Sample products data
const products = [
  {
    name: "Wireless Headphones",
    price: 99.99,
    image: "/tech/5.jpg",
    description: "Premium wireless headphones with noise cancellation and long battery life.",
    category: "Electronics",
    stock: 15,
    featured: true,
  },
  {
    name: "Smartphone",
    price: 699.99,
    image: "/tech/1.jpg",
    description: "Latest smartphone with high-resolution camera and fast processor.",
    category: "Electronics",
    stock: 10,
    featured: true,
  },
  {
    name: "Laptop",
    price: 1299.99,
    image: "/tech/7.jpg",
    description: "Powerful laptop for work and gaming with high-performance specs.",
    category: "Electronics",
    stock: 8,
    featured: true,
  },
  {
    name: "Smart Watch",
    price: 199.99,
    image: "/tech/8.jpg",
    description: "Track your fitness and stay connected with this stylish smart watch.",
    category: "Electronics",
    stock: 20,
    featured: true,
  },
  {
    name: "Laby Bag",
    price: 89.99,
    image: "/cloth/5.jpg",
    description: "Stylish and spacious lady’s bag, ideal for both daily use and special occasions.",
    category: "Fashion",
    stock: 25,
    featured: false,
  },
  {
    name: "Men Shirt",
    price: 49.99,
    image: "/cloth/1.jpg",
    description: "Classic and comfortable men's shirt perfect for everyday wear or casual outings.",
    category: "Fashion",
    stock: 30,
    featured: false,
  },
  {
    name: "Coffee Maker",
    price: 79.99,
    image: "/interior/8.jpg",
    description: "Automatic coffee maker for brewing your perfect cup every morning.",
    category: "Home",
    stock: 12,
    featured: true,
  },
  {
    name: "Desk Lamp",
    price: 29.99,
    image: "/interior/6.jpg",
    description: "Adjustable desk lamp with multiple brightness levels.",
    category: "Home",
    stock: 18,
    featured: false,
  },
  {
    name: "Headphone",
    price: 59.99,
    image: "/tech/9.jpg",
    description: "Portable Bluetooth headphone with rich sound and water resistance.",
    category: "Electronics",
    stock: 22,
    featured: true,
  },
  {
    name: "Cricket Bat",
    price: 24.99,
    image: "/tech/11.jpeg",
    description: "Premium quality cricket bat designed for powerful shots and excellent grip.",
    category: "Sports",
    stock: 35,
    featured: false,
  },
]

// Sample admin user
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    isAdmin: false,
  },
]

// Connect to MongoDB and seed data
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await Product.deleteMany()
    await User.deleteMany()
    console.log("Data cleared")

    // Insert new data
    await Product.insertMany(products)

    // Create users
    for (const user of users) {
      await User.create(user)
    }

    console.log("Data seeded successfully")
    process.exit()
  } catch (error) {
    console.error("Error seeding data:", error)
    process.exit(1)
  }
}

seedData()
