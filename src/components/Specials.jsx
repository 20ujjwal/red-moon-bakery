import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Specials() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/special.json")
      .then((r) => {
        if (!r.ok) throw new Error("Unable to load specials.json");
        return r.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error)
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!data)
    return <p className="text-center text-gray-500 mt-10">Loading specials...</p>;

  return (
    <section id="specials" className="py-20 bg-gradient-to-b from-red-50 to-white relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,220,220,0.3),_transparent_70%)]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE - image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl ring-4 ring-red-100 hover:ring-red-200 transition-all duration-500">
            <img
              src="/public/images/desi-biscuits.jpg" // 🔸 put your biscuit photo here
              alt="Desi Biscuits"
              className="w-full h-[400px] object-cover md:w-[500px] md:h-[400px]"
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder-category.jpg";
              }}
            />
          </div>
        </motion.div>

        {/* RIGHT SIDE - text + biscuit names */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-red-700 mb-4">
            Specials of Red Moon Bakery
          </h2>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Our <span className="font-semibold text-red-600">Desi Biscuits</span> are made
            from <span className="italic">atta, shakkar, and pure desi ghee</span> — 
            giving you that warm, home-like taste of tradition and love. Perfectly 
            baked for every moment of sweetness.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100">
            <h3 className="text-2xl font-semibold text-red-700 mb-4">Our Biscuit Collection</h3>
            <ul className="divide-y divide-gray-100">
              {data.items.map((it) => (
                <li
                  key={it.id}
                  className="flex justify-between py-3 text-gray-800 hover:bg-red-50/50 transition-colors duration-300 rounded-md px-3"
                >
                  <span>{it.name}</span>
                  <span className="font-semibold text-red-600">
                    ${it.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
