const Message = ({ children, variant = "info" }) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "error":
          return "bg-red-100 text-red-800 border-red-200"
        case "success":
          return "bg-green-100 text-green-800 border-green-200"
        case "warning":
          return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "info":
        default:
          return "bg-blue-100 text-blue-800 border-blue-200"
      }
    }
  
    return <div className={`p-4 mb-4 rounded-md border ${getVariantClasses()}`}>{children}</div>
  }
  
  export default Message
  