// ~/components/DropUpButton.tsx
import { Link } from '@remix-run/react'
import { useState, useEffect, useRef } from 'react'
import { FaInfoCircle, FaCar, FaEnvelope, FaGithub } from 'react-icons/fa'

const DropUpButton = ({ pageType }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Close the menu when clicking outside or pressing Escape
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
    <div
      className={`fixed right-5 z-50 ${pageType === 'aboutUs' ? 'bottom-14' : 'bottom-5'}`}
      ref={menuRef}
    >
      <button
        onClick={toggleMenu}
        className={`w-14 h-14 bg-blue-500 text-white rounded-full flex flex-col justify-center items-center transition-transform duration-300 ease-in-out ${
          isOpen ? 'transform rotate-90' : ''
        } focus:outline-none`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="dropup-menu"
        aria-label="Menu"
      >
        {/* Dots arranged horizontally initially */}
        <div
          className={`w-1.5 h-1.5 bg-white rounded-full mb-1 transition-all duration-300 ${
            isOpen ? 'mb-0.5 rotate-45 translate-y-1' : ''
          }`}
        ></div>
        <div
          className={`w-1.5 h-1.5 bg-white rounded-full mb-1 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        ></div>
        <div
          className={`w-1.5 h-1.5 bg-white rounded-full transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-1' : ''
          }`}
        ></div>
      </button>

      {/* Menu Items */}
      {isOpen && (
        <div
          id="dropup-menu"
          role="menu"
          className="absolute bottom-20 right-0 bg-white shadow-lg rounded-lg flex flex-col items-center space-y-2 p-2 animate-fadeIn"
        >
          {/* About Us */}
          <Link
            to="/AboutUs"
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            aria-label="About Us"
          >
            <FaInfoCircle size={20} className="text-blue-500" />
          </Link>

          {/* Car */}
          <Link
            to="/BadParking"
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            onClick={() => {
              // Handle Car-related action
            }}
            aria-label="Car"
          >
            <FaCar size={20} className="text-blue-500" />
          </Link>

          {/* Contact Us */}
          <Link
            to="/"
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            aria-label="Contact Us"
          >
            <FaEnvelope size={20} className="text-blue-500" />
          </Link>

          {/* GitHub */}
          <button
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            onClick={() => {
              // Open GitHub repository in a new tab
              window.open('https://github.com/kennnyq/Hackathon2024', '_blank')
            }}
            aria-label="GitHub"
          >
            <FaGithub size={20} className="text-blue-500" />
          </button>
        </div>
      )}
    </div>
  )
}

export default DropUpButton
