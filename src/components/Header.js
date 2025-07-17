"use client"

import { useState } from "react"
import "./Header.css"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "#", active: true },
    { name: "Calendar", href: "#" },
    { name: "About", href: "#" },
    { name: "Portfolio", href: "#" },
  ]

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo-section">
            <div className="logo-icon">
              <span className="logo-text">L</span>
            </div>
            <span className="logo-name">Lenient Tree</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className={`nav-link ${item.active ? "active" : ""}`}>
                {item.name}
              </a>
            ))}
            <div className="nav-indicator"></div>
          </nav>

          {/* Profile */}
          <div className="profile-section">
            <img src="https://via.placeholder.com/40x40/8b5cf6/ffffff?text=U" alt="Profile" className="profile-image" />
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-menu-btn">
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <nav className="mobile-nav-content">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`mobile-nav-link ${item.active ? "active" : ""}`}
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

export default Header
