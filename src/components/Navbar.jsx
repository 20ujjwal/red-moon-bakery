import React from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-800 via-red-700 to-red-800 backdrop-blur-md shadow-md border-b border-red-900"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Red Moon Bakery Logo"
            className="h-14 w-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white tracking-wide">
          <a href="#hero" className="hover:text-yellow-300 transition-colors">Home</a>
          <a href="#menu" className="hover:text-yellow-300 transition-colors">Menu</a>
          <a href="#specials" className="hover:text-yellow-300 transition-colors">Specials</a>
          <a href="#contact" className="hover:text-yellow-300 transition-colors">Contact</a>
        </nav>
      </div>
    </motion.header>
  )
}
