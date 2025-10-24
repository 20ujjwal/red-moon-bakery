import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <header
  id="hero"
  className="relative h-[90vh] flex items-center justify-center text-center bg-gradient-to-b from-white to-rose-50 pt-20"
>


      {/* Centered hero image with side spacing */}
      <div className="relative w-[85%] md:w-[80%] lg:w-[80%] mx-auto overflow-hidden rounded-3xl shadow-2xl">
        <img
          src="/images/Hero.jpg"
          alt="bakery hero"
          className="w-full h-[70vh] object-cover object-center rounded-3xl brightness-90 hover:brightness-100 transition-all duration-500"
        />
        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center px-6">
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold drop-shadow-lg"
          >
            Red Moon Bakery & Cafe
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 text-sm md:text-lg text-white/90 max-w-xl"
          >
            Where every bite tells a story — handcrafted cakes, flaky pastries, and warm smiles.
          </motion.p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="#menu"
              className="px-6 py-3 rounded-full bg-white/90 text-red-600 font-semibold shadow hover:bg-white transition-all duration-300"
            >
              See Menu
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 transition-all duration-300"
            >
              Contact & Location
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
