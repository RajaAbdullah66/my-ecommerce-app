import express from "express"
import Product from "../models/Product.js"

const router = express.Router()

// Get all products
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query
    const query = {}

    if (category) {
      query.category = category
    }

    if (search) {
      query.name = { $regex: search, $options: "i" }
    }

    const products = await Product.find(query)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get featured products
router.get("/featured", async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true }).limit(8)
    res.json(featuredProducts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create a new product (admin only)
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body)
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update a product (admin only)
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.json(updatedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete a product (admin only)
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
