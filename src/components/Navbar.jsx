import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // modern icons

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white tracking-wide">
          <a href="#hero" className="hover:text-yellow-300 transition-colors">Home</a>
          <a href="#menu" className="hover:text-yellow-300 transition-colors">Menu</a>
          <a href="#specials" className="hover:text-yellow-300 transition-colors">Specials</a>
          <a href="#about" className="hover:text-yellow-300 transition-colors">About</a>

          <a href="#contact" className="hover:text-yellow-300 transition-colors">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-red-800 to-red-900 text-white text-center py-6 space-y-5 border-t border-red-700 shadow-lg"
          >
            <a
              href="#hero"
              className="block text-lg hover:text-yellow-300 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#menu"
              className="block text-lg hover:text-yellow-300 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Menu
            </a>
            <a
              href="#specials"
              className="block text-lg hover:text-yellow-300 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Specials
            </a>
            <a
              href="#contact"
              className="block text-lg hover:text-yellow-300 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
