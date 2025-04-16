import { Link } from "react-router-dom"
import { FaMobile, FaTshirt, FaHome, FaRunning } from "react-icons/fa"

const categories = [
  {
    id: 1,
    name: "Electronics",
    icon: <FaMobile size={40} />,
    description: "Latest gadgets and devices",
    link: "/products?category=Electronics",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    name: "Fashion",
    icon: <FaTshirt size={40} />,
    description: "Trendy clothing and accessories",
    link: "/products?category=Fashion",
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: 3,
    name: "Home",
    icon: <FaHome size={40} />,
    description: "Furniture and home decor",
    link: "/products?category=Home",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    name: "Sports",
    icon: <FaRunning size={40} />,
    description: "Sports equipment and gear",
    link: "/products?category=Sports",
    color: "bg-yellow-100 text-yellow-600",
  },
]

const CategorySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={category.link}>
              <div className={`rounded-lg p-6 text-center transition-transform hover:scale-105 ${category.color}`}>
                <div className="flex justify-center mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-700">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
