// Updated Menu.jsx — Regular & Special cakes with per-item images
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
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenCakes = () => {
    setActive({ type: "cakes" });
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
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
          Explore our handcrafted delights. Tap a category to view items.
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
                caption="Regular & Special cakes — click to explore"
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

/* ------------------------ Category Card ------------------------ */
function CategoryCard({ title, caption, image, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg text-left border border-red-50"
    >
      <div className="h-56 w-full overflow-hidden">
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

/* ------------------------ Cakes Detail ------------------------ */
function CakesDetail({ data, onBack }) {
  const [openPane, setOpenPane] = useState(null);
  const flavours = data?.items || [];

  // Regular cake preview images (for collapsed card)
  const regularImages = [
    "/images/cakes/regular1.jpg",
    "/images/cakes/regular2.jpg",
    "/images/cakes/regular3.jpg",
    "/images/cakes/regular4.jpg",
    "/images/cakes/regular5.jpg",
    "/images/cakes/regular6.jpg",
  ];

  // Map each regular cake id from menu.json to a specific image
  const regularImageMap = {
    Pineapple: "/images/cakes/pineapple.jpg",
    "Mix-fruit": "/images/cakes/fruit.jpg",
    "mango-magic": "/images/cakes/mango.jpg",
    "Gulab-jamun": "/images/cakes/gulabjamun.jpg",
    butterscotch: "/images/cakes/butter.jpg",
    "strawberry-delight": "/images/cakes/regular6.jpg",
    "Chocolate-Hazelnut": "/images/cakes/special1.jpg",
    "lotus-cheesecake": "/images/cakes/lotus.jpg",
    "motichoor-cheesecake": "/images/cakes/motichoor.jpg",
    "Mango-mousse-cheesecake": "/images/cakes/mango chesse.jpg",
    KitKat: "/images/cakes/kitkat.jpg",
    Rasmalai: "/images/cakes/rasmalai.jpg",
    "Red-velvet": "/images/cakes/redvelvet.jpg",
  };

  // Attach the right image to every regular cake item
  const regularCakes = flavours.map((item, idx) => ({
    ...item,
    image: regularImageMap[item.id] || regularImages[idx % regularImages.length],
  }));

  // Special cakes with fixed images from your folder
  const specialCakes = [
    { name: "Photo cakes", image: "/images/cakes/special1.jpg" },
    { name: "Custom cakes", image: "/images/cakes/special2.jpg" },
    { name: "Wedding cakes", image: "/images/cakes/wedding.jpg" },
    { name: "Heart cakes", image: "/images/cakes/heart.jpg" },
    { name: "2 tier cakes", image: "/images/cakes/2 tier.jpg" },
    { name: "3 tier cakes", image: "/images/cakes/3 tier.jpg" },
    { name: "Anniversary cakes", image: "/images/cakes/anniversary.jpg" },
    { name: "Birthday cakes", image: "/images/cakes/birthday.jpg" },
    { name: "Baby shower cakes", image: "/images/cakes/baby.jpg" },
    { name: "Graduation cakes", image: "/images/cakes/regular3.jpg" },
    { name: "Ribbon cakes", image: "/images/cakes/ribbon.jpg" },
    { name: "Travel cakes", image: "/images/cakes/travel.jpg" },
    { name: "Holiday cakes", image: "/images/cakes/hero-cakes.jpg" },
    { name: "Festival cakes", image: "/images/cakes/festival.jpg" },
    { name: "Regional cakes", image: "/images/cakes/regular3.jpg" },
    { name: "Layer cakes", image: "/images/cakes/regular4.jpg" },
    { name: "Bundt cakes", image: "/images/cakes/regular5.jpg" },
    { name: "Cheesecakes", image: "/images/cakes/special2.jpg" },
    { name: "Crepe cakes", image: "/images/cakes/special3.jpg" },
    { name: "Sheet cakes", image: "/images/cakes/hero-cakes.jpg" },
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
          className="px-4 py-2 rounded-full border border-red-100 text-red-600 hover:bg-red-50"
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Regular Cakes */}
        {openPane === "regular" ? (
          <RegularCakesPane items={regularCakes} onBack={() => setOpenPane(null)} />
        ) : (
          <CakePane
            title="Regular Cakes"
            description="Everyday favourites — flavours & sizes."
            images={regularImages}
            open={false}
            onToggle={() => setOpenPane("regular")}
            flavours={[]}
          />
        )}

        {/* Special Cakes */}
        {openPane === "special" ? (
          <SpecialCakesPane items={specialCakes} onBack={() => setOpenPane(null)} />
        ) : (
          <CakePane
            title="Special Cakes"
            description="Anniversary, Wedding, Custom & more."
            images={[
              "/images/cakes/anniversary.jpg",
              "/images/cakes/wedding.jpg",
              "/images/cakes/birthday.jpg",
              "/images/cakes/special1.jpg",
              "/images/cakes/special2.jpg",
              "/images/cakes/special3.jpg",
            ]}
            open={false}
            onToggle={() => setOpenPane("special")}
            flavours={[]}
          />
        )}
      </div>
    </div>
  );
}

/* ------------------------ Regular Cakes Pane (list with images) ------------------------ */
function RegularCakesPane({ items, onBack }) {
  return (
    <motion.div
      className="rounded-xl overflow-hidden border bg-gradient-to-b from-red-50 to-white shadow-md p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-extrabold text-red-700">Regular Cakes — Flavours & Sizes</h3>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50"
        >
          Close
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-white rounded-lg border border-red-100 p-3 hover:bg-red-50 transition"
          >
            <div className="mr-3">
              <div className="font-semibold text-gray-800">{item.name}</div>
              {item.variants?.length > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  Sizes: {item.variants.map((v) => v.size).join(" • ")}
                </div>
              )}
            </div>
            <div className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-16 rounded-md object-cover shadow-sm"
                onError={(e) => {
                  e.currentTarget.src = "/images/cakes/regular1.jpg";
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------ Special Cakes Pane (list with images) ------------------------ */
function SpecialCakesPane({ items, onBack }) {
  return (
    <motion.div
      className="rounded-xl overflow-hidden border bg-gradient-to-b from-red-50 to-white shadow-md p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-extrabold text-red-700">Special Cakes — Designs</h3>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50"
        >
          Close
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-white rounded-lg border border-red-100 p-3 hover:bg-red-50 transition"
          >
            <div className="mr-3">
              <div className="font-semibold text-gray-800">{item.name}</div>
            </div>
            <div className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-16 rounded-md object-cover shadow-sm"
                onError={(e) => {
                  e.currentTarget.src = "/images/cakes/regular2.jpg";
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------ Cake Pane (preview cards with Explore) ------------------------ */
function CakePane({ title, description, images, open, onToggle }) {
  return (
    <div className="border rounded-xl shadow-md bg-white overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-5 bg-red-600 text-white text-left"
      >
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm opacity-80">{description}</p>
        </div>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>

      {/* Preview Images (always visible inside the card) */}
      <div className="p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              className="h-32 w-full object-cover rounded-lg shadow-sm"
              onError={(e) => {
                e.currentTarget.src = "/images/cakes/regular1.jpg";
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------ Category List View ------------------------ */
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
          className="px-4 py-2 rounded-full border border-red-100 text-red-600 hover:bg-red-50"
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.items.map((it, idx) => (
          <div
            key={idx}
            className="py-2 px-3 bg-red-50 hover:bg-red-100 rounded-lg text-gray-800"
          >
            {it.name}
          </div>
        ))}
      </div>
    </div>
  );
}
