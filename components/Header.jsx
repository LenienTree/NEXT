"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, X, LogOut, User } from "lucide-react"
import { useRouter } from 'next/navigation';

export default function Header({ pagename }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const router = useRouter()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  const navItems = [
    { name: "Home", href: "/landing",},
    { name: "Calendar", href: "callender" },
    { name: "About", href: "about" },
    { name: "Portfolio", href: "#" },
  ]

  return (
    <header className="fixed top-0 left-10 right-10 z-50">
  <div className="container mx-auto p-5">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-black font-bold text-lg">LT</span>
        </div>
        <span className="text-white font-semibold hidden sm:block"></span>
      </div>

      {/* Desktop Navigation */}
      <div className="rounded-full hidden md:block  p-4 bg-white/10 shadow-md  ">
        <nav className="hidden md:flex gap-7 items-center space-x-10 mx-8 ">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors  ${
                item.name==pagename ? "  bg-black/40 px-2 text-[#9AE600] rounded-full" : "text-gray-300 hover:text-[#9AE600]"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Profile */}
      <div className="hidden md:block relative" ref={profileRef}>
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            <User size={20} />
          </div>
          <span className="text-white text-sm font-medium hidden lg:block">Profile</span>
        </button>
        
        {/* Dropdown Menu */}
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <a
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsProfileOpen(false)}
            >
              View Profile
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#022F2E] m-2 p-4 rounded-lg">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    item.active ? "text-green-400" : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="border-t border-gray-700 pt-2 mt-2">
                <a
                  href="/profile"
                  className="block py-2 text-sm text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View Profile
                </a>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-sm text-red-400 hover:text-red-300 flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
