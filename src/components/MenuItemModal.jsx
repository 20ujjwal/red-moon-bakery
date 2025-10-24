import React from "react";
import { motion } from "framer-motion";
import menu from "../data/menu.json";
import MenuCategory from "../components/MenuCategory";

export default function Menu() {
  return (
    <section
      id="menu"
      className="relative py-20 bg-gradient-to-b from-[#fff9f6] to-white"
    >
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,200,200,0.2),_transparent_70%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center text-red-700 mb-12"
        >
          Our Menu
        </motion.h1>

        {/* Intro line */}
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          Discover a delicious selection of cakes, pastries, snacks, and drinks — 
          handcrafted daily with love by <span className="text-red-600 font-semibold">Red Moon Bakery & Cafe</span>.
        </p>

        {/* Menu categories */}
        {menu.categories.map((category) => (
          <MenuCategory key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
