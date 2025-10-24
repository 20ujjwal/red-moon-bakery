import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuPage() {
  const [menu, setMenu] = useState(null);
  const [specials, setSpecials] = useState([]); // ✅ for special cakes
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/menu.json").then((r) => {
        if (!r.ok) throw new Error("Failed to load menu.json");
        return r.json();
      }),
      fetch("/special.json")
        .then((r) => (r.ok ? r.json() : { items: [] }))
        .catch(() => ({ items: [] })),
    ])
      .then(([menuData, specialData]) => {
        setMenu(menuData);
        setSpecials(specialData.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading menu data");
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
                specials={specials}
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
function CakesDetail({ data, specials, onBack }) {
  const [openPane, setOpenPane] = useState(null);
  const flavours = data?.items || [];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-3xl font-extrabold text-red-700">Cakes</h3>
          <p className="text-gray-600 mt-1">
            Choose Regular or Special Cakes — explore below!
          </p>
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

        {/* Special Cakes (with images + list) */}
     <CakePane
  title="Special Cakes"
  description="Anniversary, Wedding, Custom & Birthday."
  images={[
    "/images/cakes/anniversary.jpg",
    "/images/cakes/wedding.jpg",
    "/images/cakes/birthday.jpg",
  ]}
  flavours={[]}        // empty array, no biscuits
  hideButton={true}    // tells CakePane to not render the button
/>


      </div>
    </div>
  );
}

/* --- Cake Pane --- */
function CakePane({ title, description, images, open, onToggle, flavours, hideButton }) {
  return (
    <motion.div className="rounded-xl overflow-hidden border bg-gradient-to-b from-red-50 to-white shadow-md p-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-bold">{title}</h4>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>

        {/* Render button only if hideButton is false */}
        {!hideButton && (
          <button
            onClick={onToggle}
            className="px-4 py-2 rounded-full bg-red-600 text-white font-medium"
          >
            {open ? "Hide" : "Explore"}
          </button>
        )}
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

      {/* Expanded list */}
      {open && flavours.length > 0 && (
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden mt-6"
          >
            <div className="divide-y divide-gray-100">
              {flavours.map((f, i) => (
                <div
                  key={i}
                  className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="text-gray-800 font-medium text-lg">{f.name}</div>
                  <div className="text-sm text-gray-500">
                    {f.variants?.length > 0
                      ? f.variants.map((v) => v.size).join(" • ")
                      : "6 inches • 7 inches • 8 inches • 10 inches"}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}


/* --- Category List View --- */
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
