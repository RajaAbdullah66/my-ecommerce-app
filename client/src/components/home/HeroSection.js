import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop the Latest Trends</h1>
          <p className="text-xl mb-8">
            Discover amazing products at unbeatable prices. Your one-stop destination for all your shopping needs.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="bg-white text-blue-600 hover:bg-gray-100 py-3 px-6 rounded-md font-medium transition duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/products?category=Electronics"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 py-3 px-6 rounded-md font-medium transition duration-300"
            >
              Explore Electronics
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
