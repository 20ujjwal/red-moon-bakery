import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuPage() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/menu.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load menu.json");
        return r.json();
      })
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading menu.json");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="py-28 text-center text-gray-500">Loading menu...</div>;
  if (error)
    return <div className="py-28 text-center text-red-600">{error}</div>;
  if (!menu)
    return <div className="py-28 text-center text-gray-500">No menu available</div>;

  const handleOpenCategory = (catId) => {
    setActive({ type: "category", id: catId });
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOpenCakes = () => {
    setActive({ type: "cakes" });
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main id="menu" className="relative py-20 bg-gradient-to-b from-[#fff9f6] to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-center text-red-700 mb-6"
        >
          Our Menu
        </motion.h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          Explore our handcrafted delights. Tap a category to view items — names only, elegantly presented.
        </p>

        {/* Category Grid */}
        <AnimatePresence>
          {!active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <CategoryCard
                title="Cakes"
                caption="Regular & Special cakes — click to explore flavours and sizes"
                image="/images/cakes/hero-cakes.jpg"
                onClick={handleOpenCakes}
              />
              {menu.categories
                .filter((c) => c.id !== "cakes")
                .map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    title={cat.title}
                    caption={cat.description}
                    image={`/images/categories/${cat.id}.jpg`}
                    onClick={() => handleOpenCategory(cat.id)}
                  />
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cakes Section */}
        <AnimatePresence>
          {active?.type === "cakes" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mt-8"
            >
              <CakesDetail
                onBack={() => setActive(null)}
                data={menu.categories.find((c) => c.id === "cakes")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Other Categories */}
        <AnimatePresence>
          {active?.type === "category" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mt-8"
            >
              <CategoryListView
                category={menu.categories.find((c) => c.id === active.id)}
                onBack={() => setActive(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

/* --- Category Card --- */
function CategoryCard({ title, caption, image, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg text-left border border-red-50"
    >
      <div className="h-56 w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="text-xl font-semibold text-gray-800">{title}</div>
        <div className="text-sm text-gray-500 mt-1">{caption}</div>
        <div className="mt-4">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium shadow">
            View
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/* --- Cakes Detail --- */
function CakesDetail({ data, onBack }) {
  const [openPane, setOpenPane] = useState(null);
  const flavours = data?.items || [];

  const specialCakes = [
    "Photo cakes", "Custom cakes", "Wedding cakes", "Heart cakes", "2 tier cakes", "3 tier cakes",
    "Anniversary cakes", "Birthday cakes", "Baby showers cakes", "Graduation cakes", "Ribbon cakes",
    "Travel cakes", "Holiday cakes", "Festival cakes", "Regional cakes", "Layer cakes",
    "Bundt cakes", "Cheesecakes", "Crepe cakes", "Sheet cakes"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-3xl font-extrabold text-red-700">Cakes</h3>
          <p className="text-gray-600 mt-1">Choose Regular or Special Cakes — explore below!</p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full border border-red-100 text-red-600 hover:bg-red-50 transition"
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Regular Cakes */}
        <CakePane
          title="Regular Cakes"
          description="Everyday favourites — flavours & available sizes."
          images={[
            "/images/cakes/regular1.jpg",
            "/images/cakes/regular2.jpg",
            "/images/cakes/regular3.jpg",
          ]}
          open={openPane === "regular"}
          onToggle={() => setOpenPane(openPane === "regular" ? null : "regular")}
          flavours={flavours}
        />

        {/* Special Cakes */}
        <CakePane
          title="Special Cakes"
          description="Anniversary, Wedding, Custom & more occasions."
          images={[
            "/images/cakes/anniversary.jpg",
            "/images/cakes/wedding.jpg",
            "/images/cakes/birthday.jpg",
          ]}
          open={openPane === "special"}
          onToggle={() => setOpenPane(openPane === "special" ? null : "special")}
          flavours={specialCakes.map((name) => ({ name, variants: [] }))}
        />
      </div>

      <p className="text-center text-gray-700 mt-10 text-lg">
        We have <span className="font-semibold text-red-600">eggless cakes</span> for every kind of occasion.
        For more cake designs, explore our{" "}
        <a href="#contact" className="text-red-600 font-medium hover:underline">
          Instagram
        </a>{" "}
        page and contact us through{" "}
        <a href="#contact" className="text-red-600 font-medium hover:underline">
          WhatsApp
        </a>.
      </p>
    </div>
  );
}

/* --- Cake Pane --- */
function CakePane({ title, description, images, open, onToggle, flavours }) {
  return (
    <motion.div className="rounded-xl overflow-hidden border bg-gradient-to-b from-red-50 to-white shadow-md p-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-bold">{title}</h4>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        <button
          onClick={onToggle}
          className="px-4 py-2 rounded-full bg-red-600 text-white font-medium"
        >
          {open ? "Hide" : "Explore"}
        </button>
      </div>

      {/* Images */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {images.map((src, i) => (
          <div
            key={i}
            className="h-32 overflow-hidden rounded-lg bg-gray-100 shadow-md hover:shadow-red-200 hover:scale-105 transition-all duration-300"
          >
            <img src={src} alt={title} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Expandable List */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden mt-6"
          >
            <div className="divide-y divide-gray-100">
              {flavours.map((f, idx) => (
                <div
                  key={idx}
                  className="py-3 flex items-center justify-between text-gray-800 font-medium"
                >
                  <span>{f.name}</span>
                  {f.variants?.length > 0 && (
                    <span className="text-sm text-gray-500">
                      {f.variants.map((v) => v.size).join(" • ")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* --- Generic Category List View --- */
function CategoryListView({ category, onBack }) {
  if (!category) return null;
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-3xl font-extrabold text-red-700">{category.title}</h3>
          <p className="text-gray-600 mt-1">{category.description}</p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full border border-red-100 text-red-600 hover:bg-red-50 transition"
        >
          Back
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.items.map((it, idx) => (
          <div
            key={it.id || idx}
            className="flex items-center justify-between py-2 px-3 bg-red-50 hover:bg-red-100 rounded-lg text-gray-800 transition"
          >
            <span className="font-medium">{it.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
