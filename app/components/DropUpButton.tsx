// ~/components/DropUpButton.tsx
import { useState, useEffect, useRef } from 'react'
import { FaEllipsisH } from 'react-icons/fa' // Optional: Using React Icons for better visuals

const DropUpButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="fixed bottom-5 right-5 z-50" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={`w-12 h-12 bg-blue-500 text-white rounded-full flex flex-col justify-center items-center transition-transform duration-300 focus:outline-none ${
          isOpen ? 'transform rotate-90' : ''
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="dropup-menu"
        aria-label="Menu"
      >
        {/* Option 1: Using custom dots */}
        <div className="w-1.5 h-1.5 bg-white rounded-full mb-1"></div>
        <div className="w-1.5 h-1.5 bg-white rounded-full mb-1"></div>
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>

        {/* Option 2: Using an icon (uncomment if preferred) */}
        {/* <FaEllipsisH size={20} /> */}
      </button>

      {/* Menu Items */}
      {isOpen && (
        <div
          id="dropup-menu"
          role="menu"
          className="absolute bottom-16 right-0 bg-white shadow-lg rounded-lg flex flex-col animate-fadeIn"
        >
          <button
            className="px-4 py-2 text-left hover:bg-gray-100 transition focus:outline-none focus:bg-gray-200"
            role="menuitem"
          >
            About Us
          </button>
          <button
            className="px-4 py-2 text-left hover:bg-gray-100 transition focus:outline-none focus:bg-gray-200"
            role="menuitem"
          >
            Github
          </button>
          <button
            className="px-4 py-2 text-left hover:bg-gray-100 transition focus:outline-none focus:bg-gray-200"
            role="menuitem"
          >
            Park of Shame
          </button>
          <button
            className="px-4 py-2 text-left hover:bg-gray-100 transition focus:outline-none focus:bg-gray-200"
            role="menuitem"
          >
            Contact Us
          </button>
        </div>
      )}
    </div>
  )
}

export default DropUpButton
