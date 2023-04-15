const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-300 bg-opacity-75">
      <div className="flex items-center justify-center animate-pulse">
        <svg
          className="animate-spin h-12 w-12 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm7.581 2.408A7.965 7.965 0 0112 20a7.96 7.96 0 01-2.581-.431l-2.982 2.636A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12h-4a8 8 0 01-9.419 7.872z"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default Loader
