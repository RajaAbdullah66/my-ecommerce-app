const Loader = ({ size = "md" }) => {
    const sizeClasses = {
      sm: "w-5 h-5",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    }
  
    return (
      <div className="flex justify-center items-center py-4">
        <div
          className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
        ></div>
      </div>
    )
  }
  
  export default Loader
  