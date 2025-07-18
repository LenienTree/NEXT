"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header( {pagename}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "landing",},
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
      <div className="hidden md:block  border-10">
        <img
          src="/placeholder.svg?height=40&width=40"
          alt="Profile"
          className="w-10 h-10 rounded-full border-2"
        />
      </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#022F2E] m-2 p-4 rounded-lg">
            <nav className="flex flex-col space-y-4 ">
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
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
